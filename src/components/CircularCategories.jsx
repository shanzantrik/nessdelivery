import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts } from '../constants';

export default function CircularCategories(props) {
	const {
		containerStyle,
		imageContainerStyle,
		imageStyle,
		textStyle,
		image,
		backgroundColor,
		title,
	} = props;
	return (
		<TouchableOpacity>
			<View style={[styles.container, containerStyle]}>
				<View
					style={[
						styles.imageContainer,
						{ backgroundColor: backgroundColor },
						imageContainerStyle,
					]}>
					<Image source={image} style={[styles.image, imageStyle]} />
				</View>
				<View style={styles.titleContainer}>
					<Text style={[styles.textStyle, textStyle]}>{title}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

CircularCategories.propTypes = {
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
		justifyContent: 'center',
		marginHorizontal: 8,
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 50,
		marginBottom: 10,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '50%',
		height: '50%',
		resizeMode: 'contain',
	},
	textStyle: {
		fontSize: 12,
		color: 'black',
		textTransform: 'capitalize',
		fontFamily: Fonts.semiBold,
		textAlign: 'center',
	},
	titleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
