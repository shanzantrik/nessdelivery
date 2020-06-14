import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Easing,
	Animated,
	ToastAndroid,
	Modal,
	ActivityIndicator,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';
import Geocoder from 'react-native-geocoding';
import { useDispatch } from 'react-redux';
import GEOFENCE from '../assets/map.json';
import axios from 'axios';
import API from '../API';
import Actions from '../redux/Actions';
import FastImage from 'react-native-fast-image';

function SplashScreen({ navigation, categories }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

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
						setLoading(false);
						console.log('Ready: ' + true);

						if (loading) {
							navigation.navigate('Homepage', {
								locationAvailable: true,
								location: 'Gardanibagh, Patna',
							});
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

				setLoading(false);
				console.log('Set Loading to False');

				navigation.navigate('Homepage', {
					location: addressComponent,
					locationAvailale: true,
				});
			})

			.catch((error) => {
				console.warn(error);
				setLoading(false);
				console.log('Set Loading to False --> Error in Geocoding API');
			});
	};

	const checkGeofencing = () => {
		Geolocation.getCurrentPosition(
			//Will give you the current location
			(position) => {
				let point = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				//getting the Latitude from the location json

				GeoFencing.containsLocation(
					point,
					GEOFENCE.features[0].geometry.coordinates
				)
					.then(() => {
						console.log("Welcome to Ness's Frozen Delivery");
						ToastAndroid.show(
							"Welcome to Ness's Frozen Delivery",
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

						setLoading(false);
						console.log('Set Loading to False');

						navigation.navigate('Homepage', {
							location: 'Not Available in your location',
							locationAvailable: false,
						});
					});
			},
			(error) => {
				alert(error.message);

				setLoading(false);
				console.log('Set Loading to False');
			},
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
			}
		);
		// navigation.navigate('Homepage');
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
			<View
				style={{
					width: wp(80),
					aspectRatio: 5000 / 1995,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<FastImage
					source={require('../assets/logos/logo_without_flake.png')}
					style={styles.logo}
				/>
				<View
					style={{
						position: 'absolute',
						left: 10,
						top: 0,
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
						width: '30%',
					}}>
					<Animated.Image
						source={require('../assets/logos/flake.png')}
						style={{
							height: '70%',
							aspectRatio: 1,
							resizeMode: 'contain',
							transform: [{ rotate: spin }],
						}}
					/>
				</View>
			</View>
			<LinearGradient
				colors={['#86A8E7', '#7F7FD5']}
				start={{ x: 0.0, y: 1.0 }}
				end={{ x: 1.0, y: 1.0 }}
				style={{
					position: 'absolute',
					bottom: hp(15),
					borderRadius: 32,
				}}>
				<TouchableOpacity
					style={styles.signInContainer}
					// onPress={() => {
					// 	console.log('Ready: ' + ready);
					// 	if (ready) {
					// 		navigation.navigate('Homepage', {
					// 			locationAvailable: true,
					// 			location: 'Gardanibagh, Patna',
					// 		});
					// 	} else {
					// 		setLoading(true);
					// 	}
					// }}
					onPress={checkLocationPermission}>
					<View style={styles.signInView}>
						<Text style={[styles.signIn, { color: '#7F7FD5' }]}>
							Continue
						</Text>
					</View>
				</TouchableOpacity>
			</LinearGradient>
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
					<ActivityIndicator color={Colors.lightBlue} size="large" />
					<Text
						style={{
							marginTop: 20,
							fontSize: 16,
							fontFamily: Fonts.semiBold,
							color: Colors.white,
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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#161616',
	},
	logoContainer: {
		width: wp(60),
		height: wp(30),
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	continueContainer: {
		backgroundColor: 'green',
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	continue: {
		margin: 10,
		fontSize: 16,
		color: Colors.white,
		fontFamily: Fonts.semiBold,
	},
	signInContainer: {
		width: wp(60),
		margin: 2,
		borderRadius: 32,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	signInView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 15,
		paddingHorizontal: 30,
	},
	signIn: {
		fontSize: 16,
		fontFamily: Fonts.bold,
		color: '#f953c6',
		textTransform: 'uppercase',
	},
});

export default SplashScreen;
