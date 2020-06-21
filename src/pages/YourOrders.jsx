import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import API from '../API';
import { Colors, Shadow, Fonts } from '../constants';

export default function YourOrders({ navigation }) {
	const user = useSelector((state) => state.login);
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		API.get('orders', {
			customer: user.user_id,
		})
			.then((result) => {
				setOrders(result.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, []);

	const RenderOrders = ({ item, index }) => {
		return (
			<View
				style={{
					alignItems: 'center',
				}}>
				<View
					style={{
						width: '90%',
						paddingHorizontal: 20,
						borderRadius: 10,
						backgroundColor: Colors.white,
						...Shadow.medium,
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingVertical: 20,
						}}>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
							}}>
							Order No. {item.id}
						</Text>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
							}}>
							Amount: {item.total}{' '}
						</Text>
					</View>
					<View style={{ paddingVertical: 20 }}>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
							}}>
							Items:{' '}
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.primary,
								}}>
								{item.line_items[0].name} and{' '}
								{item.line_items.length - 1} others
							</Text>
						</Text>
					</View>
				</View>
			</View>
		);
	};

	if (loading) {
		return (
			<View style={StyleSheet.absoluteFill}>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: Colors.white,
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
			</View>
		);
	} else {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: Colors.white,
				}}>
				<FlatList
					data={orders}
					renderItem={RenderOrders}
					contentContainerStyle={{
						paddingVertical: 30,
					}}
				/>
			</View>
		);
	}
}
