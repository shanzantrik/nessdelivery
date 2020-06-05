import React, { useEffect } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Easing,
	Animated,
	ToastAndroid,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import GeoFencing from 'react-native-geo-fencing';
import GEOFENCE from '../assets/map.json';

export default function SplashScreen({ navigation }) {
	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 2500,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	});

	const spinValue = new Animated.Value(0);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

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
						console.log('Point is within geofence');
						ToastAndroid.show(
							'Point is within geofence',
							ToastAndroid.LONG
						);
					})
					.catch(() => {
						console.log('Point is not within geofence');
						ToastAndroid.show(
							'Point is not within geofence',
							ToastAndroid.LONG
						);
					});
			},
			(error) => alert(error.message),
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
			}
		);
		// navigation.navigate('Homepage');
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
						break;
					case RESULTS.DENIED:
						console.log(
							'The permission has not been requested / is denied but requestable'
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
						break;
				}
			})
			.catch((error) => {
				console.log(error);
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
			<LinearGradient
				colors={['#DA22FF', '#9733EE']}
				start={{ x: 0.0, y: 1.0 }}
				end={{ x: 1.0, y: 1.0 }}
				style={{
					width: wp(100),
					height: hp(100),
					alignItems: 'center',
					justifyContent: 'space-around',
				}}>
				<View
					style={{
						width: wp(80),
						aspectRatio: 5000 / 1995,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<View
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							alignItems: 'center',
							justifyContent: 'center',
							height: '100%',
							width: '30%',
						}}>
						<Animated.Image
							source={require('../assets/logos/flake.png')}
							style={{
								height: '100%',
								width: '100%',
								aspectRatio: 1,
								resizeMode: 'contain',
								transform: [{ rotate: spin }],
							}}
						/>
					</View>
					<Image
						source={require('../assets/logos/logo_without_flake.png')}
						style={styles.logo}
					/>
				</View>
				<LinearGradient
					colors={['#86A8E7', '#7F7FD5']}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{ borderRadius: 32, marginVertical: 20 }}>
					<TouchableOpacity
						style={styles.signInContainer}
						onPress={() => checkLocationPermission()}>
						<View style={styles.signInView}>
							<Text style={[styles.signIn, { color: '#7F7FD5' }]}>
								Continue
							</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
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
