import React from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Colors, Fonts, Shadow } from '../constants';

export default function CouponsPage({ navigation, route }) {
	var applyCoupon;
	if (route.params) {
		applyCoupon = route.params.applyCoupon;
	}
	const coupons = useSelector((state) => state.coupons);
	const RenderCoupons = ({ item, index }) => {
		return (
			<View style={styles.cardContainer}>
				<View
					style={{
						width: 25,
						height: 25,
						alignItems: 'center',
						justifyContent: 'center',
						borderColor: Colors.greenText,
						borderWidth: 1,
						borderRadius: 12,
						marginEnd: 10,
					}}>
					<Icon
						name="percent"
						style={{
							margin: 5,
							fontSize: 12,
							fontFamily: Fonts.semiBold,
							textAlign: 'center',
							color: Colors.greenText,
						}}
					/>
				</View>
				<View
					style={{
						flexGrow: 1,
						alignItems: 'flex-start',
						marginStart: 10,
					}}>
					<Text
						style={{
							fontSize: 14,
							fontFamily: Fonts.semiBold,
							color: Colors.greenText,
						}}>
						Code: {item.code}
					</Text>
					<View>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.semiBold,
								color: Colors.greenText,
							}}>
							Amount: {item.amount}
						</Text>
					</View>
				</View>
				{applyCoupon && (
					<TouchableOpacity
						onPress={() => {
							applyCoupon(item.code);
							navigation.goBack();
						}}
						style={{
							height: '80%',
							aspectRatio: 1,
							marginEnd: 10,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Icon
							name="check"
							style={{
								height: '80%',
								aspectRatio: 1,
								borderRadius: 25,
								borderColor: Colors.greenText,
								borderWidth: 1,
								textAlign: 'center',
								textAlignVertical: 'center',
								color: Colors.greenText,
							}}
						/>
					</TouchableOpacity>
				)}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.couponAvailableContainer}>
				<Text style={styles.couponAvailabelText}>
					Coupons Available
				</Text>
			</View>
			<FlatList
				data={coupons}
				renderItem={RenderCoupons}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
	},
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
		marginHorizontal: 20,
		backgroundColor: Colors.white,
		padding: 10,
		borderRadius: 8,
		...Shadow.light,
	},
	couponAvailableContainer: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
	couponAvailabelText: {
		fontSize: 18,
		fontFamily: Fonts.semiBold,
	},
});
