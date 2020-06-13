import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import rootReducer from '../reducers';

const storage = createSensitiveStorage({
	keychainService: 'nessFrozenKeychain',
	sharedPreferencesName: 'nessFrozenSharedPrefs',
});

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [],
};

const middlewares = [thunk];

if (__DEV__) {
	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(
	persistedReducer,
	applyMiddleware(...middlewares)
);
export let persistor = persistStore(store);
