import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : false
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		devtools
	)

);

export default store;
