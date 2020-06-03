import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Easing,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Shadow } from '../constants';
import { Search } from '../components';
// import { ProductItem } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-community/picker';
import Animated from 'react-native-reanimated';
const borderProps = {
	borderWidth: 2,
	borderColor: 'black',
};

export default function ProductList({ navigation, route }) {
	const { data } = route.params;

	const ProductItem = ({ item, index }) => {
		const [heartChecked, heartToggle] = useState(false);
		const [btnEnabled, btnToggle] = useState(false);
		const [count, setCount] = useState(0);
		const countTimer = new Animated.Value(10);
		const [selectedQuantity, setSelectedQuantity] = useState(1000);

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
							style={{ flex: 1 }}
							onPress={() => {
								if (count === 1) {
									btnToggle(!btnEnabled);
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
							style={{ flex: 1 }}
							onPress={() => setCount(count + 1)}>
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
						}}>
						<View style={styles.addBtnContainer}>
							<Text style={styles.addBtnText}>Add</Text>
						</View>
					</TouchableOpacity>
				);
			}
		};
		return (
			<View style={styles.cardContainer}>
				<View style={{ width: '30%', margin: 5 }}>
					<Image source={item.image} style={styles.image} />
				</View>
				<View
					style={{
						width: '70%',
					}}>
					<Text style={styles.brand}>{item.brand}</Text>
					<Text style={styles.title}>{item.title}</Text>
					<View style={styles.rating}>
						<View style={styles.ratingContainer}>
							<Text style={styles.ratingText}>4.3</Text>
							<Icon name="star" solid style={styles.ratingStar} />
						</View>
						<View style={styles.ratingCountContainer}>
							<Text style={styles.ratingCount}>7782 Rating</Text>
						</View>
					</View>
					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={selectedQuantity}
							onValueChange={(value) =>
								setSelectedQuantity(value)
							}
							mode="dropdown"
							style={styles.picker}
							itemStyle={styles.pickerItem}>
							<Picker.Item label={'1 KG'} value={1000} />
							<Picker.Item label={'500 GM'} value={500} />
							<Picker.Item label={'250 GM'} value={250} />
						</Picker>
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

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginHorizontal: 20,
					paddingVertical: 10,
				}}>
				<View>
					<Icon name="filter" style={styles.filterIcon} />
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Icon name="list-ul" style={styles.listIcon} />
					<Icon name="th-large" style={styles.gridIcon} />
				</View>
			</View>
			<FlatList
				data={data}
				renderItem={(object) => <ProductItem {...object} />}
				contentContainerStyle={styles.flatListContainer}
				ItemSeparatorComponent={(leadingItem, section) => (
					<View
						style={{
							width: '100%',
							height: 1,
							backgroundColor: 'gray',
						}}
					/>
				)}
			/>
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
	},
	brand: {
		color: '#8d8d8d',
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		textTransform: 'uppercase',
	},
	flatListContainer: {
		paddingVertical: 15,
	},
	image: {
		height: 100,
		width: 100,
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
		color: '#689f39',
	},
	ratingStar: {
		fontSize: 10,
		fontFamily: Fonts.semiBold,
		color: '#689f39',
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
		fontSize: 20,
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
