import Actions from '../Actions';
const initialState = null;

const FeaturedCheeseAndCreams = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_CHEESE_AND_CREAMS:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedCheeseAndCreams;
