import Actions from '../Actions';
const initialState = null;

const Location = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOCATION:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Location;
