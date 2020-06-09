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
import PropTypes from 'prop-types';
import { Colors } from '../constants';

export default function CategoriesSimple({
	data,
	title,
	containerStyle,
	navigation,
}) {
	const RenderCircularItem = ({ item, index, length }) => {
		return (
			<TouchableOpacity
				style={{
					height: '100%',
					width: wp(25) - (length > 8 ? 3 : 4),
				}}
				onPress={() =>
					navigation.navigate('SubCategories', {
						data: item.title,
					})
				}>
				<View
					style={{
						height: 40,
						borderColor: '#ff0000',
						borderWidth: 2,
						borderRadius: 10,
						margin: 4,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text
						style={{
							color: Colors.black,
							paddingHorizontal: 2,
						}}
						adjustsFontSizeToFit={true}
						numberOfLines={1}>
						{item.title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const _keyExtractor = (item, index) => index.toString();
	return (
		<View style={[{ width: wp(100) }, containerStyle]}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<FlatList
					style={styles.container}
					data={data}
					renderItem={(object) => (
						<RenderCircularItem {...object} length={data.length} />
					)}
					keyExtractor={_keyExtractor}
					showsHorizontalScrollIndicator={false}
					numColumns={
						data.length % 2 === 0
							? data.length / 2
							: (data.length + 1) / 2
					}
				/>
			</ScrollView>
		</View>
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
