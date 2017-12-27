/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// npm install

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,   // 判断当前运行的系统
    Navigator
} from 'react-native';


/**-----导入外部的组件类------**/
import TabNavigator from 'react-native-tab-navigator';


import Tabbar from '../Tabbar/Tabbar';
import { StackNavigator } from 'react-navigation';


export default  class Main extends Component{
    constructor(props){
        super(props);
         // 初始化函数(变量是可以改变的,充当状态机的角色)
         console.log(this);

    }



    render() {
        return <Tabbar navigation={this.props.navigation}></Tabbar>;

    }



}



const styles = StyleSheet.create({




});


