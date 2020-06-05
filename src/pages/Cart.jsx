import React, { useState } from 'react';
import {
	Animated,
	Easing,
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts, Colors } from '../constants';

const cartData = [
	{
		brand: 'McCain',
		title: 'French Fries',
		image: require('../assets/homepage/french_fries.png'),
		weight: 10,
		price: 200,
		oldPrice: 150,
		quantity: 2,
	},
	{
		brand: 'Delicious',
		title: 'Chicken Salami',
		image: require('../assets/sub_categories/salami.jpg'),
		weight: 1,
		price: 250,
		oldPrice: 300,
		quantity: 3,
	},
];

export default function Card({ navigation }) {
	const [cart, setCart] = useState(cartData);
	const ProductItem = ({ item, index }) => {
		const [heartChecked, heartToggle] = useState(false);
		const [count, setCount] = useState(item.quantity);

		if (cart.length === 0) {
			console.log('Cart is empty!');
		}

		const countAnimation = () => {
			Animated.timing(countAnimation, {
				toValue: 0,
				duration: 500,
				easing: Easing.ease,
			}).start();
		};

		const AddButton = () => {
			return (
				<Animated.View style={styles.itemCounterContainer}>
					<TouchableOpacity
						style={{ flex: 1 }}
						onPress={() => {
							if (count === 1) {
								setCart(cart.splice(index, 1));
								setCount(count - 1);
								console.log(cart.splice(index, 1));
							} else {
								setCount(count - 1);
							}
							console.log('Index: ' + index);
							console.log('Count: ' + count);
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
						style={{ flex: 1 }}
						onPress={() => setCount(count + 1)}>
						<Animated.View style={styles.countContainer}>
							<Text style={styles.count}>+</Text>
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
			);
		};
		return (
			<View style={styles.cardContainer}>
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate('ProductDetail')}>
					<View style={{ width: '30%', margin: 5 }}>
						<Image source={item.image} style={styles.image} />
					</View>
				</TouchableWithoutFeedback>
				<View
					style={{
						width: '70%',
					}}>
					<TouchableWithoutFeedback
						onPress={() => navigation.navigate('ProductDetail')}>
						<View>
							<Text style={styles.brand}>{item.brand}</Text>
							<Text style={styles.title}>{item.title}</Text>
						</View>
					</TouchableWithoutFeedback>
					<View style={styles.pickerContainer}>
						<Text style={styles.weightText}>{item.weight} Kg</Text>
					</View>
					<View>
						<Text style={styles.oldPrice}>
							MRP: Rs {item.oldPrice}
						</Text>
						<Text style={styles.price}>Rs {item.price}</Text>
					</View>
					<View
						style={{
							position: 'absolute',
							right: 10,
							top: 0,
							height: '100%',
							alignItems: 'flex-end',
							justifyContent: 'space-between',
							marginHorizontal: 10,
						}}>
						<TouchableOpacity
							onPress={() => heartToggle(!heartChecked)}>
							<Icon
								name="heart"
								style={[
									styles.loveIcon,
									heartChecked && {
										color: '#ff0000',
									},
								]}
								solid={heartChecked}
							/>
						</TouchableOpacity>
						<AddButton />
					</View>
				</View>
			</View>
		);
	};
	if (cart.length !== 0) {
		return (
			<View style={styles.container}>
				<FlatList
					data={cart}
					renderItem={(object) => <ProductItem {...object} />}
					ItemSeparatorComponent={() => (
						<View
							style={{ backgroundColor: '#999999', height: 1 }}
						/>
					)}
				/>
				<View
					style={{
						width: '100%',
						height: 70,
						paddingHorizontal: 40,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						position: 'absolute',
						bottom: 0,
						backgroundColor: '#36474f',
					}}>
					<View>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.primary,
								color: Colors.white,
							}}>
							Rs 200
						</Text>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.primary,
								color: '#90c336',
							}}>
							Saved Rs 20
						</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => navigation.navigate('Payment')}>
						<View
							style={{
								width: '100%',
								height: '60%',
								paddingVertical: 10,
								paddingHorizontal: 20,
								backgroundColor: '#e66067',
								borderRadius: 5,
							}}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 16,
									fontFamily: Fonts.semiBold,
									color: Colors.white,
									textTransform: 'uppercase',
								}}>
								Checkout
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	} else {
		return (
			<View style={{ alignItems: 'center', marginTop: 20 }}>
				<Text style={{ fontSize: 20, fontFamily: Fonts.semiBold }}>
					Cart is Empty
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: wp(100),
	},
	cardContainer: {
		flexDirection: 'row',
		paddingVertical: 10,
		alignSelf: 'center',
		padding: 8,
		width: '100%',
		backgroundColor: Colors.white,
	},
	titleContainer: {
		backgroundColor: '#f1f1f1',
	},
	title: {
		fontSize: 18,
		fontFamily: Fonts.semiBold,
	},
	brand: {
		color: '#8d8d8d',
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		textTransform: 'uppercase',
	},
	flatListContainer: {
		paddingBottom: 10,
	},
	image: {
		height: 100,
		width: 100,
		resizeMode: 'contain',
	},
	rating: {
		flexDirection: 'row',
		marginVertical: 2,
	},
	ratingContainer: {
		flexDirection: 'row',
		backgroundColor: '#ccecb1',
		alignItems: 'center',
		paddingHorizontal: 4,
		paddingVertical: 2,
		marginEnd: 5,
	},
	ratingText: {
		fontSize: 10,
		fontFamily: Fonts.semiBold,
		marginEnd: 4,
		color: Colors.greenText,
	},
	ratingStar: {
		fontSize: 10,
		fontFamily: Fonts.semiBold,
		color: Colors.greenText,
	},
	ratingCountContainer: {
		alignItems: 'center',
	},
	ratingCount: {
		fontSize: 13,
		fontFamily: Fonts.primary,
		textAlignVertical: 'bottom',
	},
	pickerContainer: {
		width: '70%',
		marginVertical: 6,
	},
	picker: {
		height: 30,
	},
	pickerItem: {
		height: 5,
	},
	price: {
		fontSize: 16,
		fontFamily: Fonts.bold,
	},
	oldPrice: {
		fontSize: 12,
		marginTop: 5,
		fontFamily: Fonts.semiBold,
		color: '#ff0000',
		textDecorationLine: 'line-through',
	},
	loveIcon: {
		fontSize: 20,
		marginRight: 5,
	},
	cartPlusIcon: {
		fontSize: 20,
	},
	filterIcon: {
		fontSize: 25,
	},
	listIcon: {
		fontSize: 20,
		marginEnd: 10,
	},
	gridIcon: {
		fontSize: 20,
	},
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
		borderRadius: 5,
		borderColor: Colors.black,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		width: 75,
		height: 30,
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
	weightText: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
	},
});
