/**
 * @sshare 首页
 * @author luzhuang <luzhuang1994@gmail.com>
 * @time 2017年08月17日14:08:23
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList,
    ListView,
    ActivityIndicator
} from 'react-native';

import FeedList from '../component/FeedList'
import Icon from 'react-native-vector-icons/Ionicons';
//import Markdown from 'react-native-simple-markdown';
const {height, width} = Dimensions.get('window');

export default class HomePage extends Component {
    static navigationOptions = {
        title: '首页',
        headerLeft: null,
        headerBackTitle: null,
        // headerRight: <Icon name="ios-search" size={22} style={{marginRight: 10}}/>,
        headerStyle: {
            backgroundColor: '#fff',
            height: 50
        },
        headerTitleStyle: {
            color: '#000'
        },
        tabBarIcon: ({tintColor, focused}) => (
            focused
                ?
                <Icon name="ios-home" size={22} color={tintColor} style={styles.icon}/>
                :
                <Icon name="ios-home-outline" size={22} color={tintColor} style={styles.icon}/>
        ),
    };

    componentWillMount() {
        /*const {navigate} = this.props.navigation;
        navigate('LoginRegPage');*/
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <FeedList/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {}
});