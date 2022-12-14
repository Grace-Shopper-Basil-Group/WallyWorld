import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleProductReducer from './product';
import productsReducer from './allProducts';
import cartReducer from './cart';
import usersReducer from './users';

const reducer = combineReducers({
  auth: auth,
  product: singleProductReducer,
  cart: cartReducer,
  allProducts: productsReducer,
  users: usersReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
