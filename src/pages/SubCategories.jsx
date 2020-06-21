import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	Platform,
	UIManager,
	ToastAndroid,
	ActivityIndicator,
	Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, URL } from '../constants';
import { useSelector } from 'react-redux';
import API from '../API';
import { encode as btoa } from 'base-64';
import { sausage } from '../static';

export default function SubCategories({ navigation, route }) {
	const { itemId } = route.params;
	const categories = useSelector((state) => state.categories);
	const subCategories = useSelector((state) => state.subCategories);
	const subCategoriesData = useSelector((state) => state.subCategoriesData);
	const [loading, setLoading] = useState(false);
	const borderProps = {
		borderWidth: 2,
		borderColor: 'black',
	};

	const getProductList = async (id) => {
		// setLoading(true);
		// console.time('subCatData');
		// const res = await API.get('products', {
		// 	category: id,
		// });
		// console.timeLog('subCatData', res);
		// console.log(subCategoriesData.find((sub) => sub.id === id).data);

		navigation.navigate('ProductList', {
			listData: subCategoriesData.find((sub) => sub.id === id).data,
			parent: id,
		});
	};

	const _renderSubCategories = React.memo(({ index, item }) => {
		return (
			<TouchableWithoutFeedback onPress={() => getProductList(item.id)}>
				<View
					style={{
						width: wp(50) - 20,
						flexDirection: 'row',
						height: 70,
						borderColor: 'gray',
						borderWidth: 1,
						borderRadius: 8,
						margin: 5,
						marginBottom: 20,
					}}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							marginHorizontal: 10,
						}}>
						<FastImage
							source={{ uri: item?.image?.src }}
							style={{
								height: '70%',
								aspectRatio: 1,
							}}
						/>
					</View>
					<View
						style={{
							width: 0,
							flexGrow: 1,
							flex: 1,
							justifyContent: 'center',
						}}>
						<Text
							style={{
								textAlign: 'left',
								textTransform: 'capitalize',
							}}
							adjustsFontSizeToFit={true}
							numberOfLines={2}>
							{item.name}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	});

	const _keyExtractor = (item, index) =>
		index.toString() + item.id.toString();

	const _listKey = (item, index) => 'D' + item.id.toString();

	const RenderItem = React.memo(({ index, item, selected }) => {
		const [isExpanded, toggleExpanded] = useState(
			selected === 'None' ? false : selected === item.id
		);

		const showSubCategories = () => {
			toggleExpanded(!isExpanded);
		};

		return (
			<TouchableWithoutFeedback onPress={() => showSubCategories()}>
				<View style={styles.container}>
					<View style={styles.cardContainer}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<FastImage
								source={{ uri: item?.image?.src }}
								style={{ width: 20, height: 20 }}
							/>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>{item.name}</Text>
							</View>
						</View>
						<View
							style={{
								width: 20,
								height: 20,
								alignItems: 'center',
								justifyContent: 'center',
								borderColor: 'black',
								borderWidth: 1,
							}}>
							<View
								style={{
									position: 'absolute',
									width: '80%',
									height: 2,
									backgroundColor: 'gray',
								}}
							/>
							<View
								style={[
									{
										position: 'absolute',
										width: 2,
										height: '80%',
										backgroundColor: 'gray',
									},
									isExpanded && {
										backgroundColor: Colors.transparent,
									},
								]}
							/>
						</View>
					</View>
					<View
						style={[
							styles.subCategories,
							!isExpanded && { height: 0 },
						]}>
						<FlatList
							data={subCategories
								.filter(
									(category) => category.parent === item.id
								)
								.sort(compare)}
							renderItem={(object) => (
								<_renderSubCategories
									{...object}
									key={
										object.index.toString() +
										object.item.name
									}
								/>
							)}
							// keyExtractor={_keyExtractor}
							listKey={(itemSub, indexSub) =>
								'D' + itemSub.id.toString()
							}
							numColumns={2}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	});

	const compare = (a, b) => {
		let comparison = 0;
		if (a.slug > b.slug) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison; // Multiplying it with -1 reverses the sorting order
	};

	return (
		<View style={styles.container}>
			<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
				<Text style={{ fontSize: 18, fontFamily: Fonts.bold }}>
					Choose a Category
				</Text>
			</View>
			<FlatList
				data={categories.filter(
					(category) => category.display === 'default'
				)}
				renderItem={(object) => (
					<RenderItem
						{...object}
						selected={itemId}
						key={object.index.toString() + object.item.slug}
					/>
				)}
				keyExtractor={(indexOrig, itemOrig) =>
					indexOrig.toString() + itemOrig.slug
				}
				contentContainerStyle={styles.flatListContainer}
				ItemSeparatorComponent={() => (
					<View
						style={{
							width: '95%',
							alignSelf: 'center',
							height: 1,
							backgroundColor: 'gray',
						}}
					/>
				)}
			/>
			<Modal
				style={StyleSheet.absoluteFill}
				animationType="fade"
				transparent
				visible={loading}>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#00000033',
					}}>
					<ActivityIndicator color={Colors.royalBlue} size="large" />
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
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cardContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	titleContainer: {
		backgroundColor: '#ffffff',
	},
	title: {
		textAlign: 'left',
		margin: 8,
		fontSize: 18,
		fontFamily: Fonts.semiBold,
	},
	flatListContainer: {
		paddingBottom: 30,
	},
	subCategories: {
		alignItems: 'center',
		height: '100%',
	},
});
