import Actions from '../Actions';
const initialState = null;

const FeaturedVeg = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_VEG:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedVeg;
