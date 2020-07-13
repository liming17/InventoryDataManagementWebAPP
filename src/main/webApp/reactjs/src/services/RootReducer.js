import {combineReducers} from 'redux';
import OrderReducer from './order/OrderReducer';

const rootReducer = combineReducers({
    getProduct: OrderReducer
});

export default rootReducer;