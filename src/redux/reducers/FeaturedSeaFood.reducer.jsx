import Actions from '../Actions';
const initialState = null;

const FeaturedSeaFood = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_SEA_FOOD:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedSeaFood;
