const initialState = null;

const SubCategories = (state = initialState, action) => {
	switch (action.type) {
		case 'SUB_CATEGORIES':
			return (state = action.payload);
		default:
			return state;
	}
};

export default SubCategories;
