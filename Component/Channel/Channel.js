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
    ScrollView,
    Dimensions,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';

import ChannelDetail from '../Channel/ChannelDetail';
import YSNativeModule from "../Native/YSNativeModule";
import  Orientation from 'react-native-orientation';


var {width,height} = Dimensions.get('window');

var imgW = width/2.0;
var imgH = imgW * (121/187.5);
var hotW = width/4.0;
var hotH = 40;
import request from '../Common/request';
import config from '../Common/config';
import LoadingView from "../Widget/LoadingView";
import RetryView from "../Widget/RetryView";

export default class Channel extends Component{
    constructor(props){
        super(props);
        this.state ={
            error:false,
            pageLoading: true,
            cateData:[],
        };
     
    }
    
    render() {

        if (this.state.error)
            return (
                <RetryView retryClick={this.retry.bind(this)}/>
            )
        else if (this.state.pageLoading)
            return (
                <LoadingView/>
            )
        else
        {

        let listCate = [];
        let colorArr =['rgba(28,181,19,1)', 'rgba(23,124,205,1)' ,'rgba(239,68,14,1)',  'rgba(230,113,11,1)'];
       
        for(var i = 0;i< this.state.cateData.length;i++)
        {

            if(i % 2 == 0 && (i + 1)<=this.state.cateData.length){
                let data1 = (i <= this.state.cateData.length-1) ? this.state.cateData[i]:undefined;
                let data2 = ((i + 1) <= this.state.cateData.length-1) ? this.state.cateData[i+1]:undefined;
                let row = (
                    <View style={styles.row} key={i + 1}>
                        {/*<Text>hello</Text>*/}
    
                        <CateItem data={data1}
                                    viewColor= {colorArr[i%4]}
                                    press={this.press.bind(this, this.state.cateData[i]) }
        
                        >
        
                        </CateItem>
        
                        <CateItem data={data2}
                                    viewColor={colorArr[(i+1)%4]}
                                    press={this.press.bind(this, this.state.cateData[i+1]) }
        
                        >
                        </CateItem>
                    </View>
                );
                listCate.push(row);
            }
        }

        

        return (
            <View style={styles.container}>
             
                {/*导航*/}
                {this.renderNavBar()}
                <ScrollView>
                     {listCate}
                   
                </ScrollView>
            </View>
        );
    }
}
   

press(data){
    
    const { navigate } = this.props.navigation;
    navigate('ChannelDetail',data);

}

retry() {
    this.setState({
        error: false,
        pageLoading: true,
    });
    this.loadDataFromNet();
}


    // 导航条
    renderNavBar(){
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity  style={styles.leftViewStyle} onPress={
                    ()=>{
                        YSNativeModule.goToSearch();
                    }
                }>
                    <Image source={{uri: 'nav_search'}} style={styles.navImageStyle}/>
                </TouchableOpacity>
                <View style={styles.txtStyle}>
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>频道</Text>
                </View>

                <TouchableOpacity onPress={()=>{DeviceEventEmitter.emit('goToMe', 'me');}} style={styles.rightViewStyle}>
                    <Image source={{uri:'nav_record'}} style={styles.navImageStyle}/>
                </TouchableOpacity>

               
            </View>
        )
    }

    loadDataFromNet(){

        request.get(config.api.base + 'seaapi/v1.Channel/getChannels',{

        }).then(
        (responseData)=>{

                let jsonData = responseData['data']['list'];
               
                let cateData = [];

                cateData = jsonData.map(data => {
                    let dic={};
                    dic['typeid'] = data['tid'];
                    dic['name'] = data['tname'];
                    dic['total'] = data['total'];
                    return dic;
                })

                this.setState(
                    {
                        pageLoading: false,
                        cateData:cateData,
                       
                    }
                );
                
            }
        ).catch(
            (err) => {
                if(err)
                {
                    this.setState(
                        {
                            error:true
                        }
                    );
                    
                }
               
            }
        )
    }

    componentWillMount(){
        Orientation.lockToPortrait();
    }
    
    componentDidMount(){
        
       this.loadDataFromNet();
        
    }
}


class CateItem extends Component{
    constructor(props) {
        super(props);
        console.log('cateitem init');
        console.log(props);

    }
    
    render() {
       
           if(this.props.data){
            return (
                <TouchableOpacity onPress={this.props.press}>
                    <View  style={[styles.cateItem, {backgroundColor:this.props.viewColor}]}>

                            <Image    style={{position:'absolute',left:0,top:0,width:imgW, height:imgH}}>
                            
                            </Image>

                            <View style={styles.item}>
                                <Text  style={{color:'white',fontSize:30,backgroundColor: 'transparent'}}>{this.props.data.name}</Text>
                                <View style={{marginTop: 5,alignItems:'center'}}>
                                    <Text  style={{color:'white',fontSize:12,backgroundColor: 'transparent',}}>{this.props.data.total}</Text>
                                </View>
                            </View>
                    </View>
                </TouchableOpacity>
            );
           }else{
               return <View/>
           }
        


    }
}

class HotItem extends Component {
    constructor(props) {
        super(props);
        console.log('hotItem init');
        console.log('pic:',this.props.data.pic);
    }
    render() {
        return (
            <View style={styles.hotItem}>
                <TouchableOpacity onPress={this.props.press}>

                    <Image  source={{uri: this.props.data.pic}} resizeMode='contain' style={{width:hotW, height:hotH}}>

                    </Image>

                    <View style={{marginTop: 5,alignItems:'center'}}>
                        <Text  style={{color:'rgba(38,38,38,1.0)',fontSize:14}}>{this.props.data.name}</Text>
                    </View>
                </TouchableOpacity>


            </View>



        );
    }

}

// { lulu_category: { move_id: 1, tv_id: 2, comic_id: 3, arts_id: 4 },
//     category_bg:
//     { move_bg: 'http://s.qw.cc/mobile/ui/lulu/move_bg.jpg',
//         tv_bg: 'http://s.qw.cc/mobile/ui/lulu/tv_bg.jpg',
//         arts_bg: 'http://s.qw.cc/mobile/ui/lulu/arts_bg.jpg',
//         comic_bg: 'http://s.qw.cc/mobile/ui/lulu/comic_bg.jpg' },
//     channel_total:
//     { move_total: 14182,
//         tv_total: 8513,
//         comic_total: 9353,
//         arts_total: 7028 },
//     hot_channel:
//         [ { id: '17',
//             name: '欧美剧',
//             pid: '2',
//             pic: 'http://s.qw.cc/mobile/ui/lulu/17.jpg' },




const styles = StyleSheet.create({
    iconStyle:{
        width: Platform.OS === 'ios' ? 30 : 25,
        height:Platform.OS === 'ios' ? 30 : 25
    },

    selectedTitleStyle:{
        color:'orange'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    cateItem:{
        width:width/2.0,
        height: imgH,
    },

    item: {
        flex: 1,
        height: imgH,
        alignItems:'center',
        justifyContent:'center',
    },

    hotItem:{
        flex: 1,
        height:70,
        alignItems:'center',
        justifyContent:'center',
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
    topStyle:{
        height:10,
        backgroundColor:'rgba(237,237,237,1.0)'
    },
});
