import React, { useState } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import {
	PackSizes,
	AboutProduct,
	RatingsAndReviews,
	AddButton,
} from '../components';

const product = {
	brand: 'McCain',
	weight: 1,
	title: 'French Fries',
	imageFront: require('../assets/homepage/french_fries_front.png'),
	imageBack: require('../assets/homepage/french_fries_back.png'),
	price: 412,
	oldPrice: 490,
	discount: '16% off',
	rating: 4.3,
	ratingAndReviews: '17783 Ratings and 107 Reviews',
	about: [
		{
			title: 'About',
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
		{
			title: 'Ingredients',
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
		{
			title: 'Nitritional Facts',
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
		{
			title: 'Other Product Info',
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
	],
};

export default function ProductDetail({ navigation, route }) {
	const [weight, setWeight] = useState(product.weight);
	const [price, setPrice] = useState(product.price);
	const [oldPrice, setOldPrice] = useState(product.oldPrice);
	const [discount, setDiscount] = useState(product.discount);

	const [selectedImage, setSelectedImage] = useState(product.imageFront);
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
								{product.brand}
							</Text>
						</View>
						<View>
							<Text
								style={{
									fontSize: 16,
									fontFamily: Fonts.semiBold,
								}}>
								{product.title}, {weight} Kg Pouch
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
									fontSize: 14,
									fontFamily: Fonts.bold,
								}}>
								Rs {price}
							</Text>
							<Text
								style={{
									fontSize: 13,
									fontFamily: Fonts.semiBold,
									color: '#ff0000e6',
									textDecorationLine: 'line-through',
								}}>
								MRP: Rs {oldPrice}
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
									{discount}
								</Text>
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
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.rating}>
								<View style={styles.ratingContainer}>
									<Text style={styles.ratingText}>
										{product.rating}
									</Text>
									<Icon
										name="star"
										solid
										style={styles.ratingStar}
									/>
								</View>
								<TouchableOpacity>
									<View style={styles.ratingCountContainer}>
										<Text style={styles.ratingCount}>
											{product.ratingAndReviews}
										</Text>
										<Icon
											name="chevron-right"
											style={{ marginStart: 10 }}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View
						style={{
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Image
							source={selectedImage}
							style={{
								height: wp(80),
								aspectRatio: 1,
								resizeMode: 'center',
							}}
						/>
						<View
							style={{
								flexDirection: 'row',
								marginStart: 30,
							}}>
							<TouchableOpacity
								onPress={() =>
									setSelectedImage(product.imageFront)
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
									<Image
										source={product.imageFront}
										style={{
											width: 40,
											height: 40,
										}}
									/>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setSelectedImage(product.imageBack)
								}>
								<View
									style={{
										borderWidth: 1,
										borderColor: 'gray',
										alignItems: 'center',
										justifyContent: 'center',
										padding: 2,
										marginEnd: 10,
									}}>
									<Image
										source={product.imageBack}
										style={{
											width: 40,
											height: 40,
										}}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<PackSizes
						setWeight={setWeight}
						setPrice={setPrice}
						setOldPrice={setOldPrice}
						setDiscount={setDiscount}
					/>
					<View
						style={{
							borderColor: '#999999',
							borderTopWidth: 2,
							borderBottomWidth: 2,
							paddingVertical: 20,
							marginHorizontal: 20,
						}}>
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
					<AboutProduct data={product.about} />
					<RatingsAndReviews />
				</View>
			</ScrollView>
			<View style={{ position: 'absolute', bottom: 0 }}>
				<AddButton />
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
