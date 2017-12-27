/**
 * Created by dxplay120 on 2017/6/7.
 */
import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    Button,
} from 'react-native';

export default class RetryView extends Component {

    // static propTypes = {
    //     retryClick: React.PropTypes.func, //isRequired,
    // }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image source={{uri: 'netbreak'}} style={{width: 80, height: 80}}/>
                <Text style={{fontSize: 16, color: '#444', marginTop: 14}}>网络已断开或不稳定</Text>
                <Text style={{fontSize: 14, color: '#a5a5a5', marginTop: 2}}>您可以点击刷新按钮，再次加载</Text>
                <Button title="刷新页面" onPress={this.props.retryClick} color='#d43b33'
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginTop: 14,
                            borderRadius: 5
                        }}/>
            </View>
        )
    }
}
