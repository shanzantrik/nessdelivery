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
		discount: 'Rs 1 off',
	},
	{
		weight: 5,
		unit: 'Kg',
		price: 268,
		oldPrice: 270,
		discount: 'Rs 2 off',
	},
	{
		weight: 10,
		unit: 'Kg',
		price: 412,
		oldPrice: 490,
		discount: '2% off',
	},
];

export default function PackSizes({ data }) {
	const compare = (a, b) => {
		let comparison = 0;
		if (a.weight > b.weight) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison * -1; // Multiplying it with -1 reverses the sorting order
	};

	const RenderPack = ({ index, item }) => {
		const [current, setCurrent] = useState(packs[0].weight);
		const [selected, setSelected] = useState(current === item.weight);
		return (
			<TouchableOpacity onPress={() => setCurrent(item.weight)}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderColor: selected ? '#69c1d3' : 'black',
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
							{item.weight} {item.unit}
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.semiBold,
							}}>
							Pouch
						</Text>
					</View>
					<View>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.bold,
							}}>
							Rs {item.price}
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.semiBold,
								color: '#ff0000',
								textDecorationLine: 'line-through',
							}}>
							MRP: Rs {item.oldPrice}
						</Text>
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
						{selected ? (
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
						<Text
							style={{
								fontSize: 10,
								fontFamily: Fonts.semiBold,
								marginHorizontal: 10,
								color: Colors.white,
							}}>
							{item.discount}
						</Text>
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
				data={packs.sort(compare)}
				renderItem={(object) => <RenderPack {...object} />}
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
