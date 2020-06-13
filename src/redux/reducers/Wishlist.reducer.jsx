const initialState = null;

const Wishlist = (state = initialState, action) => {
	switch (action.type) {
		case 'WISHLIST':
			return (state = action.payload);
		default:
			return state;
	}
};

export default Wishlist;
