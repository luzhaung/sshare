import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList,
    ActivityIndicator,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {NavigationActions} from 'react-navigation'

import { connect } from 'react-redux';
import *as createAction from '../actions/create';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;
const imgInterval = 5;
const imgCountLimit = 9;
const textLengthLimit = 140;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column'
    },
    icon: {
        marginTop: -15,
    },
    cancel_create: {
        marginLeft: 10,
    },
    certain_create: {
        marginRight: 10,
    },
    multiline: {
        flex: 1,
        fontSize: 18,
        height: 150,
        padding: 20,
        paddingBottom: 40,
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 0,
        marginLeft: margin,
        marginBottom: 20,
    },
    imgWrapper: {
        position: 'relative',
        width: (windowWidth - margin * 2 - imgInterval * 2) / 3,
        height: (windowWidth - margin * 2 - imgInterval * 2) / 3,
        marginBottom: imgInterval,
        marginRight: imgInterval,
    },
    img: {
        width: (windowWidth - margin * 2 - imgInterval * 2) / 3,
        height: (windowWidth - margin * 2 - imgInterval * 2) / 3,
        marginBottom: imgInterval,
        marginRight: imgInterval,
        resizeMode: 'cover',
    },
    delIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        flex: 1,
    },
    sendBtn: {
        width: 50,
    },
    wrap: {
        flex: 1,
        flexDirection: 'column',
    },
    nav: {
        flexDirection: 'row',
        height: 50,
        paddingTop: 25,
        paddingRight: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: '#9B9B9B',
    },

});

class CreatePage extends Component {

    static navigationOptions =({ navigation, screenProps })=> ({
        tabBarLabel: '发表',
        header: null,
        /*tabBarLabel: '发表',
        headerLeft: <View style={styles.cancel_create}>
            <Text onPress={this.cancel}>取消</Text>
        </View>,
        headerRight: <Text style={styles.certain_create}/!* onPress={navigation.state.params.navigatePress}*!/>发布</Text>,
        headerStyle: {
            backgroundColor: '#fff',
            height: 50
        },
        headerTitleStyle: {
            color: '#000'
        },*/
        tabBarIcon: ({tintColor, focused}) => (
            focused
                ?
                <Icon name="ios-add-circle" size={45} color={tintColor} style={styles.icon}/>
                :
                <Icon name="ios-add-circle-outline" size={45} color={tintColor} style={styles.icon}/>
        ),
    });

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            image: null,
            images: [],
            text: '',
            tags: [], //已经添加的tag
            tag: '',  //正在输入的tag
            tagCountLimit: 5,
            uploadAlready: false,
            animated: true,
            modalVisible: false,
            transparent: false,
        };
    };
    shouldComponentUpdate(nextProps, nextState){
        console.log('=====================CreatePage shouldComponentUpdate start=================');
        console.log(nextProps);
        console.log(nextState);
        return true;
    }
    componentWillReceiveProps(nextProps) {
        const {createModalStore,loginModalStore, navigation} = nextProps;
        console.log(createModalStore);
        console.log(loginModalStore);
        console.log(navigation);
        if (createModalStore.showCreateModal && loginModalStore.isLogin){
            console.log('==============是否显示CreateModal==============');
            console.log(createModalStore.showCreateModal);
            this.showModal();
        }else if(loginModalStore.isLogout){

        }else if (loginModalStore.showLoginModal){
            console.log('显示登录modal');
            this.props.navigation.navigate('LoginPage');
        }
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        /*this.props.navigation.setParams({
            title:'自定义Header',
            navigatePress:this.navigatePress
        })*/
    }
    /*navigatePress = () => {
        alert('点击headerRight');
        console.log(this.props.navigation);
    };*/
    showModal = ()=> {
        this.setState({
            modalVisible: true,
        });
    };

    cancel() {
        this.setState({
            modalVisible: false,
        });
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
        /*this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'myTabNavigator'})
            ]
        }));*/
    }

    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: imgCountLimit - this.state.images.length,
        }).then(images => {
            const newImages = this.state.images;
            images.map((i, index) => {
                console.log('received image', i);
                newImages.push({uri: i.path, width: i.width, height: i.height, mime: i.mime, index: index});
            });
            this.setState({
                images: newImages,
            });
        }).catch(e => alert(e));
    }

    delImg(index) {
        this.state.images.splice(index, 1);
    }

    renderImgsPicked() {
        const imgViews = [];
        if (this.state.images !== null && this.state.images.length !== 0) {
            for (let img of this.state.images) {
                imgViews.push(<View style={styles.imgWrapper} key={img.uri}>
                        <Image style={styles.img} source={img}/>
                    </View>
                );
            }
        }

        if (this.state.images.length < imgCountLimit) {
            imgViews.push(<View style={styles.imgWrapper} key="1">
                <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
                    <Image style={styles.img} source={require('../imgs/pickBtn.png')}/>
                </TouchableOpacity>
            </View>);
        }

        return imgViews || <View/>;
    }

    render() {
        const {navigate} = this.props.navigation;
        //console.log(navigate);
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}>
                    <View style={styles.nav}>
                        <View style={styles.cancel_create}>
                            <Text onPress={this.cancel.bind(this)}>取消</Text>
                        </View>
                        <View style={styles.title}><Text
                            style={{textAlign: 'center', fontWeight: 'bold'}}>发状态</Text></View>
                        <View style={styles.sendBtn}>
                            <TouchableOpacity onPress={this.send}>
                                <Text style={{textAlign: 'right', color: '#2d78f4'}}>发送</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={styles.container}>
                        <View>
                            <View>
                                <TextInput
                                    style={styles.multiline}
                                    placeholder="说点什么吧..."
                                    returnKeyType="next"
                                    autoFocus={true}
                                    multiline={true}
                                    keyboardType='twitter'
                                    maxLength={140}
                                    value={this.state.text}
                                    onChangeText={(text) => this.setState({text})}
                                />
                                <Text style={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 20,
                                    color: '#9B9B9B'
                                }}>{textLengthLimit - this.state.text.length}</Text>
                            </View>
                        </View>
                        <View style={styles.imgContainer}>
                            {this.renderImgsPicked()}
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
}

function select(store){
    return {
        showCreateModal: store.createModalStore.showCreateModal,
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //...state,
        loginModalStore: state.loginModalStore,
        createModalStore: state.createModalStore,
    }
};

export default connect(mapStateToProps)(CreatePage);