// Dependencias
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import pruebaReducer from '../Reducers/pruebaReducer';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    state: pruebaReducer,
  }),
  composeEnhancer(applyMiddleware(thunk))
)

export default store; 








