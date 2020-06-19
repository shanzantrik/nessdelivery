import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../redux/Actions';

export default function AddButton({ item, price, simple }) {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const cartData = useSelector((state) => state.cart);
	useEffect(() => {
		setCart(cartData);
		console.log('Setting Cart Data');
		const cartItem = cartData.addedItems.find((val) => val.id === item.id);
		if (cartItem) {
			setCount(cartItem.quantity);
		} else {
			setCount(0);
			btnToggle(false);
		}
		console.log('CartItem');
		console.log(cartItem);
	}, [cartData, cart, item.id, btnEnabled]);
	const [cart, setCart] = useState(cartData);

	const [count, setCount] = useState(0);
	const [btnEnabled, btnToggle] = useState(count !== 0);

	const cartAction = (action) => {
		dispatch({
			type: action,
			payload: {
				...item,
				brand: item.brands[0].name,
				image: item.images[0].src,
				price: price || item.price,
				selected: item,
				quantity: count,
			},
		});
	};

	const AddToCart = () => {
		if (btnEnabled) {
			return (
				<Animated.View style={styles.itemCounterContainer}>
					<TouchableOpacity
						style={{
							flex: 1,
						}}
						onPress={() => {
							if (count === 1) {
								btnToggle(!btnEnabled);
								cartAction(Actions.REMOVE_FROM_CART);
							} else {
								cartAction(Actions.SUB_QUANTITY);
							}
						}}>
						<View style={styles.countContainer}>
							<Text style={styles.count}>−</Text>
						</View>
					</TouchableOpacity>
					<Animated.View style={styles.countTextContainer}>
						<Animated.Text style={styles.countText}>
							{count}
						</Animated.Text>
					</Animated.View>
					<TouchableOpacity
						style={{
							flex: 1,
						}}
						onPress={() => {
							console.log('Updating in cart');
							cartAction(Actions.ADD_QUANTITY);
						}}>
						<Animated.View style={styles.countContainer}>
							<Text style={styles.count}>+</Text>
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
			);
		} else {
			return (
				<TouchableOpacity
					style={{
						flex: 1,
					}}
					activeOpacity={0.8}
					onPress={() => {
						btnToggle(!btnEnabled);
						cartAction(Actions.ADD_TO_CART);
						console.log('Adding to Cart');
					}}>
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
			);
		}
	};
	return (
		<View style={{ flexDirection: 'row', width: wp(100) }}>
			<AddToCart />
			<TouchableOpacity
				style={{
					flex: 1,
				}}
				activeOpacity={0.8}
				onPress={() => {
					cartAction(Actions.ADD_TO_CART);
					navigation.navigate('Payment');
				}}>
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
