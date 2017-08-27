/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午5:10
 */
import * as TYPES from '../actions/types';
const initialState = {
    showLoginModal: false,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.SHOW_LOGIN_MODAL:
            return {
                showLoginModal: true
            };
        default:
            return state;
    }
}