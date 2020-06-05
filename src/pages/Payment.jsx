import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Fonts } from '../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const paymentOptions = [
	{
		title: 'Credit / Debit Card',
		icon: 'credit-card',
		navigate: 'CardPage',
	},
	{
		title: 'Net Banking',
		icon: 'credit-card',
	},
	{
		title: 'UPI',
		icon: 'credit-card',
	},
	{
		title: 'Wallets',
		icon: 'credit-card',
	},
	{
		title: 'Cash on Delivery',
		icon: 'credit-card',
	},
];

export default function Payment({ navigation }) {
	const _itemSeparator = () => {
		return <View style={{ backgroundColor: '#999999', height: 1 }} />;
	};

	const _renderItem = ({ index, item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					item.navigate && navigation.navigate(item.navigate);
				}}>
				<View style={[styles.basketItem, { paddingVertical: 20 }]}>
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon
							name={item.icon}
							style={{
								marginEnd: 20,
								fontSize: 14,
								fontFamily: Fonts.primary,
							}}
						/>
						<Text
							style={{ fontSize: 15, fontFamily: Fonts.primary }}>
							{item.title}
						</Text>
					</View>
					<View>
						<Icon
							name="chevron-right"
							style={{ fontSize: 14, fontFamily: Fonts.primary }}
						/>
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
								Rs 200
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
								Rs 50
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
								Rs 250
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
								Rs 20
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
							borderRadius: 8,
						}}
						data={paymentOptions}
						renderItem={_renderItem}
						ItemSeparatorComponent={_itemSeparator}
					/>
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
