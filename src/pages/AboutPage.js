/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午7:21
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class AboutPage extends Component {

    constructor(props){
        super(props);
        console.log(props)
    }
    render(){
        return (
            <View>
                <Text>About me</Text>
            </View>
        );
    }
}