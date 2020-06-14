import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet,
	ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import {
	PackSizes,
	AddButton as AddToCart,
	CategoriesFlatList,
} from '../components';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import API from '../API';
import { useDispatch } from 'react-redux';
import Animated from 'react-native-reanimated';
import Actions from '../redux/Actions';

export default function ProductDetail({ navigation, route }) {
	const {
		item,
		type,
		selected,
		changeQuantity,
		relatedProductsData,
	} = route.params;

	const dispatch = useDispatch();

	const [count, setCount] = useState(0);
	const [btnEnabled, btnToggle] = useState(false);

	const cartAction = (action) => {
		dispatch({
			type: action,
			payload: {
				...item,
				brand: item.brands[0].name,
				image: item.images[0].src,
				price: price,
				selected: selected,
				quantity: count,
			},
		});
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
							setCount(count - 1);
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
							setCount(count + 1);
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
						setCount(count + 1);
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

	const [itemName, setItemName] = useState(
		type === 'variable' ? selected.sku : selected.name
	);
	const [price, setPrice] = useState(
		type === 'variable'
			? selected.on_sale
				? selected.sale_price
				: selected.regular_price
			: item.price
	);
	const [regularPrice, setRegularPrice] = useState(
		type === 'variable' ? selected.regular_price : item.regular_price
	);

	const [relatedProducts] = useState(relatedProductsData);

	const [selectedImage, setSelectedImage] = useState(item?.images[0].src);
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
				<View
					style={{
						marginTop: 20,
					}}>
					<View style={{ marginHorizontal: 20 }}>
						<View
							style={{
								backgroundColor: '#f2f9e9',
								width: '30%',
								borderRadius: 5,
								borderWidth: 1,
								borderColor: Colors.greenText,
								marginBottom: 5,
							}}>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.bold,
									paddingVertical: 5,
									paddingHorizontal: 10,
									textAlign: 'center',
									color: Colors.black,
								}}>
								{item?.brands[0]?.name}
							</Text>
						</View>
						<View>
							<Text
								style={{
									fontSize: 16,
									fontFamily: Fonts.semiBold,
								}}>
								{itemName}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								width: '60%',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginTop: 4,
							}}>
							<Text
								style={{
									fontSize: 16,
									fontFamily: Fonts.bold,
								}}>
								₹ {price}
							</Text>
							<View
								style={
									item.sale_price
										? {
												flexDirection: 'row',
												alignItems: 'center',
										  }
										: { display: 'none' }
								}>
								<Text
									style={{
										fontSize: 13,
										fontFamily: Fonts.semiBold,
										color: '#ff0000e6',
										textDecorationLine: 'line-through',
										marginEnd: 20,
									}}>
									MRP: ₹ {regularPrice}
								</Text>
								<View
									style={{
										backgroundColor: '#eb5c5e',
										borderTopStartRadius: 5,
										borderBottomEndRadius: 5,
									}}>
									<Text
										style={{
											marginHorizontal: 10,
											marginVertical: 2,
											color: Colors.white,
										}}>
										₹{' '}
										{parseInt(item.regular_price, 10) -
											parseInt(item.sale_price, 10)}{' '}
										off
									</Text>
								</View>
							</View>
						</View>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.semiBold,
								color: 'gray',
							}}>
							(Inclusive of all taxes)
						</Text>
					</View>
					<View
						style={{
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<SharedElement id={`item.${item.id}.photo`}>
							<FastImage
								source={{ uri: selectedImage }}
								style={{
									width: '70%',
									aspectRatio: 1,
									marginVertical: 20,
									padding: 10,
								}}
								resizeMode={FastImage.resizeMode.contain}
							/>
						</SharedElement>
						<View
							style={{
								flexDirection: 'row',
								marginStart: 30,
							}}>
							{item.images &&
								item.images.map((image) => {
									return (
										<TouchableOpacity
											onPress={() =>
												setSelectedImage(image.src)
											}>
											<View
												style={{
													borderWidth: 1,
													borderColor: 'gray',
													alignItems: 'center',
													justifyContent: 'center',
													padding: 2,
													marginEnd: 20,
												}}>
												<FastImage
													source={{ uri: image.src }}
													style={{
														width: 40,
														height: 40,
													}}
												/>
											</View>
										</TouchableOpacity>
									);
								})}
						</View>
					</View>
					{item.type === 'variable' && (
						<PackSizes
							data={item.product_variations}
							selected={selected}
							setName={setItemName}
							setPrice={setPrice}
							setOldPrice={setRegularPrice}
							changeQuantity={changeQuantity}
						/>
					)}
					<View
						style={[
							{
								borderColor: '#999999',
								borderBottomWidth: 2,
								paddingVertical: 20,
								marginHorizontal: 20,
							},
							item.type === 'variable' && {
								borderTopWidth: 2,
							},
						]}>
						<View style={{ marginBottom: 10 }}>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.bold,
								}}>
								Your next available slot
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<Icon
								name="truck"
								style={{ fontSize: 14, marginEnd: 10 }}
							/>
							<Text>
								Standard Delivery: Tomorrow 8:00 AM - 10:00 AM
							</Text>
						</View>
					</View>
					<View
						style={{
							borderBottomColor: '#999999',
							borderBottomWidth: 1,
							paddingVertical: 20,
							marginHorizontal: 20,
						}}>
						<Text
							style={{
								fontSize: 18,
								fontFamily: Fonts.semiBold,
								marginBottom: 20,
							}}>
							About this Product
						</Text>

						<Text
							style={{
								fontSize: 16,
								fontFamily: Fonts.primary,
								color: '#505050',
							}}>
							{/* Regex to remove html tags */}
							{item.description.replace(/(<([^>]+)>)/gi, '')}
						</Text>
					</View>
					{relatedProducts.length !== 0 && (
						<View style={{ marginTop: 20, marginBottom: 30 }}>
							<CategoriesFlatList
								title={'Related Products'}
								data={relatedProducts}
								viewAll={false}
							/>
						</View>
					)}
				</View>
			</ScrollView>
			<View style={{ position: 'absolute', bottom: 0 }}>
				<AddToCart />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	rating: {
		flexDirection: 'row',
		marginVertical: 8,
		alignItems: 'center',
	},
	ratingContainer: {
		flexDirection: 'row',
		backgroundColor: '#ccecb1',
		alignItems: 'center',
		paddingHorizontal: 4,
		paddingVertical: 3,
		marginEnd: 5,
	},
	ratingText: {
		fontSize: 12,
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingCount: {
		fontSize: 14,
		fontFamily: Fonts.primary,
		textAlignVertical: 'bottom',
	},
});
