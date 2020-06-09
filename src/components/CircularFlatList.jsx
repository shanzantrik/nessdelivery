import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Header, CircularCategories } from './index';
import PropTypes from 'prop-types';

export default function CircularFlatList({ data, title, containerStyle }) {
	const _renderCircularItem = ({ item, index }) => {
		return (
			<CircularCategories
				key={item.title + index}
				title={item.title}
				image={item.image}
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

CircularFlatList.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
	container: {
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
