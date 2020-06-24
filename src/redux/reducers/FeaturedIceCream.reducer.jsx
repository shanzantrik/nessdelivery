import Actions from '../Actions';
const initialState = null;

const FeaturedIceCream = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FEATURED_ICE_CREAM:
			return (state = action.payload);
		default:
			return state;
	}
};

export default FeaturedIceCream;
