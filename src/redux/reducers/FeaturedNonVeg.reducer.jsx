import Actions from '../Actions';
const initialState = null;

const FeaturedNonVeg = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_NON_VEG:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedNonVeg;
