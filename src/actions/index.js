/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午9:43
 */

import * as TYPES from './types';

export function showLoginModal() {
    return (dispatch) => {
        dispatch({'type': TYPES.SHOW_LOGIN_MODAL});
    }
}

export function showCreateModal() {
    return (dispatch) => {
        dispatch({'type': TYPES.SHOW_CREATE_MODAL});
    }
}