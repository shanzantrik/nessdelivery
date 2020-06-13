import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Colors } from '../constants';
import Search from './Search';
import { Badge } from 'react-native-elements';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

export default function HomepageToolbar({ navigation, searchBar }) {
	const cartData = useSelector((state) => state.cart);
	const [cart, setCart] = useState(cartData);
	useEffect(() => {
		setCart(cartData);
	}, [cartData]);
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.flexRow}>
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<View style={styles.drawerContainer}>
							<Icon name="bars" style={styles.drawer} />
						</View>
					</TouchableOpacity>
					<View style={styles.flexRow}>
						<FastImage
							source={require('../assets/logos/logo.png')}
							style={styles.logo}
						/>
					</View>
				</View>
				<View
					style={[
						styles.flexRow,
						{ height: '100%', alignItems: 'center' },
					]}>
					<TouchableOpacity>
						<Icon name="bell" style={styles.search} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('Cart')}>
						<Icon name="shopping-cart" style={styles.search} />
						{cart.addedItems !== null &&
							cart.addedItems.length !== 0 && (
								<Badge
									containerStyle={{
										position: 'absolute',
										right: 0,
										top: -8,
									}}
									badgeStyle={{
										backgroundColor: Colors.redPrimary,
									}}
									value={cart.addedItems.length}
								/>
							)}
					</TouchableOpacity>
				</View>
			</View>
			<View style={searchBar === false && { display: 'none' }}>
				<Search />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		marginTop: Platform.OS === 'ios' ? 30 : 0,
		backgroundColor: Colors.white,
	},
	drawerContainer: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
	},
	drawer: {
		marginEnd: 30,
		fontSize: 22,
		fontFamily: Fonts.semiBold,
	},
	flexRow: {
		flexDirection: 'row',
	},
	location: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		marginEnd: 10,
	},
	marker: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		color: '#f84a3f',
	},
	search: {
		marginStart: 20,
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		color: Colors.black,
		marginEnd: 10,
	},
	logo: {
		width: 100,
		aspectRatio: 5000 / 1995,
		marginVertical: 8,
	},
});
