import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Modal,
	ActivityIndicator,
} from 'react-native';
import { Input } from 'react-native-elements';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Actions from '../redux/Actions';
import API from '../API';

export default function AddAddress({ navigation, route }) {
	console.log(route.params);
	let data, type;
	if (route.params !== undefined) {
		data = route.params.data;
		type = route.params.type;
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

	const addressPost = async () => {
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
							  });

					if (res.status === 200) {
						console.log(res);
						dispatch({ type: Actions.PROFILE, payload: res.data });
						setLoading(false);
						Alert.alert(
							'Address Updated',
							'Address Successfully Added'
						);
						navigation.navigate('Profile');
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
	};

	return (
		<View style={styles.container}>
			<View style={{ marginVertical: 20 }}>
				<Text
					style={{
						fontSize: 20,
						fontFamily: Fonts.semiBold,
					}}>
					Address Details
				</Text>
			</View>
			<View style={{ flexDirection: 'row', width: '80%' }}>
				<View
					style={{
						width: '50%',
					}}>
					<Input
						placeholder="First Name"
						inputStyle={styles.email}
						keyboardType={'email-address'}
						value={firstName}
						onChangeText={(val) => setFirstName(val)}
					/>
				</View>
				<View
					style={{
						width: '50%',
					}}>
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
			<View style={{ flexDirection: 'row', width: '80%' }}>
				<View
					style={{
						width: '50%',
					}}>
					<Input
						placeholder="City"
						inputStyle={styles.email}
						keyboardType={'email-address'}
						value={city}
						onChangeText={(val) => setCity(val)}
					/>
				</View>
				<View
					style={{
						width: '50%',
					}}>
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
				<View
					style={{
						width: wp(60),
						paddingVertical: 20,
						borderRadius: 15,
						backgroundColor: Colors.white,
						borderColor: Colors.gradientSecondary,
						borderWidth: 1,
						alignItems: 'center',
						justifyContent: 'center',
						marginVertical: 20,
					}}>
					<Text
						style={{
							fontSize: 16,
							fontFamily: Fonts.semiBold,
							textTransform: 'uppercase',
							color: Colors.gradientSecondary,
						}}>
						Submit
					</Text>
				</View>
			</TouchableOpacity>
			<Modal
				style={StyleSheet.absoluteFill}
				animationType="fade"
				transparent
				visible={loading}>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#00000033',
					}}>
					<ActivityIndicator color={Colors.royalBlue} size="large" />
					<Text
						style={{
							marginTop: 20,
							fontSize: 16,
							fontFamily: Fonts.semiBold,
							color: Colors.royalBlue,
						}}>
						Loading
					</Text>
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
});
