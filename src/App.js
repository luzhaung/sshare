import React, {Component} from 'react';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import Home from './pages/HomePage';
import Create from './pages/CreatePage';
import Mine from './pages/MinePage';
import {connect} from 'react-redux';
import * as TYPES from './actions/types';
import {showModal} from "./actions/create";

const myTabNavigator = TabNavigator({
    Home: {screen: Home},
    Create: {screen: Create},
    Mine: {screen: Mine},
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#ffd100',
        inactiveTintColor: '#666',
        style: {
            backgroundColor: '#fff',
        },
    },
    swipeEnabled: true,
    animationEnabled: true,
});
const MyApp = StackNavigator({
    myTabNavigator: {screen: myTabNavigator},
    /*Detail: {screen: Detail},
    Login: {screen: Login},*/
}, {
    headerMode: 'screen',
    translucent: true,
    style: {
        backgroundColor: '#ffffff',
    },

});

class Sshare extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('==========================shouldComponentUpdate START=====================');
        console.log(nextProps);
        console.log(nextState);
        console.log('==========================shouldComponentUpdate END=====================');
        return true;
    }

    render() {
        return (
            <MyApp
                onNavigationStateChange={(prevState, currentState, action) => {
                    console.log(action.routeName);
                    if (action.routeName === 'Create') {
                        this.props.dispatch(showModal())
                    }
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        showModal: state.showModal,
    }
};
export default connect(mapStateToProps)(Sshare);
// export default sshare;