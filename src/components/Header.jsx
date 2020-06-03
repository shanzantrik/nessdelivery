import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../constants';

export default function Header({ title, onPress }) {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.titleStyle}>{title}</Text>
			</View>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.viewAllContainerStyle}>
					<Text style={styles.viewAllStyle}>View All</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	titleStyle: {
		fontSize: 16,
		color: 'black',
		fontFamily: Fonts.bold,
		textTransform: 'uppercase',
	},
	viewAllContainerStyle: {
		textAlign: 'center',
		backgroundColor: '#f6f6f6',
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	viewAllStyle: {
		color: 'black',
		fontSize: 12,
		margin: 2,
		fontFamily: Fonts.semiBold,
	},
});
