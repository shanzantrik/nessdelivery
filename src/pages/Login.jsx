import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	StatusBar,
	ScrollView,
	Modal,
	ActivityIndicator,
	ToastAndroid,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Actions from '../redux/Actions';
import { URL } from '../constants';
import API from '../API';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};
export default function Login({ navigation, route }) {
	const { destination } = route.params;

	const [signInFocused, setSignInFocused] = useState(false);
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const signInUsingApi = () => {
		setLoading(true);
		const formData = new FormData();

		formData.append('countrycode', '+91');
		formData.append('user', phone);
		formData.append('password', password);

		fetch(`${URL}/wp-json/digits/v1/login_user`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.text())
			.then((res) => {
				//Login Successful

				res = JSON.parse(res);
				console.log(res);
				if (res.success) {
					ToastAndroid.show('Login Successful', ToastAndroid.LONG);
					dispatch({ type: Actions.LOGIN, payload: res.data });
					fetchProfile(res.data.user_id);
				} else {
					Alert.alert(
						'Please Enter Correct Credentials',
						'Invalid Phone/Email or Password'
					);
				}
				setLoading(false);
			})
			.catch((error) => {
				//Some error occurred
				Alert.alert('Unable to sign in', 'Please try again');
				console.log(error);
				setLoading(false);
			});
	};

	const fetchProfile = async (user_id) => {
		try {
			const res = await API.get(`customers/${user_id}`);
			if (res.status === 200) {
				console.log(res);
				dispatch({ type: Actions.PROFILE, payload: res.data });
				navigation.navigate(destination || 'Homepage');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const signIn = () => {
		if (phone.includes('@')) {
			const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
			if (EMAIL_REGEX.test(phone)) {
				signInUsingApi();
			} else {
				Alert.alert(
					'Invalid Email Address.',
					'Please Enter Valid Email Address.'
				);
			}
		} else {
			if (phone.length !== 0 || password.length !== 0) {
				if (phone.length === 10 && !isNaN(phone)) {
					signInUsingApi();
				} else {
					Alert.alert(
						'Invalid Phone Number.',
						'Please Enter Valid Phone Number.'
					);
				}
			} else {
				Alert.alert(
					'Empty Fields',
					"Phone Number/Email or Password Can't be Empty."
				);
			}
		}
	};
	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					alignItems: 'center',
					backgroundColor: Colors.white,
				}}>
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
									name="lock"
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
										fontSize: 16,
										fontFamily: Fonts.bold,
										textAlign: 'center',
									}}>
									Please Login using your{'\n'} existing
									account
								</Text>
							</View>
						</View>
					</LinearGradient>
				</View>
				<View style={styles.emailContainer}>
					<Input
						placeholder="Phone Number / Email Address"
						inputStyle={styles.email}
						label={'Enter your Phone or Email'}
						keyboardType={'email-address'}
						leftIcon={
							<Icon
								name="mobile-alt"
								style={styles.emailIcon}
								solid
							/>
						}
						onChangeText={(text) => setPhone(text)}
					/>
				</View>
				<View style={styles.emailContainer}>
					<Input
						placeholder="Password"
						inputStyle={styles.email}
						label={'Enter your Password'}
						secureTextEntry={!passwordVisible}
						leftIcon={
							<Icon name="lock" style={styles.emailIcon} solid />
						}
						rightIcon={
							<TouchableOpacity
								onPress={() =>
									setPasswordVisible(!passwordVisible)
								}>
								<Icon
									name={passwordVisible ? 'eye' : 'eye-slash'}
									style={styles.emailIcon}
									solid
								/>
							</TouchableOpacity>
						}
						onChangeText={(text) => setPassword(text)}
					/>
				</View>
				<TouchableOpacity style={styles.forgotContainer}>
					<Text style={styles.forgotText}>Forgot Password?</Text>
				</TouchableOpacity>
				<LinearGradient
					colors={['#DA22FF', '#9733EE']}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{ borderRadius: 32, marginTop: 20 }}>
					<TouchableOpacity
						style={styles.signInContainer}
						onPress={() => signIn()}
						onPressIn={() => setSignInFocused(true)}
						onPressOut={() => setSignInFocused(false)}>
						<View style={styles.signInView}>
							<Text
								style={[
									styles.signIn,
									{
										color: signInFocused
											? '#ffffff'
											: '#9733EE',
									},
								]}>
								Sign In
							</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient
					colors={['#86A8E7', '#7F7FD5']}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{ borderRadius: 32, marginVertical: 20 }}>
					<TouchableOpacity
						style={styles.signInContainer}
						onPress={() =>
							navigation.navigate('Signup', {
								destination: destination || 'Homepage',
							})
						}>
						<View style={styles.signInView}>
							<Text style={[styles.signIn, { color: '#7F7FD5' }]}>
								Register
							</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
				<StatusBar
					animated
					backgroundColor={'#fff'}
					barStyle={'dark-content'}
				/>
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
		flex: 1,
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 20,
		paddingHorizontal: 30,
	},
	signIn: {
		fontSize: 16,
		fontFamily: Fonts.bold,
		color: '#f953c6',
		textTransform: 'uppercase',
	},
	signInIcon: {
		position: 'absolute',
		left: 0,
		fontSize: 14,
		fontFamily: Fonts.bold,
		color: '#f953c6',
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
		textDecorationLine: 'underline',
	},
});
