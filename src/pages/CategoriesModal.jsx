import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Fonts } from '../constants';
import { CircularCategoriesData, VegProducts } from '../static';

export default function SubCategories({ navigation, route }) {
	const { selected, setSearchText } = route.params;
	const borderProps = {
		borderWidth: 2,
		borderColor: 'black',
	};
	const _renderItem = ({ index, item }) => {
		const [selectedItem] = useState(selected);

		const setValueAndDismiss = () => {
			setSearchText(item.title);
			navigation.goBack();
		};

		return (
			<TouchableOpacity onPress={() => setValueAndDismiss()}>
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
						}}>
						<Icon
							name="check"
							color={
								selectedItem === item.title
									? 'green'
									: Colors.transparent
							}
						/>
					</View>
				</View>
			</TouchableOpacity>
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
				renderItem={(object) => <_renderItem {...object} />}
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
	},
});
