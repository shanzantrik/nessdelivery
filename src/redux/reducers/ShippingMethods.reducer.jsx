import Actions from '../Actions';
const initialState = null;

const Shipping = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SHIPPING_METHODS:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Shipping;
