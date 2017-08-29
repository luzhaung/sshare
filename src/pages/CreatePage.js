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
import {connect} from 'react-redux';
import *as createAction from '../actions/create';
import {Regulars} from "../def/Regular";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {uploadImage,sendPost} from '../def/Api';
import {PRIMARY_COLOR} from "../def/Color";
import {getToken} from "../util/Secret";

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
    tagIcon: {
        width: 20,
        height: 40,
        color: '#9B9B9B',
        fontSize: 23,
        marginLeft: 20,
    },
    tagsContainer: {
        flex: 1,
        height: 100,
        marginBottom: 50,
    },
    tagInput: {
        flex: 1,
        height: 30,
        width: windowWidth - margin * 4,
        marginRight: 20,
    },
    tags: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: windowWidth - margin * 2,
        height: 100,
        margin: margin,
        marginTop: 30,
    },
    tag: {
        height: 26,
        marginRight: 10,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F3F3F3',
        borderRadius: 5,
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
    sendButton: {
      borderRadius: 4,
      backgroundColor: PRIMARY_COLOR,

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

    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarLabel: '发表',
        header: null,
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
            respImages: [],
            text: '',
            tags: [], //已经添加的tag
            tag: '',  //正在输入的tag
            tagCountLimit: 5,
            uploading: false,
            animated: true,
            modalVisible: false,
            transparent: false,
        };
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log('=====================CreatePage shouldComponentUpdate start=================');
        console.log(nextProps);
        console.log(nextState);
        return true;
    }

    componentWillReceiveProps(nextProps) {
        const {createModalStore, loginModalStore, navigation} = nextProps;
        console.log(createModalStore);
        console.log(loginModalStore);
        console.log(navigation);
        if (createModalStore.showCreateModal && loginModalStore.isLogin) {
            console.log('==============是否显示CreateModal==============');
            console.log(createModalStore.showCreateModal);
            this.showModal();
        } else if (loginModalStore.isLogout) {

        } else if (loginModalStore.showLoginModal) {
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
    showModal = () => {
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

    checkTagInput = (tag) => {
        if (tag.indexOf(' ') === 0) return;
        if (tag.indexOf(' ') > 0) {
            tag = tag.replace(/(^\s*)|(\s*$)/g, "");
            console.log('[' + tag + ']');
            for (let i in this.state.tags) {
                if (this.state.tags[i] === tag) {
                    return;
                }
            }
            this.state.tags.push(tag);
            this.setState({tag: ''});
        } else {
            this.setState({tag: tag});
        }
    };

    delTag = (tag) => {
        console.log('del ' + tag);
        let tags = this.state.tags;
        for (let i in tags) {
            if (tags[i] === tag) {
                tags.splice(i, 1);
                break;
            }
        }
        this.setState({tags: tags});
    };

    renderTags = () => {
        let tagViews = [];
        for (let i in this.state.tags) {
            tagViews.push(<TouchableOpacity style={styles.tag} onPress={() => this.delTag(this.state.tags[i])} key={i}>
                <Text style={{color: '#9B9B9B'}}>{this.state.tags[i]} ㄨ</Text>
            </TouchableOpacity>);
        }
        return tagViews;
    };

    uploadImg = () => {
        let formData = new FormData();
        for (let img of this.state.images) {
            formData.append('image[]', {uri: img.uri, type: 'multipart/form-data', name: img.index + '.jpg'});
        }
        this.setState({uploading: true});
        fetch(`${uploadImage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json()).then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.status === 1){
                    for (let img of responseData.data){
                        this.state.respImages.push(img);
                    }
                    this.toSendPost();
                }else{
                    Alert.alert(responseData.info);
                }
            }).catch((error) => {
                console.error('error', error)
            });
    };

    toSendPost = () => {
        const {respImages, text, tags} = this.state;
        getToken((token)=>{
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token':token,
                },
                // body: encodeURI(JSON.stringify({content: text, photos: respImages, tags: tags}), 'utf-8')
                body: 'content='+text+'&photos='+respImages.toString()+'&tags='+tags.toString()
            };
            fetch(`${sendPost}`, options).then((response) => response.json())
                .then((responseData) => {
                    this.setState({uploading: false});
                    if(responseData.status === 1) {
                        console.log(responseData);
                        this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'myTabNavigator'})
                            ]
                        }));
                        // callback(true, responseData.post.id);
                    }else{
                        Alert.alert(responseData.info);
                    }
                    console.log(responseData);
                }).done();
        });
    };

    send = () => {
        const {images, text, tags} = this.state;
        if (images.length > 0){
            this.uploadImg();
            console.log(images);
            console.log(text);
            console.log(tags);
        }

    };

    render() {
        const {navigate} = this.props.navigation;
        //console.log(navigate);
        const {uploading} = this.state;
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
                            {
                                uploading ?
                                    <ActivityIndicator
                                        animating={true}
                                        size="small"
                                    />
                                    :
                                    <TouchableOpacity onPress={this.send}>
                                        <Text style={{textAlign: 'right', color: '#2d78f4'}}>发送</Text>
                                    </TouchableOpacity>
                            }
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
                        <View style={styles.tagsContainer}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={styles.tagIcon}>#</Text>
                                <TextInput
                                    style={styles.tagInput}
                                    placeholder="添加标签"
                                    returnKeyType="done"
                                    autoFocus={false}
                                    multiline={false}
                                    keyboardType='twitter'
                                    maxLength={140}
                                    value={this.state.tag}
                                    onChangeText={(tag) => {
                                        this.checkTagInput(tag)
                                    }}
                                />
                            </View>
                            <View style={styles.tags}>
                                {this.state.tags.length > 0 && this.renderTags()}
                            </View>
                        </View>
                        <KeyboardSpacer/>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
}

function select(store) {
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