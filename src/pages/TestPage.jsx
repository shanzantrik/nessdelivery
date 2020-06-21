import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import API from '../API';
import { Colors } from '../constants';

export default function TestPage({ navigation }) {
	const getProductList = () => {
		API.get('products', {
			category: 41,
		})
			.then((res) => {
				// console.timeLog('productsList', res);
				// console.timeEnd('productsList');
				console.log(res);
				alert(res);
				// alert(res.data.length);
				// navigation.navigate('ProductList', {
				// 	listData: res.data,
				// 	parent: id,
				// });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<TouchableOpacity onPress={getProductList}>
			<View
				style={{
					padding: 10,
					borderColor: Colors.gradientPrimary,
					borderWidth: 1,
					borderRadius: 8,
				}}>
				<Text>Hello</Text>
			</View>
		</TouchableOpacity>
	);
}
