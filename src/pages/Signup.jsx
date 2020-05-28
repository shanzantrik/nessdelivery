import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};
export default function Signup({ navigation }) {
	const [passwordVisible, setPasswordVisible] = React.useState(false);
	const [confPasswordVisible, setConfPasswordVisible] = React.useState(false);
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.emailContainer}>
					<Input
						placeholder="First Name"
						inputStyle={styles.email}
						label={'Enter your First Name'}
						keyboardType={'name-phone-pad'}
						leftIcon={
							<Icon name="user" style={styles.emailIcon} solid />
						}
					/>
				</View>
				<View style={styles.emailContainer}>
					<Input
						placeholder="Last Name"
						inputStyle={styles.email}
						label={'Enter your Last Name'}
						leftIcon={
							<Icon name="user" style={styles.emailIcon} solid />
						}
					/>
				</View>
				<View style={styles.emailContainer}>
					<Input
						placeholder="Email (Optional)"
						inputStyle={styles.email}
						label={'Enter your email address'}
						leftIcon={
							<Icon
								name="envelope"
								style={styles.emailIcon}
								solid
							/>
						}
					/>
				</View>
				<View style={styles.emailContainer}>
					<Input
						placeholder="Phone Number"
						inputStyle={styles.email}
						label={'Enter your Phone'}
						leftIcon={
							<Icon
								name="mobile-alt"
								style={styles.emailIcon}
								solid
							/>
						}
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
					/>
				</View>
				<View style={styles.emailContainer}>
					<Input
						placeholder="Confirm Password"
						inputStyle={styles.email}
						label={'Confirm your Password'}
						secureTextEntry={!confPasswordVisible}
						leftIcon={
							<Icon name="lock" style={styles.emailIcon} solid />
						}
						rightIcon={
							<TouchableOpacity
								onPress={() =>
									setConfPasswordVisible(!confPasswordVisible)
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
					/>
				</View>
				<LinearGradient
					colors={['#f953c6', '#b91d73']}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{ borderRadius: 32, marginTop: 20 }}>
					<TouchableOpacity style={styles.signInContainer}>
						<View style={styles.signInView}>
							<Text style={styles.signIn}>Register</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			</View>
		</ScrollView>
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
