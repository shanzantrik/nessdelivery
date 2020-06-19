import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	TouchableHighlight,
	ToastAndroid,
	Alert,
	Modal,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Fonts, Shadow } from '../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import API from '../API';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch } from 'react-redux';
import Actions from '../redux/Actions';
import { Address } from '../components';

export default function Payment({ navigation }) {
	const user = useSelector((state) => state.login);
	const profile = useSelector((state) => state.profile);
	const location = useSelector((state) => state.location);
	const couponData = useSelector((state) => state.coupons);
	const [show, setShow] = useState(false);
	const [address, setAddress] = useState({
		currentLocation: true,
		address: location.location,
	});

	useEffect(() => {
		if (user === null || user.token === null) {
			ToastAndroid.show(
				'Please Login to Continue Payment',
				ToastAndroid.LONG
			);
			navigation.navigate('Login', {
				destination: 'Payment',
			});
		}
	});

	const applyCoupon = () => {
		const val = couponData.find((item) => item.code === coupon);
		if (val) {
			setSaving(parseInt(val.amount, 10));
		} else {
			Alert.alert(
				'Invalid Coupon',
				"The coupon you've applied is not valid"
			);
		}
	};

	const [cart] = useState(useSelector((state) => state.cart));
	const [payments] = useState(useSelector((state) => state.payments));
	const [orderId, setOrderId] = useState('');
	const [current, setCurrent] = useState(payments[0]);
	const [coupon, setCoupon] = useState('');
	const [saving, setSaving] = useState(0);

	const dispatch = useDispatch();

	const razorpayOrder = async (razorpay) => {
		try {
			const response = await fetch('https://api.razorpay.com/v1/orders', {
				method: 'POST',
				headers: {
					Authorization:
						'Basic ' +
						btoa(
							razorpay.settings.key_id.value +
								':' +
								razorpay.settings.key_secret.value
						),
				},
				body: {
					amount: cart.total * 100,
					currency: 'INR',
					receipt: 'Receipt no. 1',
					payment_capture: 1,
					notes: {
						Orders: cart.addedItems.map((item) => {
							return item.name + ', ';
						}),
					},
				},
			});

			if (response.status === 200) {
				setOrderId(response.data.id);
			}
			//  else {
			// 	ToastAndroid.show(
			// 		'Unable to fetch order id. Try again later',
			// 		ToastAndroid.LONG
			// 	);
			// }

			var options = {
				description: 'Frozen food delivery',
				image:
					'https://nessfrozenhub.in/wp-content/uploads/2020/06/IMG-20200526-WA0011-2-3.png',
				currency: 'INR',
				key: razorpay.settings.key_id.value,
				amount: cart.total * 100,
				name: 'Ness Frozen Hub',
				order_id: orderId, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
				prefill: {
					email: profile.email,
					contact: profile.meta_data
						.find((item) => item.key === 'digits_phone')
						.value.toString()
						.substring(1),
					name: profile.first_name,
				},
				theme: { color: '#4084f3' },
			};

			RazorpayCheckout.open(options)
				.then((data) => {
					// handle success
					Alert.alert(
						'Payment Successful',
						`${razorpay?.settings?.order_success_message?.value}`,
						[
							{
								text: 'OK',
								onPress: () => console.log('OK Pressed'),
							},
						],
						{ cancelable: false }
					);
					//Create an order for woocommerce
					API.get();
					console.log(data);
					dispatch({ type: Actions.CLEAR_CART });
				})
				.catch((error) => {
					// handle failure
					if (error?.description !== 'Payment Cancelled') {
						Alert.alert(
							'Payment Not Successful',
							'Payment was not processed successfully. Please Try Again',
							[
								{
									text: 'OK',
									onPress: () => console.log('OK Pressed'),
								},
							],
							{ cancelable: false }
						);
					}
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const createOrder = async (payment_method, title) => {
		const data = {
			payment_method: payment_method,
			payment_method_title: title,
			shipping: address.address,
			line_items: cart.map((item) => {
				if (item.id === item.selected.id) {
					return {
						product_id: item.id,
						quantity: item.quantity,
					};
				} else {
					return {
						product_id: item.id,
						variation_id: item.selected.id,
						quantity: item.quantity,
					};
				}
			}),
		};

		const res = await API.post('orders', data);
		if (res.status === 200) {
			Alert.alert(
				'Order Successful',
				"You're order has been successfully placed"
			);
		} else {
			Alert.alert(
				'Some Error Occurred',
				'The order was not placed successfully'
			);
		}
	};

	const processPayment = () => {
		switch (current.id) {
			case 'razorpay':
				razorpayOrder(current);
				createOrder('razorpay', 'Payment done using Razorpay');
				break;
			case 'cheque':
				Alert.alert(
					`${current.title}`,
					`${current?.settings?.instructions?.value}`,
					[
						{
							text: 'OK',
							onPress: () => console.log('OK Pressed'),
						},
					],
					{ cancelable: false }
				);
				createOrder('cheque', 'Payment done using Cheque');
				break;
			case 'bacs':
				Alert.alert(
					`${current.title}`,
					`${current?.settings?.instructions?.value}`,
					[
						{
							text: 'OK',
							onPress: () => console.log('OK Pressed'),
						},
					],
					{ cancelable: false }
				);
				createOrder('bacs', 'Payment done using BACS');
				break;
			case 'cod':
				Alert.alert(
					`${current.title}`,
					`${current?.settings?.instructions?.value}`,
					[
						{
							text: 'OK',
							onPress: () => console.log('OK Pressed'),
						},
					],
					{ cancelable: false }
				);
				break;
			default:
				Alert.alert(
					'Wrong option selected',
					'Please select correct option',
					[
						{
							text: 'OK',
							onPress: () => console.log('OK Pressed'),
						},
					],
					{ cancelable: false }
				);
		}
	};

	const RenderPack = ({ index, item }) => {
		const [selected] = useState(current.id === item.id);
		return (
			<TouchableOpacity onPress={() => setCurrent(item)}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						borderColor: selected ? '#69c1d3' : Colors.black,
						borderWidth: 1,
						borderRadius: 7,
						padding: 20,
						marginBottom: index !== payments.length - 1 ? 20 : 0,
						backgroundColor: Colors.white,
					}}>
					<View
						style={{
							height: 24,
							width: 24,
							borderRadius: 12,
							borderColor: selected ? '#69c1d3' : '#000000',
							borderWidth: 2,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						{selected ? (
							<View
								style={{
									width: 14,
									height: 14,
									borderRadius: 7,
									backgroundColor: '#69c1d3',
								}}
							/>
						) : null}
					</View>
					<View>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
								marginHorizontal: 10,
								color: Colors.black,
								textAlign: 'center',
							}}>
							{item.title}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<View>
					<View>
						<View style={styles.cardContainer}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<View
									style={{
										width: 25,
										height: 25,
										alignItems: 'center',
										justifyContent: 'center',
										borderColor: Colors.greenText,
										borderWidth: 1,
										borderRadius: 12,
										marginEnd: 10,
									}}>
									<Icon
										name="percent"
										style={{
											margin: 5,
											fontSize: 12,
											fontFamily: Fonts.semiBold,
											textAlign: 'center',
											color: Colors.greenText,
										}}
									/>
								</View>
								<Text
									style={{
										fontSize: 14,
										fontFamily: Fonts.semiBold,
										color: Colors.greenText,
									}}>
									Vouchers Available
								</Text>
							</View>
							<TouchableOpacity>
								<View>
									<Text
										style={{
											fontSize: 14,
											color: '#ea5f62',
										}}>
										View
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						<Input
							placeholder={'Enter Coupon'}
							value={coupon}
							onChangeText={(val) => setCoupon(val)}
							inputContainerStyle={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginHorizontal: 20,
								backgroundColor: Colors.white,
								borderRadius: 8,
								borderBottomWidth: 0,
							}}
							containerStyle={{
								paddingHorizontal: 0,
							}}
							inputStyle={{
								fontSize: 14,
								paddingStart: 10,
							}}
							rightIcon={
								<TouchableOpacity
									onPress={() => applyCoupon()}
									style={{
										height: '80%',
										aspectRatio: 1,
										marginEnd: 10,
										alignItems: 'center',
										justifyContent: 'center',
										display:
											coupon.length === 0
												? 'none'
												: 'flex',
									}}>
									<Icon
										name="check"
										style={{
											height: '80%',
											aspectRatio: 1,
											borderRadius: 25,
											borderColor: Colors.black,
											borderWidth: 1,
											textAlign: 'center',
											textAlignVertical: 'center',
										}}
									/>
								</TouchableOpacity>
							}
						/>
					</View>
					<View
						style={{
							backgroundColor: Colors.white,
							marginHorizontal: 20,
							borderRadius: 8,
							paddingVertical: 10,
						}}>
						<View style={styles.basketItem}>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.primary,
								}}>
								Basket Value
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.primary,
								}}>
								₹ {cart.total}
							</Text>
						</View>
						<View style={styles.basketItem}>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.primary,
								}}>
								Delivery Charge
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.primary,
								}}>
								₹ 50
							</Text>
						</View>
						<View style={styles.basketItem}>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.semiBold,
								}}>
								Total Amount Payable
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.semiBold,
								}}>
								₹ {cart.total + 50 - saving}
							</Text>
						</View>
						{saving !== 0 && (
							<View
								style={[
									styles.basketItem,
									{
										backgroundColor: Colors.greenBackground,
										marginHorizontal: 10,
										paddingHorizontal: 5,
										borderRadius: 6,
									},
								]}>
								<Text
									style={{
										fontSize: 14,
										fontFamily: Fonts.semiBold,
										color: Colors.greenText,
									}}>
									Total Savings
								</Text>
								<Text
									style={{
										fontSize: 14,
										fontFamily: Fonts.semiBold,
										color: Colors.greenText,
									}}>
									₹ {saving}
								</Text>
							</View>
						)}
					</View>
					<View
						style={{
							marginHorizontal: 20,
							marginVertical: 10,
							backgroundColor: Colors.white,
							borderRadius: 8,
							paddingStart: 10,
							paddingTop: 10,
						}}>
						<View
							style={{
								paddingBottom: 20,
							}}>
							<Text
								style={{
									fontSize: 16,
									fontFamily: Fonts.semiBold,
								}}>
								Deliver To:
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}>
							{address.currentLocation ? (
								<Text
									style={{
										fontSize: 16,
										fontFamily: Fonts.primary,
										marginBottom: 10,
										color: Colors.black,
									}}>
									{address.address}
								</Text>
							) : (
								<Address data={address.address} />
							)}
							<View
								style={{
									marginEnd: 20,
									alignSelf: 'flex-start',
								}}>
								<TouchableOpacity
									onPress={() => setShow(true)}
									style={{
										paddingHorizontal: 10,
										paddingVertical: 5,
										borderRadius: 4,
										backgroundColor: Colors.payNow,
									}}>
									<View>
										<Text style={{ color: Colors.white }}>
											Change
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					{profile.role === 'LFB Role' && (
						<>
							<View
								style={{
									marginHorizontal: 25,
									marginVertical: 20,
								}}>
								<Text
									style={{
										fontSize: 16,
										fontFamily: Fonts.semiBold,
									}}>
									Please Select Payment Option
								</Text>
							</View>

							<FlatList
								contentContainerStyle={{
									marginHorizontal: 20,
									backgroundColor: Colors.white,
								}}
								data={payments}
								renderItem={(object) => (
									<RenderPack {...object} />
								)}
								keyExtractor={(index, item) => index.toString()}
							/>
						</>
					)}
					{profile.role === 'LFB Role' && (
						<Text>Payment will be offline</Text>
					)}
					<TouchableOpacity onPress={processPayment}>
						<View
							style={{
								marginTop: 20,
								marginHorizontal: 20,
								height: 50,
								backgroundColor: '#FD3B14',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
							}}>
							<Text
								style={{
									fontSize: 16,
									fontFamily: Fonts.semiBold,
									color: Colors.white,
								}}>
								{profile.role === 'LFB Role'
									? 'Place Order'
									: 'Place Order & Pay'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Modal
				style={StyleSheet.absoluteFill}
				animationType="fade"
				transparent
				visible={show}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}>
					<View
						style={{
							backgroundColor: Colors.white,
							marginHorizontal: 20,
							borderRadius: 8,
							paddingVertical: 20,
							...Shadow.medium,
						}}>
						<TouchableOpacity
							onPress={() => {
								setAddress({
									currentLocation: true,
									address: location.location,
								});
								setShow(false);
							}}>
							<View style={{ marginHorizontal: 20 }}>
								<Text
									style={{
										fontSize: 18,
										fontFamily: Fonts.semiBold,
									}}>
									Current Location
								</Text>
								<Text
									style={{
										fontSize: 16,
										fontFamily: Fonts.primary,
										marginBottom: 10,
									}}>
									{location.location}
								</Text>
							</View>
						</TouchableOpacity>
						<View
							style={{
								width: '100%',
								height: 1,
								backgroundColor: 'gray',
							}}
						/>
						{profile.shipping.first_name !== null && (
							<TouchableOpacity
								onPress={() => {
									setAddress({
										currentLocation: false,
										address: profile.shipping,
									});
									setShow(false);
								}}>
								<Address data={profile.shipping} />
							</TouchableOpacity>
						)}
						<View
							style={{
								width: '100%',
								height: 1,
								backgroundColor: 'gray',
							}}
						/>
						{profile.billing.first_name !== null && (
							<TouchableOpacity
								onPress={() => {
									setAddress({
										currentLocation: false,
										address: profile.billing,
									});
									setShow(false);
								}}>
								<Address data={profile.billing} />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		marginVertical: 10,
		flexDirection: 'row',
		marginHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: Colors.white,
		padding: 10,
		borderRadius: 8,
	},
	basketItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
});
