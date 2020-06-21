import { combineReducers } from 'redux';

import products from './Products.reducer';
import categories from './Categories.reducer';
import cart from './Cart.reducer';
import wishlist from './Wishlist.reducer';
import searchCategory from './SearchCategory.reducer';
import carousel from './Carousel.reducer';
import subCategories from './SubCategories.reducer';
import payments from './Payments.reducer';
import location from './Location.reducer';
import login from './Login.reducer';
import profile from './Profile.reducer';
import shipping from './Shipping.reducer';
import coupons from './Coupons.reducer';
import subCategoriesData from './SubCategoriesData.reducer';
import featuredVeg from './FeaturedVeg.reducer';
import featuredNonVeg from './FeaturedNonVeg.reducer';

const rootReducer = combineReducers({
	categories,
	products,
	cart,
	wishlist,
	searchCategory,
	carousel,
	subCategories,
	subCategoriesData,
	payments,
	location,
	login,
	profile,
	shipping,
	coupons,
	featuredVeg,
	featuredNonVeg,
});

export default rootReducer;
