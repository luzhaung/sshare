/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午2:16
 */

import * as TYPES from '../actions/types';

const initialState = {
    showCreateModal: false,
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.SHOW_CREATE_MODAL:
            return {
                showCreateModal: true
            };
        default:
            return state;
    }
}