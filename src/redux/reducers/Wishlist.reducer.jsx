import Actions from '../Actions';
const initialState = null;

const Wishlist = (state = initialState, action) => {
	switch (action.type) {
		case Actions.WISHLIST:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Wishlist;
