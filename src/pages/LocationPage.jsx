import React, { useState, useEffect } from 'react';
import {
	Alert,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ToastAndroid,
	Platform,
	Animated,
	Easing,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';
import Geocoder from 'react-native-geocoding';
import GEOFENCE from '../assets/map.json';
import axios from 'axios';
import API from '../API';
import Actions from '../redux/Actions';
import { Colors, Fonts, Shadow } from '../constants';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import { locationJSON } from '../static';

export default function LocationPage({ navigation }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [locationData, setLocationData] = useState({
		locationJSON: null,
		location: 'Not Available in your location',
		locationAvailale: false,
	});

	const navigateToHomepage = (data) => {
		if (loading) {
			setLoading(false);
		}

		navigation.navigate('Login', data);
	};

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 2500,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();

		dispatch({
			type: Actions.SEARCH_CATEGORY,
			payload: {
				id: -1,
				name: 'Categories',
			},
		});
	});

	const spinValue = new Animated.Value(0);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

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
				dispatch({
					type: Actions.LOCATION,
					payload: {
						location: {
							first_name: '',
							last_name: '',
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

				navigateToHomepage();
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

				// Getting the Latitude from the location json
				GeoFencing.containsLocation(
					point,
					GEOFENCE.features[0].geometry.coordinates
				)
					.then(() => {
						console.log("Welcome to Nes's Frozen Delivery");
						ToastAndroid.show(
							"Welcome to Nes's Frozen Delivery",
							ToastAndroid.LONG
						);

						getLocationName(point.lat, point.lng);
					})
					.catch(() => {
						console.log(
							'Your location is not within the delivery area\n\nPlease check back later'
						);
						ToastAndroid.show(
							'Your location is not within the delivery area\n\nPlease check back later',
							ToastAndroid.LONG
						);

						dispatch({
							type: Actions.LOCATION,
							payload: {
								location: {
									first_name: '',
									last_name: '',
									company: '',
									address_1: getAddress(
										'route',
										locationJSON
									),
									address_2: getAddress(
										'sublocality',
										locationJSON
									),
									city: getAddress(
										'administrative_area_level_2',
										locationJSON
									),
									state: getAddress(
										'administrative_area_level_1',
										locationJSON
									),
									country: getAddress(
										'country',
										locationJSON
									),
									postcode: getAddress(
										'postal_code',
										locationJSON
									),
								},
								locationAvailale: true,
							},
						});

						navigateToHomepage();
					});
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

	const checkLocationPermission = () => {
		check(
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.LOCATION_ALWAYS
				: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
		)
			.then((result) => {
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
						checkGeofencing();
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
			});
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
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<FastImage
					source={require('../assets/logos/logo_without_flake.png')}
					style={styles.logo}
					resizeMode={FastImage.resizeMode.contain}>
					<View style={styles.flakeContainer}>
						<Animated.Image
							source={require('../assets/logos/flake.png')}
							style={[
								styles.flake,
								{
									transform: [{ rotate: spin }],
								},
							]}
						/>
					</View>
				</FastImage>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.headerText}>Nes's Frozen Delivery</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.subHeaderText}>
					wants to access your location{'\n'}to deliver at your
					doorstep.
				</Text>
			</View>
			<View style={styles.locationImageContainer}>
				<FastImage
					source={require('../assets/homepage/location.png')}
					style={styles.locationImage}
					resizeMode={FastImage.resizeMode.contain}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.allowContainer}
					onPress={() => checkLocationPermission()}>
					<View style={styles.allowTextContainer}>
						<Text style={styles.allowText}>Allow</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Alert.alert(
							'Permission Required',
							'Location permission is required to continue',
							[
								{
									text: 'Cancel',
									onPress: () => {
										console.log('Cancel Pressed');
										ToastAndroid.show(
											'Please Check back later',
											ToastAndroid.LONG
										);
									},
									style: 'cancel',
								},
								{
									text: 'Allow',
									onPress: () => checkLocationPermission(),
								},

								,
							],
							{ cancelable: false }
						);
					}}
					style={[styles.allowContainer, styles.denyContainer]}>
					<View style={styles.allowTextContainer}>
						<Text style={[styles.allowText, styles.denyText]}>
							Deny
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		marginBottom: hp(2),
	},
	headerText: {
		color: Colors.black,
		fontSize: 30,
		fontFamily: Fonts.semiBold,
		textAlign: 'center',
	},
	subHeaderText: {
		color: Colors.black,
		fontSize: 20,
		fontFamily: Fonts.semiBold,
		textAlign: 'center',
	},
	logoContainer: {
		width: wp(70),
		maxHeight: hp(20),
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: '100%',
		height: '100%',
	},
	flakeContainer: {
		position: 'absolute',
		left: 2,
		top: 0,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	flake: {
		height: '50%',
		aspectRatio: 1,
		resizeMode: 'contain',
	},
	locationImageContainer: {
		width: wp(70),
		maxHeight: hp(30),
	},
	locationImage: {
		width: '100%',
		height: '100%',
	},
	buttonContainer: {
		marginTop: hp(5),
	},
	allowContainer: {
		backgroundColor: Colors.payNow,
		borderRadius: 30,
		marginBottom: 20,
		...Shadow.medium,
	},
	allowTextContainer: {
		width: wp(60),
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	allowText: {
		color: Colors.white,
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	denyContainer: {
		backgroundColor: Colors.white,
	},
	denyText: {
		color: Colors.black,
	},
});
