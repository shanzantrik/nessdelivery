import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import { AddToCart, Search, ProductItem } from '../components';
import API from '../API';
import Axios from 'axios';

export default function SearchList({ navigation, route }) {
	const [searchProducts, setSearchProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	var timer = useRef(null);
	var cancelToken = useRef(null);
	const currentPage = useRef(1);
	const searchText = useRef('');

	const setSearchValue = async (val) => {
		searchText.current = val;
		if (val !== undefined) {
			clearTimeout(timer.current);
			timer.current = setTimeout(async () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}

				cancelToken.current = Axios.CancelToken.source();
				currentPage.current = 1;
				setLoading(true);
				try {
					const res = await API.get('products', {
						per_page: 50,
						search: val,
					});

					if (res.status === 200) {
						setSearchProducts(res.data);
						currentPage.current = currentPage.current + 1;
					}
				} catch (error) {
					console.log(error);
				}
				setLoading(false);
			}, 800);
		}
	};

	return (
		<View style={styles.container}>
			<Search setSearchValue={setSearchValue} />
			{!loading ? (
				<FlatList
					data={searchProducts}
					renderItem={(object) => <ProductItem {...object} />}
					keyExtractor={(item, index) => item.id.toString()}
					contentContainerStyle={styles.flatListContainer}
					initialNumToRender={10}
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
			) : (
				<View style={StyleSheet.absoluteFill}>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<ActivityIndicator
							color={Colors.royalBlue}
							size="large"
						/>
						<Text
							style={{
								marginTop: 20,
								fontSize: 16,
								fontFamily: Fonts.semiBold,
								color: Colors.royalBlue,
							}}>
							Loading
						</Text>
					</View>
				</View>
			)}
			<View style={{ position: 'absolute', bottom: 0 }}>
				<AddToCart />
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
		paddingBottom: 70,
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
});
