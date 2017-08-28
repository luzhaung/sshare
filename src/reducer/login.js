/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午5:10
 */
import * as TYPES from '../actions/types';
import {isLogin} from '../util/Secret';
const initialState = {
    showLoginModal: !isLogin,
    isLogin: isLogin,
    isLogout: !isLogin,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.SHOW_LOGIN_MODAL:
            return {
                showLoginModal: true
            };
        case TYPES.IS_LOGIN:
            return {
                showLoginModal: false,
                isLogin: true
            };
        case TYPES.IS_LOGOUT:
            return {
                showLoginModal: true,
                isLogout: true,
            };
        default:
            return state;
    }
}