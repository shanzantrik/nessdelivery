import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Shadow, Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import API from '../API';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};

export default function CategoryItem(props) {
	const navigation = useNavigation();
	const {
		item,
		containerStyle,
		parentContainerStyle,
		imageContainerStyle,
		imageStyle,
		textStyle,
		priceStyle,
		oldPriceStyle,
		discountContainerStyle,
		discountTextStyle,
		navigateTo,
	} = props;
	let relatedProducts = [];
	const [selectedQuantity, setSelectedQuantity] = React.useState(
		item.type === 'variable' ? item.product_variations[0] : item
	);
	const [price, setPrice] = React.useState(
		item.type === 'variable'
			? item.product_variations[0].on_sale
				? item.product_variations[0].regular_price
				: item.product_variations[0].sale_price
			: item.price
	);

	const changeQuantity = (val) => {
		setSelectedQuantity(val);
		setPrice(val.on_sale ? val.sale_price : val.regular_price);
	};

	React.useEffect(() => {
		if (item.related_ids.length !== 0) {
			Promise.all(
				item.related_ids.map((product_id) => {
					return API.get(`products/${product_id}`);
				})
			)
				.then((res) => {
					res.map((data) => {
						relatedProducts.push(data.data);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<TouchableWithoutFeedback
			onPress={() =>
				navigation.navigate(navigateTo || 'ProductDetail', {
					item: item,
					type: item.type,
					selected: selectedQuantity,
					changeQuantity: changeQuantity,
					relatedProductsData: relatedProducts,
				})
			}>
			<View style={parentContainerStyle}>
				<View style={[styles.container, containerStyle]}>
					<View style={[styles.imageContainer, imageContainerStyle]}>
						<FastImage
							source={{ uri: item.images[0].src }}
							style={[styles.image, imageStyle]}
							resizeMode={FastImage.resizeMode.contain}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text
							style={[styles.textStyle, textStyle]}
							numberOfLines={2}
							adjustsFontSizeToFit={true}>
							{item.name}
						</Text>
					</View>
					<View
						style={{
							alignSelf: 'flex-start',
							marginStart: 10,
							position: 'absolute',
							bottom: 5,
						}}
						adjustsFontSizeToFit={true}>
						<Text
							style={[
								styles.priceStyle,
								{
									marginBottom:
										item.sale_price !== '' ? 0 : 5,
								},
								priceStyle,
							]}>
							MRP: ₹ {Math.round(item.price)}
						</Text>
						{item.sale_price !== '' && (
							<Text style={[styles.oldPriceStyle, oldPriceStyle]}>
								₹ {Math.round(item.regular_price)}
							</Text>
						)}
					</View>
					{item.sale_price !== '' && (
						<View
							style={[
								styles.discountTextContainer,
								discountContainerStyle,
							]}>
							<Text
								style={[
									styles.discountText,
									discountTextStyle,
								]}>
								₹ {Math.round(item.regular_price - item.price)}{' '}
								off
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

CategoryItem.propTypes = {
	item: PropTypes.object.isRequired,
	imageContainerStyle: PropTypes.object,
	imageStyle: PropTypes.object,
	textStyle: PropTypes.object,
	backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		margin: 8,
		marginBottom: 30,
		borderRadius: 10,
		backgroundColor: Colors.white,
		...Shadow.dark,
	},
	imageContainer: {
		width: '100%',
		height: '55%',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 8,
	},
	image: {
		flex: 1,
		height: undefined,
		width: '100%',
	},
	textContainer: {
		marginHorizontal: 10,
		alignSelf: 'flex-start',
	},
	textStyle: {
		fontSize: 13,
		color: 'black',
		textTransform: 'capitalize',
		fontFamily: Fonts.bold,
	},
	priceStyle: {
		fontSize: 13,
		fontFamily: Fonts.semiBold,
	},
	oldPriceStyle: {
		fontSize: 12,
		color: '#ff0000cc',
		fontFamily: Fonts.semiBold,
		textDecorationLine: 'line-through',
	},
	discountTextContainer: {
		position: 'absolute',
		right: 5,
		bottom: 15,
		backgroundColor: '#88cf45',
		paddingHorizontal: 6,
		paddingVertical: 4,
		borderRadius: 10,
	},
	discountText: {
		fontSize: 10,
		color: 'white',
		fontFamily: Fonts.semiBold,
	},
});
