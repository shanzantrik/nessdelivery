import Actions from '../Actions';
const initialState = null;

const Payments = (state = initialState, action) => {
	switch (action.type) {
		case Actions.PAYMENTS:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Payments;
