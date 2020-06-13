import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Shadow, Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};

export default function CategoryItem(props) {
	const navigation = useNavigation();
	const {
		item,
		containerStyle,
		imageContainerStyle,
		imageStyle,
		textStyle,
		priceStyle,
		oldPriceStyle,
		discountContainerStyle,
		discountTextStyle,
	} = props;
	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate('ProductDetail')}>
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
					<Text
						style={[
							styles.priceStyle,
							item.sale_price === '' && { marginTop: 5 },
							priceStyle,
						]}>
						Rs {item.price}
					</Text>
					{item.sale_price !== '' && (
						<Text style={[styles.oldPriceStyle, oldPriceStyle]}>
							Rs {item.regular_price}
						</Text>
					)}
				</View>
				{item.sale_price !== '' && (
					<View
						style={[
							styles.discountTextContainer,
							discountContainerStyle,
						]}>
						<Text style={[styles.discountText, discountTextStyle]}>
							Rs {item.regular_price - item.price} off
						</Text>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}

CategoryItem.propTypes = {
	item: PropTypes.object.isRequired,
	containerStyle: PropTypes.object,
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
		fontSize: 18,
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
		fontSize: 12,
		color: 'white',
		fontFamily: Fonts.semiBold,
	},
});
