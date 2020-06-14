import Actions from '../Actions';
const initialState = null;

const SubCategories = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SUB_CATEGORIES:
			return (state = action.payload);
		default:
			return state;
	}
};

export default SubCategories;
