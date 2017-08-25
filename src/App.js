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
    /*lazy:true,*/
});
const MyApp = StackNavigator({
    myTabNavigator: {screen: myTabNavigator},
    /*Detail: {screen: Detail},
    Login: {screen: Login},*/
}, {
    onTransitionEnd() {
        //console.log(this.navigation);
        if (this.navigation.state.routes[0].index === 1) {
            const headerMode = 'none', mode = 'modal';
        } else {
            const headerMode = 'screen', mode = 'card';
        }
    },
    headerMode: 'screen',
    translucent: true,
    style: {
        backgroundColor: '#ffffff',
    },

});

class Sshare extends Component {
    constructor(props) {
        super(props);
        this.state = {showCreateModal: false};
        console.log(this.navigation);
        //this.props.dispatch(showModal());
        /*if(this.navigation.state.routeName === "Create"){
            console.log('123');
        }*/
        console.log(this.props);
    }

    showModal = () => {
        console.log('12323')
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log('==========================shouldComponentUpdate START=====================');
        console.log(nextProps);
        console.log(nextState);
        console.log('==========================shouldComponentUpdate END=====================');
        return true;
    }

    render() {
        console.log('render');
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

function select(store) {
    return {
        showCreateModal: store.createModalStore.showCreateModal,
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        showModal: state.showModal,
    }
}
export default connect(mapStateToProps)(Sshare);
// export default sshare;