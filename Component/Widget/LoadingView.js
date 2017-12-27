/**
 * Created by dxplay120 on 2017/5/24.
 */
import React, {Component} from 'react';
import {
    Image, 
    View,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';

export default class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.click}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            </TouchableWithoutFeedback>
        )

    }
}
