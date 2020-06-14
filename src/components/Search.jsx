import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts, Colors } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../redux/Actions';

const borderProps = {
	borderWidth: 1,
	borderColor: 'black',
};
export default function Search({ setSearchValue }) {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [searchText, setSearchText] = useState('');
	setSearchValue &&
		useEffect(() => {
			setSearchValue(searchText);
		}, [searchText, setSearchValue]);
	const [title, setTitle] = useState(
		useSelector((state) => state.searchCategory)
	);

	const setSearchResult = (item) => {
		setTitle(item);
		dispatch({ type: Actions.SEARCH_CATEGORY, payload: item });
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.categoriesContainer}
				onPress={() =>
					navigation.navigate('CategoriesModal', {
						selected: searchText,
						setSearchText: setSearchResult.bind(this),
					})
				}>
				<View style={styles.categoriesTextContainer}>
					<Text
						style={styles.categoriesText}
						numberOfLines={1}
						adjustsFontSizeToFit={true}>
						{title.name}
					</Text>
				</View>
			</TouchableOpacity>
			<View style={styles.searchBarMainContainer}>
				<SearchBar
					lightTheme
					onFocus={() => navigation.navigate('SearchList')}
					value={searchText}
					onChangeText={(text) => setSearchText(text)}
					containerStyle={styles.searchBarContainer}
					inputContainerStyle={styles.searchInputContainer}
					inputStyle={styles.searchInput}
					placeholder="Search for Products, Brands and more"
					multiline={false}
					numberOfLines={1}
				/>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		width: wp(100),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	categoriesContainer: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	categoriesTextContainer: {
		flex: 1,
		minWidth: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		backgroundColor: Colors.black,
		borderRadius: 10,
	},
	categoriesText: {
		fontSize: 14,
		fontFamily: Fonts.semiBold,
		color: Colors.white,
		textAlign: 'center',
	},
	searchBarMainContainer: {
		flex: 7,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBarContainer: {
		width: '100%',
		backgroundColor: Colors.white,
		borderTopWidth: 0,
		borderBottomWidth: 0,
		paddingHorizontal: 4,
		padding: 0,
	},
	searchInputContainer: {
		backgroundColor: '#f1f0f5',
		margin: 0,
		height: 40,
		borderRadius: 10,
	},
	searchInput: {
		fontSize: 12,
		height: 20,
		color: Colors.black,
	},
});
