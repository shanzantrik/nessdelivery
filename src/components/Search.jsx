import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Picker,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CategoryArray } from '../static';

export default function Search() {
	let data = ['Banana', 'Mango', 'Pear'];
	const [selectedCategory, setSelectedCategory] = useState(
		'Shop from category'
	);
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<View
					style={{
						flex: 1,
						paddingHorizontal: 8,
						alignItems: 'center',
						justifyContent: 'center',
						borderColor: 'black',
						borderWidth: 1,
						borderRadius: 8,
						marginEnd: 8,
						marginVertical: 8,
					}}>
					<Picker
						style={{ width: 100 }}
						selectedValue={selectedCategory}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedCategory(itemValue)
						}
						mode={'dropdown'}>
						<Picker.Item
							label={'Shop from category'}
							value={'Shop from category'}
						/>
						{CategoryArray.map((item) => {
							return <Picker.Item label={item} value={item} />;
						})}
					</Picker>
				</View>
			</TouchableOpacity>
			<View
				style={{
					flex: 2,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<TextInput
					style={{
						borderColor: 'gray',
						borderWidth: 1,
						borderRadius: 8,
						paddingLeft: 30,
						fontSize: 12,
					}}
					placeholder={'Search for products, brands and more'}
				/>
				<View style={styles.searchIconContainer}>
					<Icon name="search" style={styles.searchIcon} />
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 16,
	},
	searchIconContainer: {
		position: 'absolute',
		left: 10,
		top: 0,
		height: '80%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchIcon: {
		fontSize: 14,
		textAlign: 'center',
	},
});
