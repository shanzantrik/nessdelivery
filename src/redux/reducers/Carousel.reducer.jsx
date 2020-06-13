const initialState = null;

const Carousel = (state = initialState, action) => {
	switch (action.type) {
		case 'CAROUSEL':
			return (state = action.payload);
		default:
			return state;
	}
};

export default Carousel;
