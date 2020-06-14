import { combineReducers } from 'redux';

import products from './Products.reducer';
import categories from './Categories.reducer';
import cart from './Cart.reducer';
import wishlist from './Wishlist.reducer';
import searchCategory from './SearchCategory.reducer';
import carousel from './Carousel.reducer';
import subCategories from './SubCategories.reducer';
import payments from './Payments.reducer';

const rootReducer = combineReducers({
	categories,
	products,
	cart,
	wishlist,
	searchCategory,
	carousel,
	subCategories,
	payments,
});

export default rootReducer;
