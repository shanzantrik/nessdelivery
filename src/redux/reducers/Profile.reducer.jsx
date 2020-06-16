import Actions from '../Actions';
const initialState = null;

const Profile = (state = initialState, action) => {
	switch (action.type) {
		case Actions.PROFILE:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Profile;
