/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午3:16
 */
import React, {Component} from 'react';
import {
    ActivityIndicator
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageShow extends Component{

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            imageUrls: [],
        };
    }

    componentWillMount(){
        this.setState({
            index: this.props.navigation.state.params.index,
            imageUrls: this.props.navigation.state.params.imageUrls
        })
    }

    loading = () => {
        return(<ActivityIndicator/>)
    };

    render(){
        return (
            <ImageViewer
                imageUrls={this.state.imageUrls}
                index={this.state.index}
                loadingRender={this.loading}
            />
        )
    }
}