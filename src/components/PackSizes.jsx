import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const packs = [
	{
		weight: 1,
		unit: 'Kg',
		price: 56,
		oldPrice: 57,
		discount: '2% off',
	},
	{
		weight: 2,
		unit: 'Kg',
		price: 108,
		oldPrice: 109,
		discount: '₹ 1 off',
	},
	{
		weight: 5,
		unit: 'Kg',
		price: 268,
		oldPrice: 270,
		discount: '₹ 2 off',
	},
	{
		weight: 10,
		unit: 'Kg',
		price: 412,
		oldPrice: 490,
		discount: '2% off',
	},
];

export default function PackSizes({
	data,
	selected,
	setName,
	setPrice,
	setOldPrice,
	changeQuantity,
}) {
	const compare = (a, b) => {
		let comparison = 0;
		if (a.weight > b.weight) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison * -1; // Multiplying it with -1 reverses the sorting order
	};

	const [current, setCurrent] = useState(selected.id);

	const RenderPack = ({ index, item }) => {
		const [selectedItem] = useState(current === item.id);
		return (
			<TouchableOpacity
				onPress={() => {
					setCurrent(item.id);
					setName(item.sku);
					setPrice(
						item.on_sale ? item.sale_price : item.regular_price
					);
					setOldPrice(item.regular_price);
					changeQuantity(item);
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderColor: selected ? '#69c1d3' : Colors.black,
						borderWidth: 1,
						borderRadius: 7,
						padding: 20,
						marginVertical: 10,
					}}>
					<View>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.semiBold,
							}}>
							{item.attributes[0].option.replace('-', '.')}
						</Text>
					</View>
					<View>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.bold,
							}}>
							Rs{' '}
							{item.on_sale
								? item.sale_price
								: item.regular_price}
						</Text>
						{item.on_sale && (
							<Text
								style={{
									fontSize: 12,
									fontFamily: Fonts.semiBold,
									color: '#ff0000',
									textDecorationLine: 'line-through',
								}}>
								MRP: ₹ {item.regular_price}
							</Text>
						)}
					</View>
					<View
						style={{
							height: 24,
							width: 24,
							borderRadius: 12,
							borderColor: selected ? '#69c1d3' : '#000000',
							borderWidth: 2,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						{selectedItem ? (
							<View
								style={{
									width: 14,
									height: 14,
									borderRadius: 7,
									backgroundColor: '#69c1d3',
								}}
							/>
						) : null}
					</View>
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							backgroundColor: '#eb5c5e',
							borderTopStartRadius: 5,
							borderBottomEndRadius: 5,
							padding: 1,
						}}>
						{item.on_sale && (
							<Text
								style={{
									fontSize: 10,
									fontFamily: Fonts.semiBold,
									marginHorizontal: 10,
									color: Colors.white,
								}}>
								{item.regular_price - item.sale_price}
							</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 18,
					fontFamily: Fonts.semiBold,
					marginBottom: 10,
				}}>
				Pack Sizes
			</Text>
			<FlatList
				data={data}
				renderItem={(object) => <RenderPack {...object} />}
				keyExtractor={(index, item) => index.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 30,
		marginHorizontal: 20,
	},
});
