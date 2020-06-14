import Actions from '../Actions';
const initialState = 'Categories';

const SearchCateogry = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SEARCH_CATEGORY:
			return action.payload;
		default:
			return state;
	}
};

export default SearchCateogry;
