import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import { AddToCart, ProductItem } from '../components';
import { useSelector } from 'react-redux';

export default function ProductList({ navigation, route }) {
	let { listData, parent } = route.params;

	const subCategoriesData = useSelector((state) => state.subCategoriesData);

	const [data, setData] = useState(listData);

	useEffect(() => {
		setData(subCategoriesData.find((item) => item.id === parent).data);
	}, [subCategoriesData, parent]);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				initialNumToRender={10}
				renderItem={(object) => <ProductItem {...object} />}
				keyExtractor={(item, index) => item.id.toString()}
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
				// refreshControl={
				// 	<RefreshControl
				// 		enabled
				// 		refreshing={loading}
				// 		onRefresh={() => RefreshData(setLoading)}
				// 		colors={[Colors.royalBlue]}
				// 	/>
				// }
				horizontal={false}
			/>
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
