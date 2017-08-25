/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午4:12
 */
import * as TYPES from './types';

export function showModal() {
    return (dispatch) => {
        dispatch({'type': TYPES.SHOW_CREATE_MODAL});
    }
}