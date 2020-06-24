import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ToastAndroid,
	StyleSheet,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Actions from '../redux/Actions';
import FastImage from 'react-native-fast-image';
import { Picker } from '@react-native-community/picker';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts, Colors } from '../constants';
import API from '../API';
import { useNavigation } from '@react-navigation/native';

export default function ProductItem({ item, index }) {
	const navigation = useNavigation();
	const cartData = useSelector((state) => state.cart);
	const profile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	useEffect(() => {
		setCart(cartData);
		// console.log('Setting Cart Data');
		const cartItem = cartData.addedItems.find((val) => val.id === item.id);
		if (cartItem) {
			setCount(cartItem.quantity);
			btnToggle(true);
		} else {
			setCount(0);
			btnToggle(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setCart(cartData);
		const cartItem = cartData.addedItems.find((val) => val.id === item.id);
		if (cartItem) {
			setCount(cartItem.quantity);
		} else {
			setCount(0);
			btnToggle(false);
		}
	}, [cartData, cart, item.id, btnEnabled]);
	const [cart, setCart] = useState(cartData);

	const [count, setCount] = useState(0);
	const [btnEnabled, btnToggle] = useState(count !== 0);

	const [price, setPrice] = useState(
		item.type === 'variable'
			? item.product_variations[0].on_sale
				? item.product_variations[0].regular_price
				: item.product_variations[0].sale_price
			: item.price
	);
	const [selectedQuantity, setSelectedQuantity] = useState(
		item.type === 'variable' ? item.product_variations[0] : item
	);

	const changeQuantity = (val) => {
		setSelectedQuantity(val);
		setPrice(val.on_sale ? val.sale_price : val.regular_price);
	};

	const cartAction = (action) => {
		dispatch({
			type: action,
			payload: {
				...item,
				brand: item.brands[0].name,
				image: item.images[0].src,
				price: price,
				selected: selectedQuantity,
				quantity: count,
			},
		});
	};

	const navigateToProductDetail = () => {
		let relatedProducts = [];
		if (item.related_ids.length !== 0) {
			Promise.all(
				item.related_ids.map((product_id) => {
					return API.get(`products/${product_id}`);
				})
			)
				.then((res) => {
					res.map((val) => {
						relatedProducts.push(val.data);
					});

					navigation.navigate('ProductDetail', {
						item: item,
						type: item.type,
						selected: selectedQuantity,
						changeQuantity: changeQuantity,
						relatedProductsData: relatedProducts,
					});
				})
				.catch((error) => {
					console.error(error);
					ToastAndroid.show(
						'Error getting related products',
						ToastAndroid.LONG
					);
				});
		}
	};

	const countAnimation = () => {
		Animated.timing(countAnimation, {
			toValue: 0,
			duration: 500,
			easing: Easing.ease,
		}).start();
	};

	const AddButton = () => {
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
					onPress={() => {
						btnToggle(!btnEnabled);
						cartAction(Actions.ADD_TO_CART);
						console.log('Adding to Cart');
					}}>
					<View style={styles.addBtnContainer}>
						<Text style={styles.addBtnText}>Add</Text>
					</View>
				</TouchableOpacity>
			);
		}
	};
	return (
		<View style={styles.cardContainer} key={index}>
			<TouchableWithoutFeedback onPress={navigateToProductDetail}>
				<View
					style={{
						width: '30%',
						margin: 5,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<FastImage
						source={{
							uri: item?.images[0]?.src,
						}}
						style={styles.image}
					/>
				</View>
			</TouchableWithoutFeedback>
			<View
				style={{
					width: '70%',
				}}>
				<TouchableWithoutFeedback onPress={navigateToProductDetail}>
					<View>
						<Text style={styles.brand}>
							{item?.brands[0]?.name}
						</Text>
						<Text style={styles.title}>{item.name}</Text>
					</View>
				</TouchableWithoutFeedback>
				{item.type === 'variable' ? (
					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={selectedQuantity}
							onValueChange={(value) => changeQuantity(value)}
							mode="dropdown"
							style={styles.picker}
							itemStyle={styles.pickerItem}>
							{item.product_variations.map((variation) => {
								return (
									<Picker.Item
										label={variation.attributes[0].option.replace(
											'-',
											'.'
										)}
										value={variation}
										itemStyle={{
											textTransform: 'capitalize',
										}}
									/>
								);
							})}
						</Picker>
					</View>
				) : null}
				{profile.role !== 'LFB Role' && (
					<View
						style={{
							position: 'absolute',
							bottom: 0,
						}}>
						{item.sale_price !== '' ||
							(item.on_sale && (
								<Text
									style={[
										styles.oldPrice,
										!item.sale_price && {
											display: 'none',
										},
									]}>
									₹ {item.price}
								</Text>
							))}
						<Text style={styles.price}>MRP ₹ {price}</Text>
					</View>
				)}
				<View
					style={{
						position: 'absolute',
						right: 10,
						top: 0,
						height: '100%',
						alignItems: 'flex-end',
						justifyContent: 'flex-end',
						marginHorizontal: 10,
					}}>
					<AddButton />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: wp(100),
		paddingTop: 10,
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
		textTransform: 'capitalize',
	},
	flatListContainer: {
		paddingBottom: 80,
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
		borderWidth: 1,
		borderColor: '#8d8d8d',
		width: '50%',
		marginVertical: 6,
		marginBottom: 35,
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
});
