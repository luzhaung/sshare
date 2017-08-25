/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午9:53
 */

import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducer/index';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, createLogger())(createStore);

export default function configureStore(initialState) {

    const store = createStoreWithMiddleware(reducers, initialState);

    return store;

}