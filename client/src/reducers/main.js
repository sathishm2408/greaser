import {combineReducers} from 'redux';
import users from './users';
import consumer from './consumer';
import products from './products';

const rootReducer = combineReducers( {
    users,
    products,
    consumer
  });

  export default rootReducer;