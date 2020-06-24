import React, { useState } from 'react';
import {
	View,
	Text,
	ViewPropTypes as RNViewPropTypes,
	Modal,
	StyleSheet,
	TouchableOpacity,
	ViewPropTypes,
} from 'react-native';
import { Fonts, Colors } from '../constants';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function Address({ data, containerStyle }) {
	const [show, setShow] = useState(false);
	const location = useSelector((state) => state.location);
	const profile = useSelector((state) => state.profile);

	return (
		<View
			style={[
				{
					alignSelf: 'flex-start',
					marginVertical: 10,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					backgroundColor: Colors.white,
					borderRadius: 8,
				},
				containerStyle,
			]}>
			<View>
				<Text
					style={{
						fontSize: 16,
						fontFamily: Fonts.primary,
					}}>
					{data.first_name} {data.last_name}
				</Text>
				<Text
					style={{
						fontSize: 16,
						fontFamily: Fonts.primary,
					}}>
					{data.address_1}
				</Text>
				<Text
					style={{
						fontSize: 16,
						fontFamily: Fonts.primary,
					}}>
					{data.address_2}
				</Text>
				<Text
					style={{
						fontSize: 16,
						fontFamily: Fonts.primary,
					}}>
					{data.city} {'-'} {data.postcode} {data.state}
				</Text>
			</View>
		</View>
	);
}

// const ViewPropTypes = RNViewPropTypes || View.propTypes;

Address.propTypes = {
	data: PropTypes.array.isRequired,
	containerStyle: ViewPropTypes.style,
};
