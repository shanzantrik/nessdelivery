const initialState = null;

const Products = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCTS':
			return (state = action.payload);
		default:
			return state;
	}
};

export default Products;
