/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午9:23
 */
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Sshare from '../App';
import  configureStore from '../store/store'
const store = configureStore();
class Init extends Component {
    render() {
        return (
            <Provider store={store}>
                <Sshare/>
            </Provider>
        )
    }
}

export default Init;
