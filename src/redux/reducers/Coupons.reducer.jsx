import Actions from '../Actions';
const initialState = null;

const Coupons = (state = initialState, action) => {
	switch (action.type) {
		case Actions.COUPONS:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Coupons;
