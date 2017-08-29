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
    View,
    Dimensions
} from 'react-native';

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
        //borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#EEEEEE',
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
        color: '#00B5AD',
        lineHeight: 16,
    },
    feedTime: {
        fontSize: 12,
        color: '#7B7C84',
        lineHeight: 12,
        marginTop: 5,
    },

    feedContent: {
        flex: 1,
    },
    feedContentText: {
        flex: 1,
        textAlign: 'justify',
        margin: margin,
        marginTop: -10,
        fontSize: 16,
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

const renderFeedImages = (content) => {
    if(content === null) return [];
    let images = content.split(",");
    let imagesView = [];
    for(let i=0; i<images.length-1; i++) {
        imagesView.push(<Image source={{uri: images[i]}} style={styles.feedContentImage}/>);
    }
    return imagesView;
};

const renderFeedContent = (feed) => {
    if (feed.excerpt === null || feed.excerpt.length === 0) {
        return (
            <View style={styles.feedContentImages}>{renderFeedImages(this.props.feed.images)}</View>
        );
    }
    return (
        <View>
            <Text style={styles.feedContentText}>{this.props.feed.excerpt}</Text>
            <View style={styles.feedContentImages}>{renderFeedImages(this.props.feed.images)}</View>
        </View>
    );
};

const renderCommentList = () => {
    return (
        <View style={{flex: 1}}>
        </View>
    );
};

const FeedCell = (props) =>{
    console.log(props);
    return (
        <View>
            <TouchableOpacity
                onPress={this.props.onSelect}>
                <View style={styles.container}>
                    <View style={styles.feedHeader}>
                        <View>
                            <TouchableOpacity onPress={this.props.pressAvatar}>
                                <Image
                                    source={{uri: this.props.feed.author_avatar}}
                                    style={styles.avatar}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.feedUserInfo}>
                            <Text style={styles.feedUserName}>{this.props.feed.username}</Text>
                            <Text style={styles.feedTime}>{this.props.feed.timeFormat}</Text>
                            {/* <Text style={styles.feedTime}>{this.props.feed.id+' '+this.props.page}</Text> */}
                        </View>
                    </View>
                    <View style={styles.feedContent}>
                        {renderFeedContent(this.props.feed)}
                    </View>
                    {/*{this.renderCommentList()}*/}
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default FeedCell;
