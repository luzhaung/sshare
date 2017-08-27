/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午9:53
 */
import { combineReducers } from 'redux';
import createReducer from './create';
import loginReducer from './login';

export default combineReducers({
    createModalStore: createReducer,
    loginModalStore: loginReducer,
});