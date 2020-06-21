import React from 'react';
import {
	View,
	FlatList,
	FlatListProps,
	ViewStyle,
	StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Header, CategoryItem } from './index';
import PropTypes from 'prop-types';
import { Shadow } from '../constants';

export default function CategoriesFlatList({
	data,
	title,
	containerStyle,
	viewAll,
	flatListProps,
	itemContainerStyle,
	contentContainerStyle,
	itemParentContainerStyle,
	navigateTo,
}) {
	const _renderCircularItem = ({ item, index }) => {
		return (
			<CategoryItem
				key={item.name + index}
				item={item}
				containerStyle={[
					styles.circularContainerStyle,
					itemContainerStyle,
				]}
				backgroundColor={item.backgroundColor}
				imageContainerStyle={styles.circularImageStyle}
				parentContainerStyle={itemParentContainerStyle}
				navigateTo={navigateTo}
			/>
		);
	};
	const _keyExtractor = (item, index) => index.toString();
	return (
		<View style={[{ width: wp(100) }, containerStyle]}>
			<Header title={title} viewAll={viewAll} />
			<FlatList
				style={styles.container}
				contentContainerStyle={contentContainerStyle}
				data={data}
				renderItem={_renderCircularItem}
				keyExtractor={_keyExtractor}
				showsHorizontalScrollIndicator={false}
				horizontal
				{...flatListProps}
			/>
		</View>
	);
}

CategoriesFlatList.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	containerStyle: PropTypes.object,
	itemParentContainerStyle: PropTypes.instanceOf(ViewStyle),
};

CategoriesFlatList.defaultProps = {
	viewAll: true,
	flatListProps: FlatListProps,
	itemContainerStyle: ViewStyle,
	contentContainerStyle: ViewStyle,
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
