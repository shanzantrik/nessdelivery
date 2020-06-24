import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Modal,
	ActivityIndicator,
	Image,
	ToastAndroid,
	Platform,
} from 'react-native';
import { Input } from 'react-native-elements';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../redux/Actions';
import API from '../API';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export default function AddAddress({ navigation, route }) {
	let data, type, setAddress;
	if (route.params !== undefined) {
		data = route?.params?.data;
		type = route?.params?.type;
		setAddress = route?.params?.setAddress;
	}

	const [firstName, setFirstName] = useState(data?.first_name || '');
	const [lastName, setLastName] = useState(data?.last_name || '');
	const [addressLine1, setAddressLine1] = useState(data?.address_1 || '');
	const [addressLine2, setAddressLine2] = useState(data?.address_2 || '');
	const [state, setState] = useState(data?.state || '');
	const [city, setCity] = useState(data?.city || '');
	const [pincode, setPincode] = useState(data?.postcode || '');
	const [loading, setLoading] = useState(false);

	const user = useSelector((states) => states.login);
	const profile = useSelector((states) => states.profile);
	const dispatch = useDispatch();

	const getAddress = (addressType, json) => {
		var arr = json.results[0].address_components.find((item) => {
			return item.types.includes(addressType);
		});

		var i = 1;
		while (arr === undefined && i <= json.results.length) {
			arr = json.results[i++].address_components.find((item) => {
				return item.types.includes(addressType);
			});
		}
		
		if (arr === undefined) {
			return '';
		} else {
			return arr.long_name;
		}
	};

	const getLocationName = (lat, lng) => {
		Geocoder.init('AIzaSyDg1r3zd1vVKya0U63g1vacakzhR7DhblA');

		Geocoder.from(lat, lng)
			.then((json) => {
				console.log(json);

				dispatch({
					type: Actions.LOCATION,
					payload: {
						location: {
							first_name: profile.first_name,
							last_name: profile.last_name,
							company: '',
							address_1: getAddress('route', json),
							address_2: getAddress('sublocality', json),
							city: getAddress(
								'administrative_area_level_2',
								json
							),
							state: getAddress(
								'administrative_area_level_1',
								json
							),
							country: getAddress('country', json),
							postcode: getAddress('postal_code', json),
						},
						locationAvailale: true,
					},
				});

				console.log(json);

				setAddressLine1(getAddress('route', json));
				setAddressLine2(getAddress('sublocality', json));
				setCity(getAddress('administrative_area_level_2', json));
				setState(getAddress('administrative_area_level_1', json));
				setPincode(getAddress('postal_code', json));
			})

			.catch((error) => {
				console.warn(error);
				setLoading(false);
				console.log('Set Loading to False --> Error in Geocoding API');
			});
	};

	const checkGeofencing = async () => {
		Geolocation.getCurrentPosition(
			// Will give you the current location
			(position) => {
				let point = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				getLocationName(point.lat, point.lng);
			},
			(error) => {
				Alert.alert('Some Error Occurred', error.message);

				setLoading(false);
				console.log(error);
				console.log('Set Loading to False');
			},
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
			}
		);
	};

	const checkLocationPermission = async () => {
		setLoading(true);
		check(
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.LOCATION_ALWAYS
				: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
		)
			.then(async (result) => {
				switch (result) {
					case RESULTS.UNAVAILABLE:
						console.log(
							'This feature is not available (on this device / in this context)'
						);

						setLoading(false);
						console.log('Set Loading to False');
						break;
					case RESULTS.DENIED:
						console.log(
							'The permission has not been requested / is denied but requestable'
						);
						ToastAndroid.show(
							'Location Permission is Required',
							ToastAndroid.LONG
						);
						requestLocationPermission();
						break;
					case RESULTS.GRANTED:
						await checkGeofencing();
						break;
					case RESULTS.BLOCKED:
						console.log(
							'The permission is denied and not requestable anymore'
						);
						ToastAndroid.show(
							'Location permission is required\n\nPlease enable it by going into app settings',
							ToastAndroid.LONG
						);
						console.log('Set Loading to False');
						break;
				}
			})
			.catch((error) => {
				console.log(error);
				console.log('Set Loading to False');
			})
			.finally(() => setLoading(false));
	};

	const requestLocationPermission = () => {
		request(
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
				: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
		)
			.then((result) => {
				checkGeofencing();
			})
			.catch((error) => console.log(error));
	};

	const addressPost = async () => {
		if (type !== 'current') {
			try {
				if (
					firstName !== '' &&
					addressLine1 !== '' &&
					addressLine2 !== '' &&
					state !== '' &&
					city !== '' &&
					pincode !== ''
				) {
					if (pincode.length === 6) {
						setLoading(true);
						let res =
							type === 'shipping' ||
							profile.shipping.first_name === ''
								? await API.put(`customers/${user.user_id}`, {
										shipping: {
											first_name: firstName,
											last_name: lastName,
											company: '',
											address_1: addressLine1,
											address_2: addressLine2,
											city: city,
											state: state,
											postcode: pincode,
											country: 'IN',
										},
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  })
								: await API.put(`customers/${user.user_id}`, {
										billing: {
											first_name: firstName,
											last_name: lastName,
											company: '',
											address_1: addressLine1,
											address_2: addressLine2,
											city: city,
											state: state,
											postcode: pincode,
											country: 'IN',
										},
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  });

						if (res.status === 200) {
							console.log(res);
							dispatch({
								type: Actions.PROFILE,
								payload: res.data,
							});
							setLoading(false);
							Alert.alert(
								'Address Updated',
								'Address Successfully Added'
							);
						}
					} else {
						Alert.alert(
							'Pincode Invalid',
							'Please Enter a Valid Pincode'
						);
					}
				} else {
					Alert.alert(
						'Empty Fields',
						'Please fill all the fields to continue'
					);
				}
			} catch (err) {
				console.log(err);
			}
		}

		setAddress &&
			setAddress({
				type: type,
				address: {
					first_name: firstName,
					last_name: lastName,
					company: '',
					address_1: addressLine1,
					address_2: addressLine2,
					city: city,
					state: state,
					country: 'India',
					postcode: pincode,
				},
			});
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={styles.addressTextContainer}>
				<TouchableOpacity
					style={{
						borderRadius: 8,
						overflow: 'hidden',
						backgroundColor: Colors.white,
						...Shadow.light,
					}}
					onPress={() => checkLocationPermission()}>
					<View
						style={{
							width: wp(80),
							height: 60,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: Colors.white,
						}}>
						<View
							style={{
								width: 30,
								height: 30,
								marginEnd: 10,
							}}>
							<Image
								source={require('../assets/others/location_icon.png')}
								style={{
									width: '100%',
									height: '100%',
								}}
								resizeMode={'contain'}
							/>
						</View>
						<Text
							style={{
								fontSize: 16,
								fontFamily: Fonts.semiBold,
								textAlign: 'center',
								textAlignVertical: 'center',
								color: '#007fff',
							}}>
							Use your current location
						</Text>
					</View>
				</TouchableOpacity>
				<View
					style={{
						marginTop: 10,
					}}>
					<Text
						style={{
							fontSize: 14,
							fontFamily: Fonts.primary,
							color: Colors.black,
							textAlign: 'center',
							textAlignVertical: 'center',
						}}>
						Tap to autofill the address fields
					</Text>
				</View>
			</View>
			<View style={styles.nameInputContainer}>
				<View style={styles.inputContainer}>
					<Input
						placeholder="First Name"
						inputStyle={styles.email}
						keyboardType={'email-address'}
						value={firstName}
						onChangeText={(val) => setFirstName(val)}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Input
						placeholder="Last Name"
						inputStyle={styles.email}
						keyboardType={'email-address'}
						value={lastName}
						onChangeText={(val) => setLastName(val)}
					/>
				</View>
			</View>
			<View style={styles.emailContainer}>
				<Input
					placeholder="Address Line 1"
					inputStyle={styles.email}
					keyboardType={'email-address'}
					value={addressLine1}
					onChangeText={(val) => setAddressLine1(val)}
				/>
			</View>
			<View style={styles.emailContainer}>
				<Input
					placeholder="Address Line 2"
					inputStyle={styles.email}
					keyboardType={'email-address'}
					value={addressLine2}
					onChangeText={(val) => setAddressLine2(val)}
				/>
			</View>
			<View style={styles.emailContainer}>
				<Input
					placeholder="State"
					inputStyle={styles.email}
					keyboardType={'email-address'}
					value={state}
					onChangeText={(val) => setState(val)}
				/>
			</View>
			<View style={styles.nameInputContainer}>
				<View style={styles.inputContainer}>
					<Input
						placeholder="City"
						inputStyle={styles.email}
						keyboardType={'email-address'}
						value={city}
						onChangeText={(val) => setCity(val)}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Input
						placeholder="Pincode"
						inputStyle={styles.email}
						keyboardType={'email-address'}
						value={pincode}
						onChangeText={(val) => setPincode(val)}
					/>
				</View>
			</View>
			<TouchableOpacity onPress={() => addressPost()}>
				<View style={styles.submitBtnContainer}>
					<Text style={styles.submitBtnText}>Submit</Text>
				</View>
			</TouchableOpacity>
			<Modal
				style={StyleSheet.absoluteFill}
				animationType="fade"
				transparent
				visible={loading}>
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator color={Colors.royalBlue} size="large" />
					<Text style={styles.loadingText}>Loading</Text>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp(50),
		alignItems: 'center',
	},
	emailContainer: {
		width: '80%',
		alignItems: 'center',
	},
	email: {
		color: Colors.black,
		fontSize: 14,
		fontFamily: Fonts.semiBold,
	},
	emailIcon: {
		fontSize: 14,
		margin: 3,
	},
	addressTextContainer: {
		marginVertical: 20,
	},
	addressText: {
		fontSize: 20,
		fontFamily: Fonts.semiBold,
	},
	nameInputContainer: {
		flexDirection: 'row',
		width: '80%',
	},
	inputContainer: {
		width: '50%',
	},
	submitBtnContainer: {
		width: wp(60),
		paddingVertical: 20,
		borderRadius: 15,
		backgroundColor: Colors.white,
		borderColor: Colors.gradientSecondary,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
	},
	submitBtnText: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		textTransform: 'uppercase',
		color: Colors.gradientSecondary,
	},
	activityIndicatorContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00000033',
	},
	loadingText: {
		marginTop: 20,
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		color: Colors.royalBlue,
	},
});
