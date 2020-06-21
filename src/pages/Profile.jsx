import React, { useState, useEffect } from 'react';
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
	FlatList,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow, URL } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import { Address } from '../components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
	useNavigation,
	StackActions,
	CommonActions,
} from '@react-navigation/native';
import Actions from '../redux/Actions';
import API from '../API';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};

const billing = {
	first_name: 'Akshay',
	last_name: 'Kumar',
	company: '',
	address_1: "Rd. No 6 'c' (South), Aam Bagicha",
	address_2: 'Mahadeopuri, Gardanibagh',
	city: 'Patna',
	postcode: '800001',
	country: 'India',
	state: 'Bihar',
	email: '',
	phone: '',
};

export default function Profile({ route }) {
	const navigation = useNavigation();
	const profileData = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	useEffect(() => {
		if (profileData === null) {
			ToastAndroid.show('Please Login to View Profile');
			navigation.navigate('Login');
		} else {
			setProfile(profileData);
			setTimeout(() => {
				setEditable(true);
			}, 100);
		}
	}, [navigation, profileData]);
	console.log(profileData);

	const user = useSelector((state) => state.login);

	const [profile, setProfile] = useState(profileData);

	const [firstName, setFirstName] = useState(
		profile.first_name.split(' ')[0]
	);
	const [lastName, setLastName] = useState(
		profile.first_name.split(' ').length > 1
			? profile.first_name.split(' ')[1]
			: ''
	);
	const [email, setEmail] = useState(profile.email);
	const [phone, setPhone] = useState(
		profile.meta_data.find((item) => item.key === 'digits_phone_no').value
	);

	const [loading, setLoading] = useState(false);

	const [editable, setEditable] = React.useState(false);

	const saveUser = async () => {
		if (firstName !== '') {
			const res = await API.put(`customers/${user.user_id}`, {
				first_name: firstName,
				last_name: lastName,
				email: email,
			});

			if (res.status === 200) {
				dispatch({ type: Actions.PROFILE, payload: res.data });
				Alert.alert('Success', 'Your Profile has been updated');
			}
		} else {
			Alert.alert('Empty Fields', 'First Name should not be blank');
		}
	};

	const logoutUser = async () => {
		try {
			const res = await axios.post(
				`${URL}/wp-json/digits/v1/logout`,
				null,
				{
					headers: {
						Authorization: `Bearer ${user.access_token}`,
					},
				}
			);
			if (res.status === 200) {
				// const resetAction = StackActions.reset({
				// 	index: 1,
				// 	actions: [
				// 		CommonActions.navigate({ routeName: 'Login' }),
				// 		CommonActions.navigate({ routeName: 'Signup' }),
				// 	],
				// });
				// navigation.dispatch(resetAction);
				// const resetAction = CommonActions.reset({
				// 	index: 0,
				// 	actions: [
				// 		CommonActions.navigate({
				// 			routeName: 'Login',
				// 		}),
				// 	],
				// });
				// navigation.dispatch(resetAction);

				navigation.navigate('Login');
				dispatch({ type: Actions.LOGOUT });
			}
		} catch (error) {
			console.log(error);
			Alert.alert('Some error occurred', 'Unable to logout');
		}
	};

	// const [current, setCurrent] = useState();

	// const RenderPack = ({ index, item }) => {
	// 	const [selected] = useState(current.id === item.id);
	// 	return (
	// 		<TouchableOpacity onPress={() => setCurrent(item)}>
	// 			<View
	// 				style={{
	// 					flexDirection: 'row',
	// 					alignItems: 'center',
	// 					borderColor: selected ? '#69c1d3' : Colors.black,
	// 					borderWidth: 1,
	// 					borderRadius: 7,
	// 					padding: 20,
	// 					marginBottom: index !== payments.length - 1 ? 20 : 0,
	// 					backgroundColor: Colors.white,
	// 				}}>
	// 				<View
	// 					style={{
	// 						height: 24,
	// 						width: 24,
	// 						borderRadius: 12,
	// 						borderColor: selected ? '#69c1d3' : '#000000',
	// 						borderWidth: 2,
	// 						alignItems: 'center',
	// 						justifyContent: 'center',
	// 					}}>
	// 					{selected ? (
	// 						<View
	// 							style={{
	// 								width: 14,
	// 								height: 14,
	// 								borderRadius: 7,
	// 								backgroundColor: '#69c1d3',
	// 							}}
	// 						/>
	// 					) : null}
	// 				</View>
	// 				<View>
	// 					<Text
	// 						style={{
	// 							fontSize: 14,
	// 							fontFamily: Fonts.semiBold,
	// 							marginHorizontal: 10,
	// 							color: Colors.black,
	// 							textAlign: 'center',
	// 						}}>
	// 						{item.title}
	// 					</Text>
	// 				</View>
	// 			</View>
	// 		</TouchableOpacity>
	// 	);
	// };

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
					paddingBottom: 20,
				}}>
				<View style={styles.container}>
					<View style={styles.profileTextContainer}>
						<Text style={styles.profileText}>
							Edit Your Profile
						</Text>
					</View>
					<View style={styles.emailContainer}>
						<Input
							placeholder="First Name"
							inputStyle={styles.email}
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
					<View style={styles.emailContainer}>
						<Input
							placeholder="Email (Optional)"
							inputStyle={styles.email}
							keyboardType={'email-address'}
							editable={editable}
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
					</View>
					<View style={styles.emailContainer}>
						<Input
							placeholder="Phone Number"
							inputStyle={styles.email}
							leftIcon={
								<Icon
									name="mobile-alt"
									style={styles.emailIcon}
									solid
								/>
							}
							editable={false}
							value={phone}
							onChangeText={(val) => setPhone(val)}
						/>
					</View>
					<View
						style={{
							width: wp(80),
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<View>
							<Text
								style={{
									fontSize: 16,
									fontFamily: Fonts.semiBold,
								}}>
								Saved Addresses
							</Text>
						</View>
						{(profileData.billing.first_name === '' ||
							profileData.shipping.first_name === '') && (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('AddAddress')
								}>
								<View
									style={{
										padding: 10,
										paddingHorizontal: 20,
										borderRadius: 5,
										backgroundColor: Colors.payNow,
									}}>
									<Text
										style={{
											fontSize: 16,
											fontFamily: Fonts.semiBold,
											color: Colors.white,
										}}>
										Add Address
									</Text>
								</View>
							</TouchableOpacity>
						)}
					</View>
					<View
						style={{
							alignSelf: 'flex-start',
						}}>
						{profileData.shipping.first_name !== '' && (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('AddAddress', {
										data: profileData.shipping,
										type: 'shipping',
									})
								}>
								<Address data={profileData.shipping} />
							</TouchableOpacity>
						)}
						{profileData.billing.first_name !== '' && (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('AddAddress', {
										data: profileData.billing,
										type: 'billing',
									})
								}>
								<Address data={profileData.billing} />
							</TouchableOpacity>
						)}
					</View>
					<LinearGradient
						colors={['#DA22FF', '#9733EE']}
						start={{ x: 0.0, y: 1.0 }}
						end={{ x: 1.0, y: 1.0 }}
						style={{ borderRadius: 32, marginTop: 20 }}>
						<TouchableOpacity
							style={styles.signInContainer}
							onPress={saveUser}>
							<View style={styles.signInView}>
								<Text
									style={[
										styles.signIn,
										{ color: '#9733EE' },
									]}>
									Save
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
							onPress={() => logoutUser()}>
							<View style={styles.signInView}>
								<Text
									style={[
										styles.signIn,
										{ color: '#7F7FD5' },
									]}>
									Logout
								</Text>
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
		paddingTop: hp(2),
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
	profileTextContainer: {
		marginVertical: 20,
	},
	profileText: {
		fontSize: 20,
		fontFamily: Fonts.semiBold,
	},
});
