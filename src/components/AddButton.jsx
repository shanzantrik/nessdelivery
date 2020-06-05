import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

export default function AddButton() {
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
						backgroundColor: '#4a4a4a',
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
						backgroundColor: '#ea5f62',
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
