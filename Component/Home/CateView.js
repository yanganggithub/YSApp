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
    TouchableOpacity,
} from 'react-native';




var CateData = require('./Cate.json');



export default class CateView extends Component{
    constructor(props){

        super(props);



     
    }

    render() {

        return (

            <View style={styles.container}>
                   {this.renderAllItem()}
            </View>

        );
    }


     renderAllItem(){
       // 定义组件数组
       var itemArr = [];
       // 遍历
       for(var i=0; i<CateData.length; i++){
           // 取出单独的数据
           var data = CateData[i];
           // 创建组件装入数组
           itemArr.push(
               <CateItem key={i} iconName={data.iconName} title={data.title}/>
               );
       }
       // 返回
        return itemArr;
    }

}


class CateItem extends Component{
     constructor(props){

        super(props);

     }

      render(){
                return(
                  <TouchableOpacity activeOpacity={0.5} onPress={()=>{alert('0')}}>
                    <View style={styles.innerViewStyle}>
                        <Image source={{uri: this.props.iconName}} style={{width:26, height:26, marginBottom:3}}/>
                        <Text style={{color:'gray'}}>{this.props.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
       }
}

const styles = StyleSheet.create({

 container: {
        // 设置主轴的方向
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'white',
        // 设置主轴的对齐方式
        justifyContent:'space-around'
   },
     innerViewStyle:{
            width:80,
            height:80,

            // 水平和垂直居中
            justifyContent:'center',
            alignItems:'center'
      }


});


