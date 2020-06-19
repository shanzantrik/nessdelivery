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
	Alert,
	StatusBar,
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
import { useDispatch, useSelector } from 'react-redux';
import GEOFENCE from '../assets/map.json';
import axios from 'axios';
import API from '../API';
import Actions from '../redux/Actions';
import FastImage from 'react-native-fast-image';

function SplashScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar
				animated
				backgroundColor={'#161616'}
				barStyle={'light-content'}
				networkActivityIndicatorVisible
			/>
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
					// onPress={checkLocationPermission}
					onPress={() => {
						checkLocationPermission();
					}}>
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
						top: hp(15),
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<ActivityIndicator color={Colors.royalBlue} size="large" />
					<Text
						style={{
							marginTop: 20,
							fontSize: 16,
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
