/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午9:53
 */

import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducer/index';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
/*let enhancer = compose(
    applyMiddleware(thunkMiddleware, createLogger()),
);
const store = createStore(reducers, enhancer);
console.log(store);
export default store;*/

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, createLogger())(createStore);

export default function configureStore(initialState) {

    const store = createStoreWithMiddleware(reducers, initialState);

    return store;

}