/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午4:25
 */
import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TextInput,
    RefreshControl,
    Alert,
    ActivityIndicator
} from 'react-native';
import {FeedCell} from './FeedCell';
import {PostList} from '../def/Api';

const windowWidth = Dimensions.get('window').width;


export default class FeedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            feedId: 0,
            feeds: [],
            noMore: false,
            loaded: false,
            refreshing: false,
            isLoadingMore: false,
        };
        page = 1;
        rows = 20;
    }

    async componentDidMount() {
        await this.fetchMore();
        this.setState({
            ready: true,
        });
    }

    selectFeed = (feed, avatarCanClick = true) => {
        Alert.alert('loading');
    };

    pressAvatar = (feed) => {
        Alert.alert('loading');
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    fetchData = (page = 1, rows = 20) => {
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        return fetch(`${PostList}?page=${page}&rows=${rows}`)
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText);
                if (json.status === -1) {
                    Alert.alert('', json.info);
                    this.setState({
                        refreshing: false,
                    });
                    return [];
                }
                this.setState({
                    refreshing: false,
                });
                this.refreshing = false;
                return json.data;
            })
            .catch((error) => {
                console.log(error);
            })
    };

    freshData = async () => {
        const json = await this.fetchData();
        this.setState({
            feeds: json,
        })
    };

    fetchMore = async () => {
        const json = await this.fetchData(this.page, this.rows);
        if (json) {
            this.page += 1;
            this.setState({
                feeds: this.state.feeds.concat(json),
            });
        }
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => {
        return (<FeedCell
            selectFeed={this.selectFeed}
            pressAvatar={this.pressAvatar}
            feed={item}
                />);
    };

    render() {
        return (
            <FlatList
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this.freshData}
                onEndReached={this.fetchMore}
                onEndReachedThreshold={0}
                refreshing={refreshing}
                ListFooterComponent={() => {
                    return refreshing && <ActivityIndicator size="large"/>
                }}
            />
        )
    }
}