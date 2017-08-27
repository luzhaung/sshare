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