import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ScrollView,
	ToastAndroid,
	Modal,
	ActivityIndicator,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import { URL } from '../constants';
import axios from 'axios';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};
export default function Signup({ navigation, route }) {
	const { destination } = route.params;

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confPasswordVisible, setConfPasswordVisible] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const signUpUsingApi = () => {
		setLoading(true);
		const formData = new FormData();

		formData.append('countrycode', '+91');
		formData.append('mobileNo', phone);
		formData.append('type', 'register');

		fetch(`${URL}/wp-json/digits/v1/send_otp`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.text())
			.then((res) => {
				res = JSON.parse(res);
				if (res.code === '1') {
					ToastAndroid.show(
						`OTP has been sent to ${phone}`,
						ToastAndroid.LONG
					);
					setLoading(false);
					setTimeout(() => {
						navigation.navigate('OTPScreen', {
							data: {
								fullName: firstName + ' ' + lastName,
								email: email,
								phone: phone,
								password: password,
								confirmPassword: confirmPassword,
								countrycode: '+91',
								type: 'register',
								destination: destination || 'Homepage',
							},
						});
					}, 1000);
				} else {
					Alert.alert(
						'Some Error Occurred',
						res.message || 'Please Try Again'
					);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				ToastAndroid.show(
					'Unable to send otp. Please try again',
					ToastAndroid.LONG
				);
			});
	};

	const signup = () => {
		if (firstName.length !== 0 && phone.length !== 0) {
			if (phone.length === 10 && !isNaN(phone)) {
				signUpUsingApi();
			} else {
				Alert.alert(
					'Invalid Phone',
					'Please Enter a Valid Phone Number'
				);
			}
		} else {
			Alert.alert('Empty Fields', "First Name and Phone can't be empty");
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
					paddingBottom: 20,
				}}>
				<View style={styles.container}>
					<View style={styles.emailContainer}>
						<Input
							placeholder="First Name"
							inputStyle={styles.email}
							label={'Enter your First Name'}
							keyboardType={'name-phone-pad'}
							leftIcon={
								<Icon
									name="user"
									style={styles.emailIcon}
									solid
								/>
							}
							value={firstName}
							onChangeText={(val) => setFirstName(val)}
						/>
					</View>
					<View style={styles.emailContainer}>
						<Input
							placeholder="Last Name"
							inputStyle={styles.email}
							label={'Enter your Last Name'}
							leftIcon={
								<Icon
									name="user"
									style={styles.emailIcon}
									solid
								/>
							}
							value={lastName}
							onChangeText={(val) => setLastName(val)}
						/>
					</View>
					{/* <View style={styles.emailContainer}>
						<Input
							placeholder="Email (Optional)"
							inputStyle={styles.email}
							keyboardType={'email-address'}
							label={'Enter your email address'}
							leftIcon={
								<Icon
									name="envelope"
									style={styles.emailIcon}
									solid
								/>
							}
							value={email}
							onChangeText={(val) => setEmail(val)}
						/>
					</View> */}
					<View style={styles.emailContainer}>
						<Input
							placeholder="Phone Number"
							keyboardType={'numeric'}
							inputStyle={styles.email}
							label={'Enter your Phone'}
							leftIcon={
								<Icon
									name="mobile-alt"
									style={styles.emailIcon}
									solid
								/>
							}
							value={phone}
							onChangeText={(val) => setPhone(val)}
						/>
					</View>
					{/* <View style={styles.emailContainer}>
						<Input
							placeholder="Password"
							inputStyle={styles.email}
							label={'Enter your Password'}
							secureTextEntry={!passwordVisible}
							leftIcon={
								<Icon
									name="lock"
									style={styles.emailIcon}
									solid
								/>
							}
							rightIcon={
								<TouchableOpacity
									onPress={() =>
										setPasswordVisible(!passwordVisible)
									}>
									<Icon
										name={
											passwordVisible
												? 'eye'
												: 'eye-slash'
										}
										style={styles.emailIcon}
										solid
									/>
								</TouchableOpacity>
							}
							value={password}
							onChangeText={(val) => setPassword(val)}
						/>
					</View>
					<View style={styles.emailContainer}>
						<Input
							placeholder="Confirm Password"
							inputStyle={styles.email}
							label={'Confirm your Password'}
							secureTextEntry={!confPasswordVisible}
							leftIcon={
								<Icon
									name="lock"
									style={styles.emailIcon}
									solid
								/>
							}
							rightIcon={
								<TouchableOpacity
									onPress={() =>
										setConfPasswordVisible(
											!confPasswordVisible
										)
									}>
									<Icon
										name={
											confPasswordVisible
												? 'eye'
												: 'eye-slash'
										}
										style={styles.emailIcon}
										solid
									/>
								</TouchableOpacity>
							}
							value={confirmPassword}
							onChangeText={(val) => setConfirmPassword(val)}
						/>
					</View> */}
					<LinearGradient
						colors={['#f953c6', '#b91d73']}
						start={{ x: 0.0, y: 1.0 }}
						end={{ x: 1.0, y: 1.0 }}
						style={{ borderRadius: 32, marginTop: 20 }}>
						<TouchableOpacity
							style={styles.signInContainer}
							onPress={signup}>
							<View style={styles.signInView}>
								<Text style={styles.signIn}>Register</Text>
							</View>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</ScrollView>
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
		paddingTop: hp(5),
		alignItems: 'center',
		justifyContent: 'center',
	},
	emailContainer: {
		width: wp(80),
		alignItems: 'center',
	},
	email: {
		color: Colors.black,
		fontSize: 16,
		fontFamily: Fonts.semiBold,
	},
	emailIcon: {
		fontSize: 14,
		margin: 3,
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
		fontFamily: Fonts.semiBold,
		color: '#f953c6',
		textTransform: 'uppercase',
	},
	forgotContainer: {
		width: wp(80),
		paddingHorizontal: 10,
		marginBottom: 20,
		alignItems: 'flex-end',
	},
	forgotText: {
		fontSize: 14,
		fontFamily: Fonts.semiBold,
	},
});
