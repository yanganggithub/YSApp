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
} from 'react-native';


import YSNativeModule from "../Native/YSNativeModule"
import VideoDetail from "../VideoDetail/VideoDetail"
var {width,height} = Dimensions.get('window');




export default class Me extends Component{
    constructor(props) {
        super(props);
       
        this.state = {
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
        };
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderNavBar()}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
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

    renderRow(rowData){
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
                            <Text>{rowData.title}</Text>

                        </View>
                        <View style={styles.areaStyle}>
                            <Text style={{color:'gray'}}>{rowData.playName}</Text>
                        </View>

                        <Text style={{color:'gray'}}>{rowData.playTime}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentWillMount(){    
        //异步获取数据
        //发送事件从原生获取数据
        YSNativeModule.getHistory();
       
        //监听ReceiveData的事件接受数据
        DeviceEventEmitter.addListener('ReceiveData', (getHistory)=> {    
            
            var objArr = JSON.parse(getHistory);
            alert(getHistory);
            this.setState({
                // cell的数据源
                dataSource: this.state.dataSource.cloneWithRows(objArr),
            });

        });       
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
        width:80,
        height:106
    },

    rightContentStyle:{
        marginLeft:13,
        width:width - 80 - 14 * 2 - 13,

    },

    rightTopViewStyle:{
        marginTop:3
    },
    areaStyle:{
        marginTop:7,
        marginBottom:2
    },

});


