import React from 'react';
import {
	View,
	FlatList,
	FlatListProps,
	ViewStyle,
	StyleSheet,
	ViewPropTypes,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Header, CategoryItem } from './index';
import PropTypes from 'prop-types';
import { Shadow } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux/lib/hooks/useSelector';

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
	ListFooterComponent,
}) {
	const navigation = useNavigation();
	const profile = useSelector((state) => state.profile);
	const RenderCircularItem = React.memo(
		({ item, index }) => {
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
					navigation={navigation}
					profile={profile}
				/>
			);
		},
		(prevProps, nextProps) => false
	);
	const _keyExtractor = (item, index) => item.id.toString();
	return (
		<View style={[{ width: wp(100) }, containerStyle]}>
			<Header title={title} viewAll={viewAll} />
			<FlatList
				style={styles.container}
				contentContainerStyle={contentContainerStyle}
				data={data}
				renderItem={(object) => <RenderCircularItem {...object} />}
				keyExtractor={_keyExtractor}
				showsHorizontalScrollIndicator={false}
				initialNumToRender={10}
				removeClippedSubviews={true}
				maxToRenderPerBatch={10}
				horizontal
				ListFooterComponent={ListFooterComponent}
				{...flatListProps}
			/>
		</View>
	);
}

CategoriesFlatList.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	containerStyle: ViewPropTypes.style,
	itemParentContainerStyle: ViewPropTypes.style,
};

CategoriesFlatList.defaultProps = {
	viewAll: true,
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
