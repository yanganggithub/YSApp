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
    ListView,
    Platform,   // 判断当前运行的系统
    TouchableOpacity,
    DeviceEventEmitter,
    Dimensions,
    AsyncStorage,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import YSNativeModule from "../Native/YSNativeModule"
import DataBaseNativeModule from "../Native/DataBaseNativeModule"
import VideoDetail from "../VideoDetail/VideoDetail"
import FavouriteList from "./FavouriteList";
var {width,height} = Dimensions.get('window');

var cols = 3;
var space = 8;
var imgW = (width - (cols + 1) * space)/cols;
var imgH =  (152.0/114.0 )*imgW;
var cellW = imgW;
var cellH = imgH + 44;


export default class Me extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderNavBar()}
                <ScrollableTabView
                    tabBarUnderlineColor='#FF0000'
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#00ae54'
                    tabBarInactiveTextColor='#262626'
                    tabBarTextStyle={{fontSize: 14}}
                >
                    <WatchList tabLabel="观看记录"  type="1" navigator={this.props.navigator}/>
                    <FavouriteList tabLabel="我的收藏" type="2" navigator={this.props.navigator}/>

                </ScrollableTabView>
            </View>
        );
    }
  

    renderNavBar(){
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity  style={styles.leftViewStyle}>
                    <Image source={{uri: 'nav_search'}} style={styles.navImageStyle}/>
                </TouchableOpacity>
                <View style={styles.txtStyle}>
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>我的</Text>
                </View>

                <TouchableOpacity onPress={()=>{alert('点了!')}} style={styles.rightViewStyle}>
                    <Image source={{uri: 'nav_record'}} style={styles.navImageStyle}/>
                </TouchableOpacity>
            </View>
        )
    }

   

 
}

class WatchList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
        };
    }

    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        );

    }

    renderRow(rowData) {
        return(
            <TouchableOpacity activeOpacity={1} onPress={()=>{
              
                const { navigate } = this.props.navigation;

                navigate('VideoDetail',rowData);
            } }>
                <View style={styles.listViewStyle}>
                    {/*左边*/}
                    <Image source={{uri:rowData.pic}} style={styles.imageViewStyle}/>
                    {/*右边*/}

                    <View style={styles.rightContentStyle}>

                        <View style={styles.rightTopViewStyle}>
                            <Text style={{color:'#383838',fontSize:16}}>{rowData.playName}</Text>
                        </View>
                       
 
                        <Text style={{color:'#a1a1a1',fontSize:14}}>{this.formatSeconds(rowData.playTime/1000)}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentWillMount(){    
        // //异步获取数据
        // //发送事件从原生获取数据
        // YSNativeModule.getHistory();
       
        // //监听ReceiveData的事件接受数据
        // DeviceEventEmitter.addListener('ReceiveData', (getHistory)=> {    
            
            // var objArr = JSON.parse(getHistory);
            // this.setState({
            //     // cell的数据源
            //     dataSource: this.state.dataSource.cloneWithRows(objArr),
            // });
        // });   
        
        DataBaseNativeModule.getCallBackHistory((dataString)=>{
            var objArr = JSON.parse(dataString);
            if(objArr.length > 0)
            {
                this.setState({
                    // cell的数据源
                    dataSource: this.state.dataSource.cloneWithRows(objArr),
                });
            }
        
        },(errorMsg)=>{
            
        })
        
        
    }

    formatSeconds(value) {
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        var result = "" + parseInt(secondTime) + "秒";

        minuteTime > 0 ?  result = "" + parseInt(minuteTime) + "分" + result :  result = "00分" + result;
        
        hourTime >0 ?  result = "" + parseInt(hourTime) + "小时" + result : result = "00小时" + result;
      
         result = "你上次已观看到 " + result;
        return   result;
 
    }
}






const styles = StyleSheet.create({
    container:{
        flex:1,
    },
   navOutViewStyle:{
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'rgba(17,17,17,1.0)',
        // 设置主轴的方向
        flexDirection:'row',
        // 主轴方向居中
        justifyContent:'center'
    },

    leftViewStyle:{
        // 绝对定位
        position:'absolute',
        left:10,
        bottom:Platform.OS == 'ios' ? 15:13
    },

    navImageStyle:{
        width:Platform.OS == 'ios' ? 24: 24,
        height:Platform.OS == 'ios' ? 24: 24,
    },

    rightViewStyle:{
        // 绝对定位
        position:'absolute',
        right:10,
        bottom:Platform.OS == 'ios' ? 15:13
    },
    txtStyle:{
        marginTop:Platform.OS == 'ios' ? 30 : 10

    },

    listViewStyle:{
        backgroundColor:'white',
        padding:14,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:0.5,

        flexDirection:'row'
    },

    imageViewStyle:{
        width:60,
        height:60
    },

    rightContentStyle:{
        marginLeft:13,
        width:width - 80 - 14 * 2 - 13,

    },

    rightTopViewStyle:{
        marginTop:0
    },
    areaStyle:{
        marginTop:7,
        marginBottom:2
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

    },
    lineStyle:{
        backgroundColor:'#00ae54'
    },

});


