import Actions from '../Actions';
const initialState = null;

const FeaturedWonderEggs = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_WONDER_EGGS:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedWonderEggs;
