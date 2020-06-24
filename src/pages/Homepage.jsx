import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	RefreshControl,
	BackHandler,
	ToastAndroid,
} from 'react-native';
import { CategoriesFlatList, Carousel, CategoriesSimple } from '../components';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import API from '../API';
import Actions from '../redux/Actions';
import axios from 'axios';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};

export default function Homepage({ navigation, route }) {
	const dispatch = useDispatch();
	const locationData = useSelector((state) => state.location);
	const user = useSelector((state) => state.login);
	const [loading, setLoading] = useState(false);
	const [exitApp, setExitApp] = useState(0);
	const featuredNonVeg = useSelector((state) => state.featuredNonVeg);
	const featuredVeg = useSelector((state) => state.featuredVeg);
	const featuredPork = useSelector((state) => state.featuredPork);
	const featuredSeaFood = useSelector((state) => state.featuredSeaFood);
	const featuredIceCream = useSelector((state) => state.featuredIceCream);
	const featuredCheeseAndCreams = useSelector(
		(state) => state.featuredCheeseAndCreams
	);
	const featuredWonderEggs = useSelector((state) => state.featuredWonderEggs);
	const featuredMithun = useSelector((state) => state.featuredMithun);

	// useEffect(() => {
	// 	const backHandler = BackHandler.addEventListener(
	// 		'hardwareBackPress',
	// 		backAction
	// 	);
	// 	return () => backHandler.remove();
	// });

	// const backAction = () => {
	// 	setTimeout(() => {
	// 		setExitApp(0);
	// 	}, 2000); // 2 seconds to tap second-time

	// 	if (exitApp === 0) {
	// 		setExitApp(exitApp + 1);

	// 		ToastAndroid.show(
	// 			'Press back button 2 times to exit the app',
	// 			ToastAndroid.SHORT
	// 		);
	// 	} else if (exitApp === 1) {
	// 		BackHandler.exitApp();
	// 	}
	// 	return true;
	// };

	function RefreshData() {
		//Copy this from splashscreen or login
	}

	const compare = (a, b) => {
		let comparison = 0;
		if (a.id > b.id) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison; // Multiplying it with -1 reverses the sorting order
	};

	const compareReverse = (a, b) => {
		let comparison = 0;
		if (a.id > b.id) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison * -1; // Multiplying it with -1 reverses the sorting order
	};

	const categoriesData = useSelector((state) => state.categories);
	const simpleCategories = categoriesData.filter(
		(category) => category.display === 'default'
	);

	console.log(locationData);
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.container}
				// refreshControl={
				// 	<RefreshControl
				// 		enabled
				// 		refreshing={loading}
				// 		onRefresh={() => RefreshData()}
				// 		colors={[Colors.royalBlue]}
				// 	/>
				// }
				horizontal={false}>
				<View style={{ alignItems: 'center' }}>
					<View
						style={{
							width: wp(90),
							flexDirection: 'row',
							alignItems: 'center',
							paddingTop: 16,
							paddingBottom: 4,
						}}>
						<Icon
							name="map-marker-alt"
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
								marginEnd: 10,
							}}
						/>
						{locationData.locationAvailable ? (
							<Text
								style={{
									fontSize: 12,
									fontFamily: Fonts.bold,
								}}>
								Deliver To:
								<Text
									style={{
										fontSize: 12,
										fontFamily: Fonts.bold,
									}}>
									{' '}
									{locationData.location.address_1 +
										locationData.location.address_2 +
										locationData.location.city +
										locationData.location.state +
										'-' +
										locationData.location.postcode}
								</Text>
							</Text>
						) : (
							<Text
								style={{
									fontSize: 13,
									fontFamily: Fonts.bold,
								}}>
								{locationData.location.address_1 +
									', ' +
									locationData.location.address_2 +
									', ' +
									locationData.location.city +
									', ' +
									locationData.location.state +
									' - ' +
									locationData.location.postcode}
							</Text>
						)}
					</View>
					<CategoriesSimple
						data={simpleCategories}
						title={'Categories'}
						navigation={navigation}
					/>
					<Carousel />
					<CategoriesFlatList
						data={featuredVeg}
						title={'POPULAR IN VEG'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredNonVeg}
						title={'POPULAR IN CHICKEN'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredPork}
						title={'POPULAR IN PORK'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredSeaFood}
						title={'POPULAR IN SEA FOOD'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredIceCream}
						title={'POPULAR IN ICE CREAM'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredCheeseAndCreams}
						title={'POPULAR IN CHEESE AND CREAMS'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredWonderEggs}
						title={'POPULAR IN WONDER EGGS'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
					<CategoriesFlatList
						data={featuredMithun}
						title={'POPULAR IN MITHUN'}
						containerStyle={styles.flatListStyle}
						viewAll={false}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingBottom: 30,
	},
	carouselImage: {
		width: 300,
		height: 200,
	},
	flatListStyle: {
		marginVertical: 10,
	},
	mainCategoryContainer: {
		width: wp(90),
		alignItems: 'center',
		...borderProps,
	},
	mainCategory: {
		width: wp(90),
		resizeMode: 'contain',
	},
});
