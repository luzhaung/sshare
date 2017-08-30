/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午5:51
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions
} from 'react-native';

import {PRIMARY_COLOR} from "../def/Color";
import ImageShow from './ImageShow';
const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 0,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    feedHeader: {
        flex: 1,
        flexDirection: 'row',
        margin: margin,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    feedUserInfo: {
        marginLeft: 10,
    },

    feedUserName: {
        marginTop: 3,
        fontSize: 16,
        color: PRIMARY_COLOR,
        lineHeight: 16,
    },
    feedTime: {
        fontSize: 12,
        color: '#7B7C84',
        lineHeight: 12,
        marginTop: 5,
    },
    followView: {
        position:'absolute',
        right:0,
        marginTop:3
    },
    followText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    feedContent: {
        flex: 1,
    },
    feedContentText: {
        flex: 1,
        textAlign: 'justify',
        margin: margin,
        marginTop: -10,
        fontSize: 14,
        color: '#333333',
        lineHeight: 20,
    },
    feedContentSingleImage: {
        flex: 1,
        height: 170,
    },
    feedContentImages: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: margin,
    },
    feedContentImage: {
        width: (windowWidth - margin * 2 - imgInterval * 2) / 3,
        height: (windowWidth - margin * 2 - imgInterval * 2) / 3,
        marginBottom: imgInterval,
        marginRight: imgInterval,
        backgroundColor: '#e7edf3',
    },
    feedActions: {
        //borderWidth: 1,
        //borderTopColor: '#EEEEEE',
        flex: 1,
        flexDirection: 'row',
        //marginTop: 15,
        marginRight: margin,
        marginBottom: 5,
    },
    feedActionComment: {
        width: 40,
        padding: 5,
        marginRight: 5,
    },
    feedActionLike: {
        width: 40,
        padding: 5,
    },
    thumbnail: {
        flex: 1,
        height: 81,
    },
    rightContainer: {
        flex: 1,
    },
    listView: {
        paddingTop: 70,
        backgroundColor: 'white',
    },
    tagsContainer: {
        flex: 2,
        marginLeft: 20,
        marginTop: 10,

    }
});

export default class FeedCell extends Component{
    constructor(pros){
        super(pros);
        console.log(pros);
    }

    imageShow = (imageUrls) => {
        if(imageUrls === null) return [];
        let images = imageUrls.split(",");
        let imageUrl = [];
        for (let img of images){
            imageUrl.push({url: img});
        }
        return imageUrl;
    };

    renderFeedImages = (content) => {
        let imageUrls = this.imageShow(content);
        if(content === null) return [];
        let images = content.split(",");
        let imagesView = [];
        for(let i=0; i<images.length; i++) {
            imagesView.push(
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('ImageShow',{index: i, imageUrls:imageUrls})}
                    key={i}>
                    <Image source={{uri: images[i]}} style={styles.feedContentImage} key={i}/>
                </TouchableOpacity>
            );
        }

        return imagesView;
    };

    renderFeedContent = (feed) => {
        if (feed.excerpt === null || feed.excerpt.length === 0) {
            return (
                <View style={styles.feedContentImages}>{this.renderFeedImages(feed.images)}</View>
            );
        }
        return (
            <View>
                <Text style={styles.feedContentText}>{feed.excerpt}</Text>
                <View style={styles.feedContentImages}>{this.renderFeedImages(feed.images)}</View>
            </View>
        );
    };

    renderCommentList = () => {
        return (
            <View style={{flex: 1}}>
            </View>
        );
    };

    render(){
        const {feed, pressAvatar, selectFeed} = this.props;
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={selectFeed}>
                    <View style={styles.container}>
                        <View style={styles.feedHeader}>
                            <View>
                                <TouchableOpacity onPress={pressAvatar}>
                                    <Image
                                        source={{uri: feed.author_avatar}}
                                        style={styles.avatar}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.feedUserInfo}>
                                <Text style={styles.feedUserName}>{feed.username}</Text>
                                <Text style={styles.feedTime}>{feed.timeFormat}</Text>
                            </View>
                            <View style={styles.followView}>
                                <TouchableOpacity><Text style={styles.followText}>+关注</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.feedContent}>
                            {this.renderFeedContent(feed)}
                        </View>
                        {/*{this.renderCommentList()}*/}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

