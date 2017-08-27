import React, {Component} from 'react';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import Home from './pages/HomePage';
import Create from './pages/CreatePage';
import Mine from './pages/MinePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import {connect} from 'react-redux';
import {showCreateModal} from "./actions/create";
import {showLoginModal} from "./actions/login";
import {isLogin} from './util/Secret';

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
    myTabNavigator: {
        screen: myTabNavigator
    },
    LoginPage: {
        screen: LoginPage
    },
    AboutPage: {
        screen: AboutPage
    }
}, {
    headerMode: 'screen',
    style: {
        backgroundColor: '#ffffff',
    },
});

class Sshare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            token: '',
            isLogout: false,
            sent: false,
            id: '',
        }
    }

    componentWillMount() {
        isLogin((result, token) => {
            if (result) {
                console.log('已登录');
                console.log(result);
                this.setState({
                    isLogin: true,
                    token: token,
                });
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('==========================shouldComponentUpdate START=====================');
        console.log(nextProps);
        console.log(nextState);
        console.log('==========================shouldComponentUpdate END=====================');
        return true;
    }

    refresh = (isLogin, token) => {
        this.setState({
            isLogin: isLogin,
            token: token,
        });
    };

    render() {
        return (
            <MyApp
                onNavigationStateChange={(prevState, currentState, action) => {
                    console.log(action.routeName);
                    if (action.routeName === 'Create') {
                        if (this.state.isLogin) {
                            this.props.dispatch(showCreateModal())
                        } else {
                            this.props.dispatch(showLoginModal())
                        }
                    }
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {createModalStore, loginModalStore} = state;
    return {
        createModalStore,
        loginModalStore
    }
};
export default connect(mapStateToProps)(Sshare);
//export default Sshare;