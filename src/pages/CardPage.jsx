import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { Fonts, Colors, Shadow } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux/lib/hooks/useSelector';

export default function CardPage({ navigation }) {
	const cart = useSelector((state) => state.cart);
	const [saved, toggleSaved] = useState(true);
	return (
		<View>
			<View style={styles.totalAmountContainer}>
				<Text style={styles.totalAmountText}>Total Amount Payable</Text>
				<Text style={styles.cartTotalText}>₹ {cart.total + 50}</Text>
			</View>
			<View style={styles.cardInputContainer}>
				<Input
					placeholder="Enter Card Number"
					label="Card Number"
					labelStyle={styles.cardLabel}
					inputStyle={styles.cardInput}
				/>
				<View style={styles.validThruContainer}>
					<Input
						containerStyle={styles.inputContainer}
						label="Valid thru"
						placeholder="MM/YY"
						labelStyle={styles.inputLabel}
						inputStyle={styles.inputStyle}
					/>
					<Input
						containerStyle={styles.inputContainer}
						label="CVV"
						placeholder="Security Code"
						labelStyle={styles.inputLabel}
						inputStyle={styles.inputStyle}
						maxLength={3}
					/>
				</View>
				<View style={styles.checkContainer}>
					<TouchableOpacity onPress={() => toggleSaved(!saved)}>
						<View style={styles.checkIconContainer}>
							<Icon
								name="check"
								style={
									([styles.checkIcon],
									!saved && styles.d_none)
								}
							/>
						</View>
					</TouchableOpacity>
					<Text>Save this card for faster payments</Text>
				</View>
			</View>
			<TouchableOpacity>
				<View style={styles.placeOrderContainer}>
					<Text style={styles.placeOrderText}>Place Order & Pay</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	totalAmountContainer: {
		position: 'absolute',
		top: 0,
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: '100%',
		backgroundColor: Colors.white,
		...Shadow.medium,
	},
	totalAmountText: {
		fontSize: 12,
		fontFamily: Fonts.semiBold,
	},
	cartTotalText: {
		fontSize: 14,
		fontFamily: Fonts.semiBold,
	},
	cardInputContainer: {
		marginTop: 80,
		paddingVertical: 20,
		backgroundColor: Colors.white,
		marginHorizontal: 20,
		borderRadius: 8,
	},
	cardLabel: {
		fontSize: 12,
		fontFamily: Fonts.semiBold,
	},
	cardInput: {
		fontSize: 14,
		fontFamily: Fonts.semiBold,
	},
	validThruContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	inputContainer: {
		flex: 1,
	},
	inputLabel: {
		fontSize: 12,
		fontFamily: Fonts.semiBold,
	},
	inputStyle: {
		fontSize: 14,
		fontFamily: Fonts.semiBold,
	},
	checkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	checkIconContainer: {
		height: 20,
		width: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: Colors.black,
		borderWidth: 1,
		borderRadius: 3,
		marginEnd: 10,
	},
	checkIcon: {
		textAlign: 'center',
		fontSize: 12,
		fontFamily: Fonts.semiBold,
		color: '#ff000080',
	},
	d_none: {
		display: 'none',
	},
	placeOrderContainer: {
		marginTop: 20,
		marginHorizontal: 20,
		height: 50,
		backgroundColor: '#FD3B14',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},
	placeOrderText: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		color: Colors.white,
	},
});
