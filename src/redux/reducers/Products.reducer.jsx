import Actions from '../Actions';
const initialState = null;

const Products = (state = initialState, action) => {
	switch (action.type) {
		case Actions.PRODUCTS:
			return (state = action.payload);
		default:
			return state;
	}
};

export default Products;
