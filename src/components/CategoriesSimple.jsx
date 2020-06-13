import React, { useRef, useState } from 'react';
import {
	View,
	ScrollView,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../redux/Actions';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import API from '../API';

export default function CategoriesSimple({
	data,
	title,
	containerStyle,
	navigation,
}) {
	const scrollViewRef = useRef(null);
	const RenderCircularItem = ({ item, index, length }) => {
		return (
			<TouchableOpacity
				style={{
					height: '100%',
					width: wp(33) - 4,
				}}
				onPress={() => {
					navigation.navigate('SubCategories', {
						itemId: item.id,
					});
				}}>
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
							textTransform: 'capitalize',
							textAlign: 'center',
						}}
						adjustsFontSizeToFit={true}
						numberOfLines={1}>
						{item.name.replace('and', '&')}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const _keyExtractor = (item, index) => index.toString();
	return (
		<View style={[{ width: wp(100) }, containerStyle]}>
			<TouchableOpacity
				style={{ position: 'absolute', top: -35 }}
				onPress={() =>
					scrollViewRef.current.scrollToEnd({
						animated: true,
					})
				}>
				<View
					style={{
						width: wp(100),
						padding: 10,
						flexDirection: 'row',
						justifyContent: 'flex-end',
						marginHorizontal: -10,
					}}>
					<Icon name="chevron-right" style={{ fontSize: 16 }} />
					<Icon name="chevron-right" style={{ fontSize: 16 }} />
				</View>
			</TouchableOpacity>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				ref={scrollViewRef}>
				<FlatList
					style={styles.container}
					data={data}
					renderItem={(object) => (
						<RenderCircularItem {...object} length={data.length} />
					)}
					keyExtractor={_keyExtractor}
					showsHorizontalScrollIndicator={false}
					numColumns={
						data.length <= 3
							? data.length
							: data.length % 2 === 0
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
