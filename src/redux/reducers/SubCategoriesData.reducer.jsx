import Actions from '../Actions';
const initialState = null;

const SubCategoriesData = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SUB_CATEGORIES_DATA:
			return (state = action.payload);
		default:
			return state;
	}
};

export default SubCategoriesData;
