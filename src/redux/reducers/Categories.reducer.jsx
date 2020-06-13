const initialState = null;

const Categories = (state = initialState, action) => {
	switch (action.type) {
		case 'CATEGORIES':
			return (state = action.payload);
		default:
			return state;
	}
};

export default Categories;
