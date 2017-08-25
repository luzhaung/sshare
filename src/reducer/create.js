/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午2:16
 */

import * as TYPES from '../actions/types';

const initialState = {
    showModal: false,
};

export default function create(state = initialState, action) {
    switch (action.type) {
        case TYPES.SHOW_CREATE_MODAL:
            return {
                showModal: true
            };
        default:
            return state;
    }
}