import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Colors } from '../constants';

export default function HomepageToolbar(props) {
	const { navigation } = props;
	return (
		<View style={styles.container}>
			<View style={styles.flexRow}>
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<View style={styles.drawerContainer}>
						<Icon name="bars" style={styles.drawer} />
					</View>
				</TouchableOpacity>
				<View style={styles.flexRow}>
					<Image
						source={require('../assets/logos/logo.png')}
						style={styles.logo}
					/>
				</View>
			</View>
			<View style={styles.flexRow}>
				<TouchableOpacity>
					<Icon name="bell" style={styles.search} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name="shopping-cart" style={styles.search} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
	},
	logo: {
		width: 100,
		aspectRatio: 5000 / 1995,
		marginVertical: 8,
	},
});
