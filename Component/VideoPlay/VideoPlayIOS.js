'use strict';
import React, {
    Component
} from 'react';

import {
    AlertIOS,
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
    ProgressViewIOS,
    PanResponder,

} from 'react-native';

import Video from 'react-native-video';


import Dimensions from 'Dimensions';

import request from '../Common/request';
import config from '../Common/config';
import Icon from 'react-native-vector-icons/Ionicons';

const {width,height} = Dimensions.get('window');
// Platform.OS === 'ios' ? <VideoPlayerIos/> : <VideoPlayerAndroid/>


export default class VideoPlayer extends Component {

    constructor(props){
        super(props);

        this.state={
            rowData: this.props.rowData,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            paused: false,

            duration: 0.0,
            currentTime: 0.0,

            videoLoaded:false,
            playing:false,
            initVideo:false,
            initWebView:false,
            progress: 0,
            transform:false,

            realUrl:this.props.play_url

        }

        this._onLoadStart = this._onLoadStart.bind(this);
        this._onLoad = this._onLoad.bind(this);
        this._onProgress = this._onProgress.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onError = this._onError.bind(this);
        this._rePlay = this._rePlay.bind(this);
        this._pause = this._pause.bind(this);
        this._resume = this._resume.bind(this);
        this._pop = this._pop.bind(this);
        this._onPanResponderGrant = this._onPanResponderGrant.bind(this);
        this._onPanResponderMove = this._onPanResponderMove.bind(this);

    }



    _pop(){

        this.props.navigation.goBack();
     

    }

    _resume(){
        if(this.state.paused){
            this.setState({
                paused:false
            });
        }


    }

    _pause(){
        if(!this.state.paused){
            this.setState({
                paused:true
            });
        }
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    _rePlay(){

        this.refs.videoPlayer.seek(0);

    }

    _onPanResponderGrant = (event, gestureState) => {
        console.log('按下');
        let touchPonitX = gestureState.x0;
        let progress;
        if (touchPonitX < 0) progress = 0;
        else {
            if (touchPonitX > height)  progress = 1;
            else progress = touchPonitX  / height;
        }
        this.refs.videoPlayer.seek(progress * this.state.duration);

    }

    _onPanResponderMove = (event, gestureState) => {
        console.log('移动');
        let touchPonitX = gestureState.moveX;
        let progress;

        if (touchPonitX < 0) progress = 0;
        else {
            if (touchPonitX > height) progress = 1;
            else progress = touchPonitX  / height;
        }
        this.refs.videoPlayer.seek(progress * this.state.duration);

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this._onPanResponderGrant,//处理按下的事件
            onPanResponderMove: this._onPanResponderMove,//处理移动的事件
        });
    }



    render() {
        if (!this.state.initVideo && !this.state.initWebView ){
            if (this.state.transform){
                return(
                    <View style={styles.container}>
                        <View style={styles.blackLandsscapeStyle}/>
                    </View>

                );
            }else {
                return(
                    <View style={styles.container}>
                        <View style={styles.blackPortraitStyle}/>
                    </View>

                );
            }


        }

        if (this.state.initVideo)
        {

            let rowData =  this.state.rowData;
            console.log('创建video,视频播放url： ',this.state.realUrl);
            const flexCompleted = this.getCurrentTimePercentage() * 100;
            const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

            return (

                <View style={styles.container}>

                    <View style={styles.videoBox}>

                        <Video
                            ref="videoPlayer"
                            source={{uri: this.state.realUrl}}
                            style={styles.video}
                            rate={this.state.rate}
                            paused={this.state.paused}
                            volume={this.state.volume}
                            muted={this.state.muted}
                            resizeMode={this.state.resizeMode}
                            repeat={true}

                            onLoadStart={this._onLoadStart}
                            onLoad={this._onLoad}
                            onProgress={this._onProgress}
                            onEnd={this._onEnd}
                            onError={this._onError}

                        />

                        {/*加载进度*/}
                        {!this.state.videoLoaded ?
                            <ActivityIndicator color="white" size="large"
                                               style={styles.loading} />
                            :null}


                        {/*重新播放*/}
                        {this.state.videoLoaded && !this.state.playing ?
                            <TouchableOpacity style={styles.btn} onPress={this._rePlay}>
                                <Image style={styles.imgStyle}   source={{uri:'icon_play'}}/>
                            </TouchableOpacity>
                            :null}

                        {/*暂停*/}
                        {this.state.videoLoaded && this.state.playing ?
                            <TouchableOpacity
                                onPress={this._pause}
                                style={styles.pauseArea}
                            >

                                {this.state.paused ?
                                    <TouchableOpacity style={styles.btn} onPress={this._resume} >
                                        <Image style={styles.imgStyle}   source={{uri:'icon_play'}} />
                                    </TouchableOpacity>
                                    :null}


                            </TouchableOpacity>
                            :null}


                        <View style={styles.header}>

                            <TouchableOpacity
                                style={styles.backBox}
                                onPress={this._pop}
                            >

                                <Icon name='ios-arrow-back'
                                      style={styles.backIcon}
                                />

                                <Text style={styles.backText}>返回</Text>

                            </TouchableOpacity>

                            <Text style={styles.headerTitle} numberOfLines={1}>视频详情页面</Text>

                        </View>

                        <View style={styles.progress}>

                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />

                        </View>

                           <View style={styles.touchViewStyle}
                              {...this._panResponder.panHandlers} />


                    </View>

                </View>
            );
        }else if(this.state.initWebView){
            alert('创建webView');

        }
    }


    loadDataFromNet(){
        console.log('开始请求网络');
        const { params } = this.props.navigation.state;
        console.log('视频解析前的地址' + params.play_url);
        request.post(config.api.base + 'play/setAddress/',{
            type:2,
            url:params.play_url,

        }).then(
            (responseData)=>{
                console.log('视频地址解析成功'+ responseData);
                console.log('真实地址'+responseData.data.file);
                console.log('responseData.data.type',responseData.data.play_type);
                if (responseData.data.play_type == 1){
                    this.setState({
                        realUrl:responseData.data.file,
                        initVideo:true
                    });
                }else {
                    this.setState({
                        realUrl:responseData.data.file,
                        initWebView:true
                    });
                }

            }
        ).catch(
            (err) => {
                if (err){
                    alert('视频解析失败');
                    console.log('err:',err);

                    // Orientation.lockToPortrait();
                    // this.props.navigation.goBack();


                }
            }
        )
    }


    _onLoadStart(){
        console.log('_onLoadStart');
    }

    _onLoad(data){
        console.log('_onLoad----视频总长度:'+data.duration);
        // this.setState({duration: data.duration});

        this.setState({duration: data.duration});
    }

    _onProgress(data){
        console.log('_onProgress----数据对象：'+JSON.stringify(data));
        // this.setState({currentTime: data.currentTime});
        console.log('_onProgress----当前时间：'+data.currentTime);

        if(!this.state.videoLoaded){
            this.setState({
                videoLoaded:true,
            });
        }

        if(!this.state.playing){
            this.setState({
                playing:true,
            });
        }

        this.setState({currentTime: data.currentTime});


    }


    _orientationDidChange(orientation) {
     
    }

    componentDidMount(){
        this.loadDataFromNet();
    
    }

    componentWillUnmount(){
       
    }


    _onEnd(){
        console.log('_onEnd');

        this.setState({

                currentTime:this.state.duration,
                playing:false,

            }
        );
    }

    _onError(error){
        console.log('视频url错误：'+JSON.stringify(error));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    videoBox:{
        width:height,
        height:width,
        backgroundColor:'black'
    },
    video:{
        width:height,
        height:width - 10,
        backgroundColor:'black'
    },

    blackPortraitStyle:{
        width:width,
        height:height,
        backgroundColor:'black',

    },

    blackLandsscapeStyle:{
        width:height,
        height:width,
        backgroundColor:'black',
    },
    loading:{
        position:'absolute',
        left:0,
        width:height,
        top:(width - 20)/2.0,
        backgroundColor:'transparent',
        alignSelf:'center',
    },

    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: 'red',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#cccccc',
    },

    btn: {
        justifyContent:'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        position:'absolute',
        top:(width - 30)/2.0,
        left:(height - 30)/2 ,
    },
    imgStyle: {
        width: 30,
        height:30
    },

    pauseArea:{
        position:'absolute',
        top:0,
        left:0,
        width:height,
        height:width - 10,
    },

    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:height,
        height:64,
        paddingLeft:10,
        paddingRight:10,
        position:'absolute',
        backgroundColor:'transparent',
    },

    backBox:{
        position:'absolute',
        left:12,
        top:20,
        width:60,
        flexDirection:'row',
        alignItems:'center',

    },

    backIcon:{
        color:'#999',
        fontSize:22,
        marginRight:5
    },

    backText:{
        color:'#999',
        fontSize:16,
    },

    progressViewStyle: {
        backgroundColor: 'red',
        width: height,
        left: 0,
        top: width - 10,
        position:'absolute',
    },

    touchViewStyle: {
        width: height,
        height: 10,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        top: width - 10,
    },



});