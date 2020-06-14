import React, { useState, useEffect } from 'react';
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

export default function OTPScreen({ route, navigation }) {
	const { data } = route.params;
	const [counter, setCounter] = useState(30);
	const [otpValue, setOtpValue] = useState('');
	const [loading, setLoading] = useState(false);

	let timer = null;
	useEffect(() => {
		tick();
		return () => clearInterval(timer);
	});

	const tick = () => {
		timer = setInterval(() => {
			if (counter > 0) {
				setCounter(counter - 1);
			}
		}, 1000);
	};

	const verifyOtp = () => {
		if (otpValue.length === 6 && !isNaN(otpValue)) {
			setLoading(true);
			fetch(
				`${URL}/wp-json/digits/v1/verify_otp?countrycode=${data.countrycode}&mobileNo=${data.phone}&type=${data.type}&otp=${otpValue}`,
				{
					method: 'POST',
				}
			)
				.then((res) => {
					if (res.data.code === 1) {
						// TODO: Signup not working
						fetch(
							`${URL}/wp-json/digits/v1/create_user?digits_reg_name=${data.fullName}&digits_reg_countrycode=${data.countrycode}&digits_reg_mobile=${data.phone}&digits_reg_password=${data.password}&digits_reg_email=${data.email}&digits_reg_meta_key=shan`
						)
							.then((data) => {
								ToastAndroid.show(
									'Registration is Successfull. Please Login to Continue',
									ToastAndroid.LONG
								);
								setTimeout(() => {
									navigation.navigate('Login');
								}, 1000);
								setLoading(false);
							})
							.catch((error) => {
								console.log(error);
								Alert.alert(
									'Registration Unsuccessful',
									'Registration is not successful. Please Try Again'
								);
								setLoading(false);
							});
					} else {
						Alert.alert('Invalid OTP', 'Please Enter a Valid OTP');
					}
				})
				.catch((error) => {
					Alert.alert('Unable to Verify OTP.', 'Please Try Again.');
					setLoading(false);
				});
		} else {
			Alert.alert('Invalid OTP.', 'Please Enter a Valid OTP.');
		}
	};

	const resendOTP = () => {
		fetch(
			`${URL}/wp-json/digits/v1/resend_otp?countrycode=${data.countrycode}&mobileNo=${data.phone}&type=${data.type}`,
			{
				method: 'POST',
			}
		)
			.then((res) => {
				ToastAndroid.show('OTP has been sent', ToastAndroid.LONG);
				clearInterval(timer);
				setCounter(30);
				tick();
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
				<View style={{ marginTop: 10 }}>
					<Text>You can resend code in {counter} seconds</Text>
				</View>
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
			</View>
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
