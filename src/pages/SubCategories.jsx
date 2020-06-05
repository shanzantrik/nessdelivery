import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	Platform,
	UIManager,
	Easing,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import { CircularCategoriesData, VegProducts } from '../static';
import Animated, { concat } from 'react-native-reanimated';

export default function SubCategories({ navigation, route }) {
	useEffect(() => {
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	});
	const { data } = route.params;
	const borderProps = {
		borderWidth: 2,
		borderColor: 'black',
	};
	const _renderItem = ({ index, item, selected }) => {
		const [isExpanded, toggleExpanded] = useState(
			selected === 'None' ? false : selected === item.title
		);

		const showSubCategories = () => {
			toggleExpanded(!isExpanded);
		};

		const _renderSubCategories = ({ index, item }) => {
			return (
				<TouchableWithoutFeedback
					onPress={() =>
						navigation.navigate('ProductList', {
							data: VegProducts,
						})
					}>
					<View
						style={{
							width: wp(50) - 20,
							flexDirection: 'row',
							height: 100,
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
							<Image
								source={item.image}
								style={{
									height: '70%',
									aspectRatio: 1,
								}}
							/>
						</View>
						<View
							style={{
								marginTop: 30,
								width: 0,
								flexGrow: 1,
								flex: 1,
							}}>
							<Text
								adjustsFontSizeToFit={true}
								numberOfLines={2}
								lineBreakMode="middle">
								{item.title}
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			);
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
							<Image
								source={item.image}
								style={{ width: 20, height: 20 }}
							/>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>{item.title}</Text>
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
							data={item.subCategories}
							renderItem={_renderSubCategories}
							keyExtractor={({ index, item }) => index + item}
							listKey={(item, index) => 'D' + index.toString()}
							numColumns={2}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	};
	return (
		<View style={styles.container}>
			<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
				<Text style={{ fontSize: 18, fontFamily: Fonts.bold }}>
					Choose a Category
				</Text>
			</View>
			<FlatList
				data={CircularCategoriesData}
				renderItem={(object) => (
					<_renderItem {...object} selected={data} />
				)}
				keyExtractor={({ index, item }) => index + item}
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
