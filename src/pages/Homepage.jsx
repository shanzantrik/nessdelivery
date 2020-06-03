import React, { useState } from 'react';
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	Modal,
	TouchableOpacity,
} from 'react-native';
import {
	CategoriesFlatList,
	Carousel,
	CircularFlatList,
	Search,
	CategoriesSimple,
} from '../components';
import {
	VegProducts,
	NonVegProducts,
	CarouselData,
	CircularCategoriesData,
} from '../static';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const borderProps = {
	borderColor: 'black',
	borderWidth: 1,
};

export default function Homepage({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				{/* <Search
					onPress={() => navigation.navigate('CategoriesModal')}
				/> */}
				<View style={{ alignItems: 'center' }}>
					<View
						style={{
							width: wp(100),
							paddingHorizontal: 16,
							flexDirection: 'row',
							alignItems: 'center',
							paddingVertical: 8,
						}}>
						<Icon
							name="map-marker-alt"
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
								marginEnd: 10,
							}}
						/>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.bold,
							}}>
							Deliver To:
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.bold,
								}}>
								{' '}
								Location Here
							</Text>
						</Text>
					</View>
					<CategoriesSimple
						data={CircularCategoriesData}
						title={'Categories'}
						navigation={navigation}
					/>
					<Carousel data={CarouselData} />
					<CategoriesFlatList
						data={VegProducts}
						title={'Popular in Veg'}
						containerStyle={styles.flatListStyle}
					/>
					<CategoriesFlatList
						data={NonVegProducts}
						title={'Popular in Non-Veg'}
						containerStyle={styles.flatListStyle}
					/>
					<CategoriesFlatList
						data={NonVegProducts}
						title={'Trending Products'}
						containerStyle={styles.flatListStyle}
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
