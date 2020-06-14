import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Fonts } from '../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { encode as btoa } from 'base-64';

import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch } from 'react-redux';
import Actions from '../redux/Actions';

export default function Payment({ navigation }) {
	const [cart] = useState(useSelector((state) => state.cart));
	const [payments] = useState(useSelector((state) => state.payments));
	const [orderId, setOrderId] = useState('');
	const [current, setCurrent] = useState(payments[0]);

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
				description: 'Akshay Live Checkout',
				image: 'https://i.imgur.com/3g7nmJC.png',
				currency: 'INR',
				key: razorpay.settings.key_id.value,
				amount: cart.total * 100,
				name: 'Ness Frozen Hub',
				order_id: orderId, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
				prefill: {
					email: 'akshay2796@gmail.com',
					contact: '919934691419',
					name: 'Akshay Kumar',
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

	const processPayment = () => {
		switch (current.id) {
			case 'razorpay':
				razorpayOrder(current);
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
									style={{ fontSize: 14, color: '#ea5f62' }}>
									View
								</Text>
							</View>
						</TouchableOpacity>
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
								₹ {cart.total + 50}
							</Text>
						</View>
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
								₹ 20
							</Text>
						</View>
					</View>
					<View style={{ marginHorizontal: 25, marginVertical: 20 }}>
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
						renderItem={(object) => <RenderPack {...object} />}
						keyExtractor={(index, item) => index.toString()}
					/>
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
								Place Order & Pay
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
