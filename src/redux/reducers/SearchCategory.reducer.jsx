const initialState = 'Categories';

const SearchCateogry = (state = initialState, action) => {
	switch (action.type) {
		case 'SEARCH_CATEGORY':
			return action.payload;
		default:
			return state;
	}
};

export default SearchCateogry;
