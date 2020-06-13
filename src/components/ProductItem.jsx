import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts, Colors, Shadow } from '../constants';
import FastImage from 'react-native-fast-image';

export default function ProductItem({ item, index }) {
	// const [heartChecked, heartToggle] = useState(false);
	return (
		<View style={styles.cardContainer}>
			<View style={{ width: '30%', margin: 5 }}>
				<FastImage source={item.image} style={styles.image} />
			</View>
			<View
				style={{
					width: '70%',
					paddingLeft: 20,
				}}>
				<Text style={styles.title}>{item.title}</Text>
				<View style={{ marginTop: 20 }}>
					<Text style={styles.price}>Rs {item.price}</Text>
					<Text style={styles.oldPrice}>Rs {item.oldPrice}</Text>
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
						paddingVertical: 10,
					}}>
					<TouchableOpacity
					// onPress={() => heartToggle(!heartChecked)}
					>
						<Icon
							name="heart"
							style={[
								styles.loveIcon,
								// heartChecked && {
								// 	color: '#ff0000',
								// },
							]}
							// solid={heartChecked}
						/>
					</TouchableOpacity>
					<Icon name="cart-plus" style={styles.cartPlusIcon} solid />
				</View>
			</View>
		</View>
	);
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
		marginTop: 10,
	},
	flatListContainer: {
		paddingVertical: 15,
	},
	image: {
		height: 100,
		width: 100,
	},
	price: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
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
	},
	cartPlusIcon: {
		fontSize: 20,
	},
});
