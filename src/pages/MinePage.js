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

export default class MinePage extends Component{
    static navigationOptions = {
        title: '我的',
        tabBarLabel: '我的',
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
                <Icon name="ios-contact" size={22} color={tintColor} style={styles.icon}/>
                :
                <Icon name="ios-contact-outline" size={22} color={tintColor} style={styles.icon}/>
        ),
    };
    render() {
        const { navigate } = this.props.navigation;
        return(
            <View><Text>我的</Text></View>
        )
    }
}
const styles = StyleSheet.create({
    icon: {

    }
});