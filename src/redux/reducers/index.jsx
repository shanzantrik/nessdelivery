import { combineReducers } from 'redux';

import products from './Products.reducer';
import categories from './Categories.reducer';

const rootReducer = combineReducers({
	categories,
	products,
});

export default rootReducer;
