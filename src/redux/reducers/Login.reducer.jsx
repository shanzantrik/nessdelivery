import Actions from '../Actions';
const initialState = null;

const Login = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOGIN:
			return (state = action.payload);
		case Actions.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default Login;
