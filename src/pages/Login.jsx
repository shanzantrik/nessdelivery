import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert,
	StatusBar,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};
export default function Login({ navigation }) {
	const [signInFocused, setSignInFocused] = React.useState(false);
	const [phone, setPhone] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const signIn = () => {
		if (phone.length === 0) {
			Alert.alert(
				"Phone number can't be blank",
				'Please enter your phone number to continue.'
			);
		} else if (phone.length !== 10) {
			Alert.alert('Incorrect Phone Number');
		} else {
			if (password.length === 0) {
				//send otp
				navigation.navigate('OTPScreen', {
					phoneNum: '+91' + phone,
				});
			} else {
				//sign in using password
			}
		}
	};
	return (
		<View style={styles.container}>
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
								Please Login using your{'\n'} existing account
							</Text>
						</View>
					</View>
				</LinearGradient>
			</View>
			<View style={styles.emailContainer}>
				<Input
					placeholder="Phone Number"
					inputStyle={styles.email}
					label={'Enter your Phone'}
					keyboardType={'numeric'}
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
					onPress={() =>
						navigation.navigate('OTPScreen', {
							phone: phone,
						})
					}
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
					onPress={() => navigation.navigate('Signup')}>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
