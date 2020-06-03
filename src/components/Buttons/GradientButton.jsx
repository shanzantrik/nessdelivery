import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton({ navigation, colors }) {
	return (
		<LinearGradient
			colors={colors}
			start={{ x: 0.0, y: 1.0 }}
			end={{ x: 1.0, y: 1.0 }}
			style={{ borderRadius: 32, marginVertical: 50 }}>
			<TouchableOpacity
				style={styles.signInContainer}
				onPress={() => navigation.navigate('Signup')}>
				<View style={styles.signInView}>
					<Text style={[styles.signIn, { color: '#7F7FD5' }]}>
						Verify
					</Text>
				</View>
			</TouchableOpacity>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	signInContainer: {
		width: wp(60),
		margin: 2,
		borderRadius: 32,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	signInView: {
		padding: 20,
		paddingHorizontal: 30,
	},
	signIn: {
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		color: '#f953c6',
		textTransform: 'uppercase',
	},
});
