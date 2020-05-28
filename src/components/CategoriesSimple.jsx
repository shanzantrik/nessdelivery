import React from 'react';
import {
	View,
	ScrollView,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { Header, CircularCategories } from './index';
import PropTypes from 'prop-types';

export default function CategoriesSimple({ data, title, containerStyle }) {
	const _renderCircularItem = ({ item, index }) => {
		return (
			<TouchableOpacity>
				<View
					style={{
						borderColor: '#f953c6',
						borderWidth: 2,
						borderRadius: 10,
						margin: 4,
					}}>
					<Text
						style={{
							width: '100%',
							color: '#b91d73',
							borderRadius: 10,
							margin: 1,
							padding: 5,
							paddingHorizontal: 8,
						}}>
						{item.title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const _keyExtractor = ({ item, index }) => index;
	return (
		<ScrollView
			contentContainerStyle={[{ width: wp(100) }, containerStyle]}
			horizontal>
			<View>
				<FlatList
					style={styles.container}
					data={data}
					renderItem={_renderCircularItem}
					keyExtractor={_keyExtractor}
					showsHorizontalScrollIndicator={false}
					numColumns={data.length / 2}
				/>
			</View>
		</ScrollView>
	);
}

CategoriesSimple.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 8,
	},
	circularContainerStyle: {
		height: wp(30),
		width: wp(20),
	},
	circularImageStyle: {
		borderRadius: wp(20) / 2,
	},
});
