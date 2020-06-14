import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { Fonts, Colors, Shadow } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux/lib/hooks/useSelector';

export default function CardPage({ navigation }) {
	const cart = useSelector((state) => state.cart);
	const [saved, toggleSaved] = useState(true);
	return (
		<View>
			<View
				style={{
					position: 'absolute',
					top: 0,
					paddingHorizontal: 20,
					paddingVertical: 10,
					width: '100%',
					backgroundColor: Colors.white,
					...Shadow.medium,
				}}>
				<Text style={{ fontSize: 12, fontFamily: Fonts.semiBold }}>
					Total Amount Payable
				</Text>
				<Text style={{ fontSize: 14, fontFamily: Fonts.semiBold }}>
					₹ {cart.total + 50}
				</Text>
			</View>
			<View
				style={{
					marginTop: 80,
					paddingVertical: 20,
					backgroundColor: Colors.white,
					marginHorizontal: 20,
					borderRadius: 8,
				}}>
				<Input
					placeholder="Enter Card Number"
					label="Card Number"
					labelStyle={{
						fontSize: 12,
						fontFamily: Fonts.semiBold,
					}}
					inputStyle={{
						fontSize: 14,
						fontFamily: Fonts.semiBold,
					}}
				/>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Input
						containerStyle={{ flex: 1 }}
						label="Valid thru"
						placeholder="MM/YY"
						labelStyle={{
							fontSize: 12,
							fontFamily: Fonts.semiBold,
						}}
						inputStyle={{
							fontSize: 14,
							fontFamily: Fonts.semiBold,
						}}
					/>
					<Input
						containerStyle={{ flex: 1 }}
						label="CVV"
						placeholder="Security Code"
						labelStyle={{
							fontSize: 12,
							fontFamily: Fonts.semiBold,
						}}
						inputStyle={{
							fontSize: 14,
							fontFamily: Fonts.semiBold,
						}}
						maxLength={3}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 20,
					}}>
					<TouchableOpacity onPress={() => toggleSaved(!saved)}>
						<View
							style={{
								height: 20,
								width: 20,
								alignItems: 'center',
								justifyContent: 'center',
								borderColor: Colors.black,
								borderWidth: 1,
								borderRadius: 3,
								marginEnd: 10,
							}}>
							<Icon
								name="check"
								style={
									([
										{
											textAlign: 'center',
											fontSize: 12,
											fontFamily: Fonts.semiBold,
											color: '#ff000080',
										},
									],
									!saved && { display: 'none' })
								}
							/>
						</View>
					</TouchableOpacity>
					<Text>Save this card for faster payments</Text>
				</View>
			</View>
			<TouchableOpacity>
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
	);
}
