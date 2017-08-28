/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午5:15
 */
import * as TYPES from './types';

export function showLoginModal() {
    return (dispatch) => {
        dispatch({'type': TYPES.SHOW_LOGIN_MODAL});
    }
}

export function markLogin() {
    return (dispatch) => {
        dispatch({'type': TYPES.IS_LOGIN});
    }
}

export function markLogout() {
    return (dispatch) => {
        dispatch({'type': TYPES.IS_LOGOUT});
    }
}