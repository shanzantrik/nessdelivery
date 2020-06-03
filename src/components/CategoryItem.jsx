import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Shadow } from '../constants';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};

export default function CategoryItem(props) {
	const {
		containerStyle,
		imageContainerStyle,
		imageStyle,
		textStyle,
		image,
		backgroundColor,
		title,
		price,
		oldPrice,
		discount,
		priceStyle,
		oldPriceStyle,
		discountContainerStyle,
		discountTextStyle,
	} = props;
	return (
		<TouchableOpacity>
			<View
				style={[
					styles.container,
					{ backgroundColor: backgroundColor },
					containerStyle,
				]}>
				<View style={[styles.imageContainer, imageContainerStyle]}>
					<Image source={image} style={[styles.image, imageStyle]} />
				</View>
				<View style={styles.textContainer}>
					<Text style={[styles.textStyle, textStyle]}>{title}</Text>
					<Text style={[styles.priceStyle, priceStyle]}>
						₹ {price}
					</Text>
					<Text style={[styles.oldPriceStyle, oldPriceStyle]}>
						₹ {oldPrice}
					</Text>
				</View>
				<View
					style={[
						styles.discountTextContainer,
						discountContainerStyle,
					]}>
					<Text style={[styles.discountText, discountTextStyle]}>
						₹ {discount} off
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

CategoryItem.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.number.isRequired,
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
		marginBottom: 16,
		borderRadius: 10,
		...Shadow.dark,
	},
	imageContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: '68%',
		aspectRatio: 400 / 250,
		resizeMode: 'contain',
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
