import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ToastAndroid,
	Keyboard,
	Alert,
	TouchableWithoutFeedback,
	Modal,
	ActivityIndicator,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OTPTextInput from 'react-native-otp-textinput';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Colors } from '../constants';
import { URL } from '../constants';
import { useDispatch } from 'react-redux';
import Actions from '../redux/Actions';
import API, { RefreshData } from '../API';
import axios from 'axios';

export default function OTPScreen({ route, navigation }) {
	const { data } = route.params;
	const [counter, setCounter] = useState(30);
	const [otpValue, setOtpValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [ready, setReady] = useState(false);

	const dispatch = useDispatch();

	let timer = null;
	useEffect(() => {
		tick();
		return () => clearInterval(timer);
	});

	useEffect(() => {
		if (otpValue.length === 6) {
			verifyOtp(otpValue);
		}
	}, [otpValue, verifyOtp]);

	const tick = () => {
		timer = setInterval(() => {
			if (counter > 0) {
				setCounter(counter - 1);
			}
		}, 1000);
	};

	const fetchProfile = async (user_id) => {
		try {
			const res = await API.get(`customers/${user_id}`);
			if (res.status === 200) {
				console.log(res);
				dispatch({ type: Actions.PROFILE, payload: res.data });
				navigation.navigate(data.destination || 'Homepage');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const verifyOtp = useCallback((otpVal) => {
		if (otpVal.length === 6 && !isNaN(otpVal)) {
			setLoading(true);

			const formDataOtp = new FormData();

			formDataOtp.append('countrycode', data.countrycode);
			formDataOtp.append('mobileNo', data.phone);
			formDataOtp.append('type', data.type);
			formDataOtp.append('otp', otpVal);

			fetch(`${URL}/wp-json/digits/v1/verify_otp`, {
				method: 'POST',
				body: formDataOtp,
			})
				.then((response) => response.text())
				.then((res) => {
					res = JSON.parse(res);
					if (res.code === 1 && data.type === 'register') {
						const formData = new FormData();

						formData.append(
							'digits_reg_countrycode',
							data.countrycode
						);
						formData.append('digits_reg_mobile', data.phone);
						formData.append('type', data.type);
						formData.append('otp', otpVal);
						formData.append('digits_reg_name', data.fullName);
						formData.append('digits_reg_password', data.password);
						formData.append('digits_reg_email', data.email);

						fetch(`${URL}/wp-json/digits/v1/create_user`, {
							method: 'POST',
							body: formData,
						})
							.then((response) => response.text())
							.then((resNew) => {
								resNew = JSON.parse(resNew);
								if (resNew.success) {
									ToastAndroid.show(
										'Registration is Successful.',
										ToastAndroid.LONG
									);
									dispatch({
										type: Actions.LOGIN,
										payload: resNew.data,
									});
									fetchProfile(resNew.data.user_id);
									setLoading(false);
								}
							})
							.catch((error) => {
								console.log(error);
								Alert.alert(
									'Registration Unsuccessful',
									'Registration is not successful. Please Try Again'
								);
								setLoading(false);
							});
					} else if (res.code == '1' && data.type === 'login') {
						const formData = new FormData();

						formData.append('user', data.phone);
						formData.append('countrycode', data.countrycode);
						formData.append('otp', otpVal);

						fetch(`${URL}/wp-json/digits/v1/login_user`, {
							method: 'POST',
							body: formData,
						})
							.then((response) => response.text())
							.then((resNew) => {
								resNew = JSON.parse(resNew);
								if (resNew.success) {
									ToastAndroid.show(
										'Login Successful.',
										ToastAndroid.LONG
									);
									dispatch({
										type: Actions.LOGIN,
										payload: resNew.data,
									});
									fetchProfile(resNew.data.user_id);
									setLoading(false);
								}
							})
							.catch((error) => {
								console.log(error);
								Alert.alert(
									'Login Unsuccessful',
									'Login is not successful. Please Try Again'
								);
								setLoading(false);
							});
					} else {
						Alert.alert('Invalid OTP', 'Please Enter a Valid OTP');
						setLoading(false);
						console.log(res);
					}
				})
				.catch((error) => {
					Alert.alert('Unable to Verify OTP.', 'Please Try Again.');
					setLoading(false);
					console.log(error);
				});
		} else {
			Alert.alert('Invalid OTP.', 'Please Enter a Valid OTP.');
			setLoading(false);
			console.log('Not a valid otp: ' + otpVal);
		}
	}, []);

	useEffect(() => {
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
					axios.get(
						'https://nessfrozenhub.in/wp-json/wp/v2/media?categories=1'
					),
					API.get('payment_gateways'),
					API.get('coupons'),
					API.get('shipping/zones/1/locations'),
					API.get('shipping/zones/1/methods'),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'chicken'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'veg'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'pork'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'sea-food'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'ice-creams'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'cheese-and-creams'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'wonder-eggs'
						).id,
						per_page: 30,
						featured: true,
					}),
					API.get('products', {
						category: simpleCats.find(
							(sim_cat) => sim_cat.slug === 'mithun'
						).id,
						per_page: 30,
						featured: true,
					}),
				])
					.then((values) => {
						dispatch({
							type: Actions.CATEGORIES,
							payload: cats.data.sort(compare),
						});
						dispatch({
							type: Actions.CAROUSEL,
							payload: values[1].data.sort(compare),
						});
						dispatch({
							type: Actions.PAYMENTS,
							payload: values[2].data.filter(
								(item) => item.id !== 'paypal'
							),
						});
						dispatch({
							type: Actions.COUPONS,
							payload: values[3].data.sort(compare),
						});
						dispatch({
							type: Actions.SHIPPING_ZONES,
							payload: values[4].data,
						});
						dispatch({
							type: Actions.SHIPPING_METHODS,
							payload: values[5].data,
						});
						dispatch({
							type: Actions.FEATURED_NON_VEG,
							payload: values[6].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_VEG,
							payload: values[7].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_PORK,
							payload: values[8].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_SEA_FOOD,
							payload: values[9].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_ICE_CREAM,
							payload: values[10].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_CHEESE_AND_CREAMS,
							payload: values[11].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_WONDER_EGGS,
							payload: values[12].data.sort(compare),
						});
						dispatch({
							type: Actions.FEATURED_MITHUN,
							payload: values[13].data.sort(compare),
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

		setReady(true);
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

	const resendOTP = () => {
		const formData = new FormData();

		formData.append('countrycode', data.countrycode);
		formData.append('mobileNo', data.phone);
		formData.append('type', data.type);

		fetch(`${URL}/wp-json/digits/v1/resend_otp`, {
			method: 'POST',
			body: formData,
		})
			.then((res) => {
				if (res.status === 200) {
					ToastAndroid.show('OTP has been sent', ToastAndroid.LONG);
					clearInterval(timer);
					setCounter(30);
					tick();
				}
			})
			.catch((error) => {
				console.log(error);
				Alert.alert(
					'Resend OTP',
					'Unable to send OTP. Please Try Again'
				);
			});
	};

	const hideKeyboard = () => {
		Keyboard.dismiss();
	};

	const Header = () => {
		return (
			<View
				style={{
					width: wp(100),
					height: hp(25),
					marginBottom: hp(5),
				}}>
				<LinearGradient
					colors={['#DA22FF', '#9733EE']}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{ wdith: wp(100) }}>
					<View
						style={{
							width: '100%',
							height: '100%',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}>
						<View
							style={{
								width: 80,
								height: 80,
								borderColor: Colors.white,
								borderWidth: 1,
								borderRadius: 60,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Icon
								name="user-check"
								color="#ffffff"
								style={{
									fontSize: 40,
									textAlign: 'center',
								}}
							/>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Text
								style={{
									color: Colors.white,
									fontSize: 18,
									fontFamily: Fonts.bold,
									textAlign: 'center',
								}}>
								Please Verify your account
							</Text>
						</View>
					</View>
				</LinearGradient>
			</View>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={hideKeyboard}>
			<View style={styles.container}>
				<Header />
				<View>
					<Text
						style={{
							marginBottom: 30,
							fontSize: 20,
							fontFamily: Fonts.semiBold,
							textAlign: 'center',
						}}>
						Enter the 6 digit OTP
					</Text>
					<Text
						style={{
							fontSize: 16,
							fontFamily: Fonts.bold,
							letterSpacing: 1,
							textAlign: 'center',
							lineHeight: 30,
						}}>
						OTP has been sent to{'\n'}
						<Text style={{ letterSpacing: 2 }}>
							+91 {data.phone}
						</Text>
					</Text>
				</View>
				<View style={{ marginTop: 30 }}>
					<OTPTextInput
						style={{
							width: 50,
							borderColor: '#9733EE80',
							borderWidth: 1,
							fontSize: 25,
							textAlign: 'center',
						}}
						inputCount={6}
						handleTextChange={(otp) => setOtpValue(otp)}
					/>
				</View>
				<TouchableOpacity
					onPress={() => resendOTP()}
					disabled={counter > 0}>
					<View style={{ marginTop: 20 }}>
						<Text
							style={{
								fontSize: 16,
								fontFamily: Fonts.bold,
								textAlign: 'center',
								color:
									counter !== 0 ? '#00000080' : Colors.black,
							}}>
							Resend Code
						</Text>
					</View>
				</TouchableOpacity>
				{counter !== 0 && (
					<View style={{ marginTop: 10 }}>
						<Text>You can resend code in {counter} seconds</Text>
					</View>
				)}
				<LinearGradient
					colors={['#86A8E7', '#7F7FD5']}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{ borderRadius: 32, marginVertical: 50 }}>
					<TouchableOpacity
						style={styles.signInContainer}
						onPress={() => verifyOtp()}>
						<View style={styles.signInView}>
							<Text style={[styles.signIn, { color: '#7F7FD5' }]}>
								Verify
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
						<ActivityIndicator
							color={Colors.royalBlue}
							size="large"
						/>
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
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
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
		padding: 20,
		paddingHorizontal: 30,
	},
	signIn: {
		fontSize: 16,
		fontFamily: Fonts.bold,
		color: '#f953c6',
		textTransform: 'uppercase',
	},
});
