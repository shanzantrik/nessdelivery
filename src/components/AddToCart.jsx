import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

export default function AddToCart() {
	const navigation = useNavigation();

	return (
		<View style={{ flexDirection: 'row', width: wp(100) }}>
			<TouchableOpacity
				style={{
					flex: 1,
				}}
				activeOpacity={0.8}
				onPress={() => navigation.navigate('Cart')}>
				<View
					style={{
						paddingVertical: 20,
						flexDirection: 'row',
						backgroundColor: Colors.addToCart,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Icon
						name="shopping-basket"
						style={{
							fontSize: 18,
							color: Colors.white,
							marginEnd: 10,
						}}
					/>
					<Text
						style={{
							fontSize: 15,
							fontFamily: Fonts.semiBold,
							textAlign: 'center',
							color: Colors.white,
							textTransform: 'uppercase',
						}}>
						Add to Cart
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					flex: 1,
				}}
				activeOpacity={0.8}
				onPress={() => navigation.navigate('Payment')}>
				<View
					style={{
						paddingVertical: 20,
						flexDirection: 'row',
						backgroundColor: Colors.payNow,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Icon
						name="credit-card"
						style={{
							fontSize: 18,
							color: Colors.white,
							marginEnd: 10,
						}}
					/>
					<Text
						style={{
							fontSize: 15,
							fontFamily: Fonts.semiBold,
							textAlign: 'center',
							color: Colors.white,
							textTransform: 'uppercase',
						}}>
						Pay Now
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	addBtnContainer: {
		flexDirection: 'row',
		width: 75,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e66067',
		borderRadius: 5,
	},
	addBtnText: {
		fontSize: 14,
		fontFamily: Fonts.semiBold,
		textTransform: 'uppercase',
		color: Colors.white,
		textAlign: 'center',
	},
	itemCounterContainer: {
		flex: 1,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		width: 75,
		backgroundColor: Colors.white,
	},
	countContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	count: {
		fontSize: 20,
		fontFamily: Fonts.semiBold,
		color: '#e66067',
	},
	countTextContainer: {
		flex: 1,
		height: '100%',
		backgroundColor: '#e660674d',
		alignItems: 'center',
		justifyContent: 'center',
	},
	countText: {
		fontSize: 12,
		textAlign: 'center',
		fontFamily: Fonts.semiBold,
	},
});
