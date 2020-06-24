import Actions from '../Actions';
const initialState = null;

const FeaturedPork = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_PORK:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedPork;
