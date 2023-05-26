import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';                                 //ye ak middleware ha r ye hame previous state aur next state or actionTypes console.log me dikhata ha 
import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(logger));                    //logger ke sath ham multi middleware apply kr sakte hain

export default store;