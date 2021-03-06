/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午12:08
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginPage from './LoginPage';

class LoginRegPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPageVisible: false,
            regPageVisible: false,
        }
    }

    showLoginPage = () => {
        this.setState({
            loginPageVisible: true,
        });
    };
    hideLoginPage = () => {
        this.setState({
            loginPageVisible: false,
        });
    };
    showRegPage = () => {
        this.setState({
            regPageVisible: true,
        });
    };
    hideRegPage = () => {
        this.setState({
            regPageVisible: false,
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.state.loginPageVisible &&
                    <LoginPage visible={true} hideLoginPage={this.hideLoginPage} refresh={this.props.refresh}/>
                }
                {
                    this.state.regPageVisible &&
                    <RegisterPage visible={true} hideRegPage={this.hideRegPage} refresh={this.props.refresh}/>
                }
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center',}}>
                    <Icon name="md-contact" size={120} color={'grey'} style={styles.icon}/>
                    <Text style={{color: '#9B9B9B', fontSize: 20, width: 200, marginTop: 30, textAlign: 'center'}}>欢迎加入十七度</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.loginBtn}>
                        <TouchableOpacity onPress={this.showLoginPage}>
                            <Text style={{color: '#00B5AD', fontSize: 18}}>登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.regBtn}>
                        <TouchableOpacity onPress={this.showRegPage}>
                            <Text style={{color: '#9B9B9B', fontSize: 18}}>注册</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    loginBtn: {
        borderColor: '#F3F3F3',
        borderWidth: 1,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 3,
    },
    regBtn: {
        marginLeft: 10,
        paddingTop: 5,
    },
    icon: {

    }
});
module.exports = LoginRegPage;
