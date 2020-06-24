import Actions from '../Actions';
const initialState = null;

const FeaturedMithun = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_MITHUN:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedMithun;
