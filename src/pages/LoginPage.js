/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午11:31
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Modal,
    Dimensions,
    TouchableOpacity,
    Alert,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../def/Color'
import {LoginlUrl} from '../def/Api';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import *as loginAction from '../actions/login';
import {NavigationActions} from 'react-navigation';
import {isLogin} from '../util/Secret';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        zIndex: 10,
        top: 25,
    },
    cancelBtn: {
        position: 'absolute',
        left: 15,
    },
    reg: {
        position: 'absolute',
        right: 15,
    },
    regText: {
        color: PRIMARY_COLOR,
        lineHeight: 25,
        fontWeight: 'bold',
    },
    inputs: {
        marginTop: 30,
    },
    loginBtn: {
        width: windowWidth - margin * 2,
        height: 40,
        marginTop: 10,
        borderRadius: 3,
        alignItems: 'center',
        padding: 10,
        backgroundColor: PRIMARY_COLOR,
    },
});

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            animated: true,
            transparent: false,
            inLogin: false,
            modalVisible: true,
            isLogin: false
        };
    };

    cancel = () => {
        this.setState({
            modalVisible: false,
        });
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'myTabNavigator'})
            ]
        }));
    };

    checkLogin = () => {
        if (/^\s*$/.test(this.state.email)) {
            Alert.alert('请输入邮箱');
            return false;
        }

        if (/^\s*$/.test(this.state.password)) {
            Alert.alert('请输入密码');
            return false;
        }
        return true;
    };

    /*componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps);
        console.log(nextState);
        return true;
    }

    componentWillMount() {
        isLogin((result, token) => {
            if (result) {
                console.log('已登录');
                console.log(result);
                this.setState({
                    modalVisible: false,
                });
                this.props.navigation.navigate('AboutPage');
            }else{
                console.log('未登录');
            }
        });
    }

    componentDidMount() {
        this.setState({modalVisible: true})
    }*/

    async _login() {
        if (!this.checkLogin()) return false;
        this.setState({inLogin: true});
        let username = this.state.email;
        let password = this.state.password;
        // console.log(username);
        // console.log(password);
        let response = await fetch(`${LoginlUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'username=' + username + '&password=' + password
        });
        let jsonData = await response.json();
        if (jsonData.status === 1) {
            this.props.markLogin();
            await AsyncStorage.setItem('token', jsonData.data);
            await AsyncStorage.setItem('user_info', JSON.stringify(jsonData.user_info));
            this.setState({
                modalVisible: false,
            });
            this.props.navigation.navigate('Mine')
        } else {
            Alert.alert('失败', jsonData.info);
            this.setState({inLogin: false});
        }
    };

    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}>
                    <View style={{flex: 1}}>
                        <View style={styles.header}>
                            <View style={styles.cancelBtn}>
                                <TouchableOpacity onPress={this.cancel}>
                                    <Icon name="md-arrow-round-back" size={25} color={'#007aff'} style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.reg}>
                                <Text style={styles.regText}>立即注册</Text>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{marginTop: 100, height: 100,}}>
                                <Icon name="md-contact" size={100} color={'grey'} style={styles.icon}/>
                            </View>

                            <View style={styles.inputs}>
                                <TextInput
                                    style={{
                                        height: 40,
                                        width: windowWidth - margin * 2,
                                        padding: 10,
                                        borderColor: '#9B9B9B',
                                        borderWidth: 0.2,
                                        borderRadius: 3,
                                        color: '#9B9B9B'
                                    }}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="邮箱"
                                    editable={!this.state.inLogin}
                                    onChangeText={(email) => this.setState({email})}
                                />
                                <TextInput
                                    style={{
                                        height: 40,
                                        width: windowWidth - margin * 2,
                                        padding: 10,
                                        borderColor: '#9B9B9B',
                                        borderWidth: 0.2,
                                        marginTop: 10,
                                        borderRadius: 3,
                                        color: '#9B9B9B'
                                    }}
                                    placeholder="密码"
                                    secureTextEntry={true}
                                    editable={!this.state.inLogin}
                                    onChangeText={(password) => this.setState({password})}
                                />
                                <View>
                                    {
                                        this.state.inLogin ?
                                            <View style={[styles.loginBtn, {backgroundColor: '#2d78f4'}]}>
                                                <Text style={{color: 'white', fontSize: 16}}>登录中</Text>
                                            </View> :
                                            <TouchableOpacity onPress={this._login.bind(this)} style={styles.loginBtn}>
                                                <Text style={{color: 'white', fontSize: 16}}>登录</Text>
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        //...state,
        loginModalStore: state.loginModalStore,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(loginAction, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

/*
export default connect(
    (state) => ({
        showLoginModal: state.loginModalStore.showLoginModal,
    }),
    (dispatch) => ({
        showLoginModal: () => dispatch(loginAction.showLoginModal()),
    })
)(LoginPage)*/
