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
import API, { RefreshData } from '../API';
import Actions from '../redux/Actions';
import FastImage from 'react-native-fast-image';

function SplashScreen({ navigation }) {
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

		API.get('products/categories?per_page=100')
			.then((cats) => {
				const simpleCats = cats.data.filter(
					(cat_item) => cat_item.display === 'default'
				);
				Promise.all([
					simpleCats.map((cat_id) => {
						return API.get(
							`products/categories?parent=${cat_id.id}`
						);
					}),
					API.get('products?per_page=100'),
					axios.get(
						'https://nessfrozenhub.in/wp-json/wp/v2/media?categories=1'
					),
					API.get('payment_gateways'),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'chicken'
						).id,
						per_page: 100,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'veg'
						).id,
						per_page: 100,
						featured: true,
					}),
					API.get('coupons'),
					API.get('shipping/zones'),
				])
					.then((values) => {
						dispatch({
							type: Actions.CATEGORIES,
							payload: cats.data.sort(compare),
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
						dispatch({
							type: Actions.FEATURED_NON_VEG,
							payload: values[4].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_VEG,
							payload: values[5].data.sort(compare),
						});
						dispatch({
							type: Actions.COUPONS,
							payload: values[6].data.sort(compare),
						});
						dispatch({
							type: Actions.SHIPPING_ZONES,
							payload: values[7].data.sort(compare),
						});
						GetSubCategoriesData(values[0]);
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.error(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const GetSubCategoriesData = async (categories) => {
		const subCategories = [];
		await categories.map((sub_cat) => {
			sub_cat.then((subCategoryValues) => {
				subCategories.push(...subCategoryValues.data);
			});
		});
		dispatch({
			type: Actions.SUB_CATEGORIES,
			payload: subCategories.sort(compareReverse),
		});
		const subCatData = await Promise.all(
			subCategories.map(async (item) => {
				return API.get('products', {
					category: item.id,
					per_page: 100,
				});
			})
		);
		const SubCatJSON = subCatData.map((sub) => {
			const subItem = {};
			subItem.id = sub.config.params.category;
			subItem.data = sub.data;
			return {
				...subItem,
			};
		});

		dispatch({
			type: Actions.SUB_CATEGORIES_DATA,
			payload: SubCatJSON.sort(compareReverse),
		});

		navigation.navigate('Homepage');
	};

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
						left: 2,
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
			<View style={{ marginTop: hp(5), paddingHorizontal: hp(5) }}>
				<Text
					style={{
						fontSize: 16,
						lineHeight: 30,
						fontFamily: Fonts.semiBold,
						color: Colors.white,
						textTransform: 'capitalize',
						textAlign: 'center',
					}}>
					we are loading the products for you.{'\n'}thank you for your
					patience
				</Text>
			</View>
			{/* <LinearGradient
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
				>
					<View style={styles.signInView}>
						<Text style={[styles.signIn, { color: '#7F7FD5' }]}>
							Continue
						</Text>
					</View>
				</TouchableOpacity>
			</LinearGradient> */}
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
