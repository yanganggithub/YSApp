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
    Navigator,
    ListView,
    TouchableOpacity

} from 'react-native';

import Dimensions from'Dimensions';

var {width} = Dimensions.get('window');


var cols = 3;
var space = 8;
var imgW = (width - (cols + 1) * space)/cols;
var imgH =  (152.0/114.0 )*imgW;
var cellW = imgW;
var cellH = imgH + 44;



export default class ContentLIstCell extends Component{


    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
       this.state = {dataSource:ds.cloneWithRows(this.props.dataArr.data)};
    }

    render(){

       return(
         <ListView
                style={{backgroundColor:'#fff'}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                contentContainerStyle={styles.contentViewStyle}
                scrollEnabled={false}
            />
       );
    }

   // 具体的cell
    renderRow(rowdata){
        console.log(rowdata.litpic);
        return(
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                const { navigate } = this.props.navigation;
               
                navigate('VideoDetail',rowdata);
            } }>
                <View style={styles.cellStyle}>
                    <Image source={{uri: rowdata.litpic}}  loadingIndicatorSource ={{uri:'common_loading'}} style={{width:imgW, height:imgH}}/>
                    <View style={styles.titleStyle}>
                        <Text style={{fontSize:12,color:'#ffffff'}}>{'8分'}</Text>
                    </View>
                    <View style={styles.bottomViewStyle}>
                        <Text style={{fontSize:13,textAlign: 'center',color:'#262626'}}>{rowdata.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
        // 头部
    renderHeader(){
       
       return (
           <View  style={styles.headerStyle}>
                <Text>{this.props.dataArr.title}</Text>
           </View>
       );
    }
};


const styles = StyleSheet.create({
  container:{
      // marginTop:25

  },

    contentViewStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 多个cell在同一行显示
        flexWrap:'wrap',
        // 宽度
        width:width,
        alignItems:'flex-start'

    },

    titleStyle:{
        width:imgW,
        height:20,
        backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent:'center',
        alignItems:'flex-end',
        // 定位
        position:'absolute',
        bottom:44

    },
    cellStyle:{

        width:cellW,
        height:cellH,
        // 水平居中和垂直居中
        justifyContent:'center',
        alignItems:'center',
        marginLeft:space
    },
    headerStyle:{
        marginLeft:12,
        width:width,
        height:44,
        justifyContent:'center'
    },
     bottomViewStyle:{
        height:44,
        justifyContent:'center',
        alignItems:'center',

    }


  
});
  




