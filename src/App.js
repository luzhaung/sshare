import React, {Component} from 'react';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import {Alert} from 'react-native';

import Home from './pages/HomePage';
import Create from './pages/CreatePage';
import Mine from './pages/MinePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ImageShow from './component/ImageShow';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import *as Actions from './actions/index';
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
    },
    ImageShow: {
        screen: ImageShow
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
        console.log(props);
        this.state = {
            isLogin: false,
            token: '',
            isLogout: false,
            sent: false,
            id: '',
        }
    }

    componentWillMount() {
        console.log(this.props);
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

    componentWillReceiveProps(nextProps) {
        const {createModalStore,loginModalStore, navigation} = nextProps;
        console.log(createModalStore);
        console.log(loginModalStore);
        console.log(navigation);
        if (loginModalStore.isLogin){
            this.setState({isLogin: true})
        }else if (loginModalStore.isLogout){
            this.setState({isLogin: false,showLoginModal:true,showCreateModal: false})
        }

    }

    /*componentDidMount() {
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
    }*/

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
                    console.log(this.props);
                    console.log(action);
                    if (action.routeName === 'Create') {
                        if (this.state.isLogin) {
                            console.log('已登录showCreateModal');
                            this.props.showCreateModal()
                        } else {
                            console.log('未登录showCreateModal');
                            this.props.showLoginModal()
                        }
                    }
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const {createModalStore, loginModalStore} = state;
    return {
        createModalStore,
        loginModalStore
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Sshare);
//export default Sshare;