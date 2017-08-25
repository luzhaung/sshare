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
    ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

export default class HomePage extends Component {
    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        headerRight: <Icon name="ios-search" size={22} style={{marginRight: 10}}/>,
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
                <Icon name="ios-aperture" size={22} color={tintColor} style={styles.icon}/>
                :
                <Icon name="ios-aperture-outline" size={22} color={tintColor} style={styles.icon}/>
        ),
    };

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View><Text>首页</Text></View>
        )
    }
}

const styles = StyleSheet.create({
   icon: {

   }
});