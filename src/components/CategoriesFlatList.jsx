import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Header, CategoryItem } from './index';
import PropTypes from 'prop-types';
import { Shadow } from '../constants';

export default function CategoriesFlatList({ data, title, containerStyle }) {
	const _renderCircularItem = ({ item, index }) => {
		return (
			<CategoryItem
				key={item.title + index}
				title={item.title}
				image={item.image}
				price={item.price}
				oldPrice={item.oldPrice}
				discount={item.discount}
				containerStyle={styles.circularContainerStyle}
				backgroundColor={item.backgroundColor}
				imageContainerStyle={styles.circularImageStyle}
			/>
		);
	};
	const _keyExtractor = (item, index) => index.toString();
	return (
		<View style={[{ width: wp(100) }, containerStyle]}>
			<Header title={title} />
			<FlatList
				style={styles.container}
				data={data}
				renderItem={_renderCircularItem}
				keyExtractor={_keyExtractor}
				showsHorizontalScrollIndicator={false}
				horizontal
			/>
		</View>
	);
}

CategoriesFlatList.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8,
	},
	circularContainerStyle: {
		height: wp(55),
		width: wp(35),
	},
	circularImageStyle: {
		borderRadius: wp(20) / 2,
	},
});
