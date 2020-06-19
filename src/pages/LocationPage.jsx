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

export default function LocationPage({ navigation }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [locationData, setLocationData] = useState({
		location: 'Not Available in your location',
		locationAvailale: false,
	});

	const navigateToHomepage = (data) => {
		if (loading) {
			setLoading(false);
		}

		dispatch({
			type: Actions.LOCATION,
			payload: data,
		});

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

		const subCategories = [];
		API.get('products/categories?per_page=100')
			.then((cats) => {
				Promise.all([
					cats.data
						.filter((cat_item) => cat_item.display === 'default')
						.map((cat_id) => {
							return API.get(
								`products/categories?parent=${cat_id.id}`
							);
						}),
					API.get('products?per_page=100'),
					axios.get(
						'https://nessfrozenhub.in/wp-json/wp/v2/media?categories=1'
					),
					API.get('payment_gateways'),
				])
					.then((values) => {
						values[0].map((sub_cat) => {
							sub_cat.then((subCategoryValues) => {
								subCategories.push(...subCategoryValues.data);
							});
						});
						dispatch({
							type: Actions.CATEGORIES,
							payload: cats.data.sort(compare),
						});
						dispatch({
							type: Actions.SUB_CATEGORIES,
							payload: subCategories.sort(compareReverse),
						});
						dispatch({
							type: Actions.PRODUCTS,
							payload: values[1].data.sort(compare),
						});
						dispatch({
							type: Actions.CAROUSEL,
							payload: values[2].data.sort(compare),
						});
						dispatch({
							type: Actions.PAYMENTS,
							payload: values[3].data.filter(
								(item) => item.id !== 'paypal'
							),
						});

						setReady(true);
						console.log('Ready: ' + true);

						if (loading) {
							navigateToHomepage(locationData);
						}
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.error(error));
	});

	const compare = (a, b) => {
		let comparison = 0;
		if (a.id > b.id) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison; // Multiplying it with -1 reverses the sorting order
	};

	const compareReverse = (a, b) => {
		let comparison = 0;
		if (a.id > b.id) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison * -1; // Multiplying it with -1 reverses the sorting order
	};

	const spinValue = new Animated.Value(0);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	const [ready, setReady] = useState(false);

	const getLocationName = (lat, lng) => {
		Geocoder.init('AIzaSyDg1r3zd1vVKya0U63g1vacakzhR7DhblA');

		Geocoder.from(lat, lng)
			.then((json) => {
				var addressComponent =
					json.results[0].address_components[0].long_name;

				dispatch({
					type: Actions.LOCATION,
					payload: {
						location: addressComponent,
						locationAvailale: true,
					},
				});

				if (ready) {
					navigateToHomepage({
						location: addressComponent,
						locationAvailale: true,
					});
				} else {
					setLocationData({
						location: addressComponent,
						locationAvailale: true,
					});
					setLoading(true);
				}
			})

			.catch((error) => {
				console.warn(error);
				setLoading(false);
				console.log('Set Loading to False --> Error in Geocoding API');
			});
	};

	const checkGeofencing = () => {
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
								location: 'Not Available in your location',
								locationAvailale: false,
							},
						});

						if (ready) {
							navigateToHomepage({
								location: 'Not Available in your location',
								locationAvailale: false,
							});
						} else {
							setLocationData({
								location: 'Not Available in your location',
								locationAvailale: false,
							});
							setLoading(true);
						}
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
		setLoading(true);
		console.log('Set Loading to True');
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
						setLoading(false);
						console.log('Set Loading to False');
						break;
				}
			})
			.catch((error) => {
				console.log(error);

				setLoading(false);
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
					wants to access your location
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
		fontSize: 22,
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
