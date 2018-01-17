/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*@flow*/
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
    Modal,
    TouchableOpacity,
    ScrollView,
    PixelRatio,
    AsyncStorage,
    DeviceEventEmitter,
    TouchableWithoutFeedback,
} from 'react-native';


import request from '../Common/request';
import config from '../Common/config';
import VideoHeader from '../VideoDetail/VideoHeader'
import VideoFooter from '../VideoDetail/VideoFooter'
import LoadingView from "../Widget/LoadingView";
import RetryView from "../Widget/RetryView";
import YSNativeModule from "../Native/YSNativeModule";
import DataBaseNativeModule from '../Native/DataBaseNativeModule';
import {bindActionCreators} from 'redux';
import *as collectionAction from '../ReduxSrc/action/collectionAction';// 导入action方法
import { connect } from 'react-redux'; // 引入connect函数
import ShareBtn from '../Widget/ShareBtn';
import  Orientation from 'react-native-orientation';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Dimensions from'Dimensions';
import { collection, collectionStart } from '../ReduxSrc/action/collectionAction';
var {width,height} = Dimensions.get('window');
var headerHeight;
var scrollGlobalVar = false;


class VideoDetail extends Component{
    constructor(props){
        super(props);
        this.information = {
            id:1,
            name:'',
            pic:'',
            title:'',
        }

        this.state = {
            historyData:null,
            error:false,
            pageLoading:true,
            scrollVar:true,
            headerDataDic:null,
            footerDataDic:null,
            animationType: 'slide',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        };
     
    }


    retry() {
        this.setState({
            error: false,
            pageLoading: true,
        });
        this.loadDataFromNet();
    }


    render() {

        if (this.state.error)
            return (
                <RetryView retryClick={this.retry.bind(this)}/>
            )
        else if (this.state.pageLoading)
            return (
                <View style={styles.container}>
                    {this.renderNavBar()}
                    <LoadingView/>
                </View>
            )
        else
        {

          
            const detailView =  Platform.OS == 'ios' || Platform.OS == 'android'? (<ListView
                ref="listView"
                style={styles.listStyle}
                dataSource={this.state.dataSource}
                bounces={false}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                onScrollEndDrag={(e)=>this.scrollEnd(e)}
            />) :
                (<ScrollView     ref="scrollView" onScroll={(e)=>this.onScroll(e)} onContentSizeChange={(contentWidth,contentHeight)=>this.onContentSize(contentWidth,contentHeight)} scrollEnabled={this.state.scrollVar}>

                    <VideoHeader  headerDataDic={this.state.headerDataDic}
                                onLayout={(event) => {

                                    let viewHeight = event.nativeEvent.layout.height;

                                    if (!viewHeight || headerHeight === viewHeight) {
                                        return;
                                    }
                                    headerHeight = viewHeight;
                                    console.log('onLayout');
                                    console.log('onLayout:headerHeight=',headerHeight);

                                }}
                    >

                    </VideoHeader>

                    <VideoFooter  footerDataDic={this.state.footerDataDic}  style={styles.footerStyle1}>

                    </VideoFooter>


                </ScrollView>)



                let modalBackgroundStyle = {
                backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
            };

            let innerContainerTransparentStyle = this.state.transparent
                ? { backgroundColor: '#fff', padding: 20 }
                : null;

            return (

                <View style={styles.container}>

                
                    {/*导航*/}
                    {this.renderNavBar()}

                    <Modal
                        animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.setModalVisible(false) } }
                        onShow={this.startShow}
                    >
                        <View style={[{
                            flex: 1,
                            justifyContent: 'center',
                            padding: 40,
                        }, modalBackgroundStyle]}>
                            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                                <Text style={styles.date}>2016-08-11</Text>
                                <View style={styles.row}>
                                    <View >
                                        <Text style={styles.station}>长沙站</Text>
                                        <Text style={styles.mp10}>8: 00出发</Text>
                                    </View>
                                    <View>
                                        <View style={styles.at}></View>
                                        <Text style={[styles.mp10, { textAlign: 'center' }]}>G888</Text>
                                    </View>
                                    <View >
                                        <Text style={[styles.station, { textAlign: 'right' }]}>北京站</Text>
                                        <Text style={[styles.mp10, { textAlign: 'right' }]}>18: 00抵达</Text>
                                    </View>
                                </View>
                                <View style={styles.mp10}>
                                    <Text>票价：￥600.00元</Text>
                                    <Text>乘车人：东方耀</Text>
                                    <Text>长沙站 火车南站 网售</Text>
                                </View>
                                <View style={[styles.mp10, styles.btn, { alignItems: 'center' }]}>
                                    <Text style={styles.btn_text}>去支付</Text>
                                </View>
                                <Text
                                    onPress={this.setModalVisible.bind(this,false) }
                                    style={{fontSize:20,marginTop:10}}>
                                    关闭
                                </Text>
                            </View>
                        </View>
                    </Modal>

                    {detailView}


                    {/*<ListView*/}
                        {/*ref="listView"*/}
                        {/*style={styles.listStyle}*/}
                        {/*dataSource={this.state.dataSource}*/}
                        {/*bounces={false}*/}
                        {/*renderRow={this.renderRow.bind(this)}*/}
                        {/*renderHeader={this.renderHeader.bind(this)}*/}
                        {/*onScrollEndDrag={(e)=>this.scrollEnd(e)}*/}
                    {/*/>*/}



                    {/*<ScrollView>*/}

                        {/*<VideoHeader  headerDataDic={this.state.headerDataDic}>*/}

                        {/*</VideoHeader>*/}

                        {/*<VideoFooter style={styles.rowStyle} footerDataDic={this.state.footerDataDic}>*/}

                        {/*</VideoFooter>*/}


                    {/*</ScrollView>*/}
                </View>

            );
        }
    }
    onScroll(e){

        var offSetY = e.nativeEvent.contentOffset.y;
        console.log('offSetY=', offSetY);
        console.log('headerHeight=', headerHeight);
        if (offSetY > headerHeight){
            console.log('更改了状态');
       
        }

    }

    onContentSize(contentWidth,contentHeight){
        console.log('contentHeight=', contentHeight);
    }

    scrollEnd(e){

        var offset =  e.nativeEvent.contentOffset.y;
        console.log("offset=",offset);
        if (offset>=headerHeight){
            console.log("可以滑动了");
            console.log(this.similar);

            if (this.similar)
            {
                this.similar.makeScroll();
            }

            if (this.comment){
                this.comment.makeScroll();
            }

            if(this.series){
                this.series.makeScroll();
            }


        }
    }

    startShow=()=>{

    }

    renderHeader(){
        if (!this.state.headerDataDic) return <View></View>;
        if(this.state.headerDataDic.litpic.indexOf('https://www.guaiguaiyingshi.com') == -1){
            this.state.headerDataDic.litpic = 'https://www.guaiguaiyingshi.com' + this.state.headerDataDic.litpic;
        }
        
        return(
            <View style={styles.headViewStyle}  onLayout={(event) => {

                let viewHeight = event.nativeEvent.layout.height;

                if (!viewHeight || headerHeight === viewHeight) {
                    return;
                }
                headerHeight = viewHeight;
                console.log('onLayout:headerHeight=',headerHeight);

            }}>
                {/*左边*/}
                <Image source={{uri:this.state.headerDataDic.litpic}} style={styles.imageViewStyle}/>
                {/*右边*/}

                <View style={styles.rightContentStyle}>


                    <View style={styles.contentStyle}>
                        <Text style={{color:'white',fontSize:12}}>主演: {this.state.headerDataDic.zhuyan}</Text>

                    </View>
                   

                    <View style={styles.contentStyle}>
                        <Text style={{color:'white',fontSize:12}}>年份: {this.state.headerDataDic.nianfen}</Text>
                    </View>

                   {this.historyData != null ?  <View style = {styles.history}> 
                        <Text style={{color:'white',fontSize:12}}>你上次观看到:  {this.state.historyData.playName}}</Text>
                    </View>  : null}
                  
            
                    <View style={styles.btn}>
                        <TouchableWithoutFeedback onPress={()=>{
                                    
                                    var  jsonString = JSON.stringify(this.state.headerDataDic);
                                    if(this.state.historyData ==null)
                                    {
                                        YSNativeModule.rnCallNative("com.ysapp.ui.video.VideoActivity",this.state.headerDataDic.vod_url_list[0].list[0].play_url,"电影观看",jsonString ,0,0,0);

                                    }else{
                                        YSNativeModule.rnCallNative("com.ysapp.ui.video.VideoActivity",this.state.headerDataDic.vod_url_list[0].list[0].play_url,this.state.historyData.playName,jsonString ,this.state.historyData.originIndex,this.state.historyData.playIndex,this.state.historyData.playTime);
                                    }
                                    
                                } }>
                                <Text style={styles.btn_text}>播放</Text>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </View>

        );
    }

    originAction(visible){
        this.setState({ modalVisible: visible });

    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }


    renderRow(rowData){
        console.log('rowData:',rowData);
        let description='';
        if(this.state.headerDataDic.juqing)
        {
            description = this.state.headerDataDic.juqing;
        }else if(this.state.headerDataDic.plot)
        {
            description = this.state.headerDataDic.plot;
        }
        return (
        <View style={{padding:10}}>
            <ScrollView >
                <Text style={{fontSize:16,color:'#262626'}}>{description}</Text>
            </ScrollView>

        </View>)
    }

    componentWillMount(){
        Orientation.lockToPortrait();
    }

    // 请求网络数据
    componentDidMount(){
        let params;
    
        if(this.props.bundle){
          
            params = {'id':this.props.bundle.id};
            
        }else{
         
            params= this.props.navigation.state.params;
 
        }

        YSNativeModule.getHistoryById(params.id);
       
        //监听ReceiveData的事件接受数据
        DeviceEventEmitter.addListener('ReceiveDataById', (getHistory)=> {    
            
            var obj = JSON.parse(getHistory);
            
            if(obj!=null)
            {
                this.setState(
                    {
                        historyData:obj
                    }
                );
            }
          
        });   

        this.loadDataFromNet();
    }

    loadDataFromNet(){
        let params;
        if(this.props.bundle){
            params = {'id':this.props.bundle.id};
            
        }else{
            params= this.props.navigation.state.params;
        }
        
        if(params){
            request.get(config.api.base + 'ysapi/v1.Play/getPlayData',{
                'id':params.id,
           }).then(
               (responseData)=>{
                   console.log(responseData);
                   console.log();
                   DataBaseNativeModule.getFavouriteById(responseData['data']['id'],(success)=>{
                       this.props.signCollection();
                       this.information.pic = responseData['data']['pic'];
                       this.information.name = responseData['data']['name'];
                       this.information.title = responseData['data']['gold'];
                       // 处理网络数据
                       this.dealWithData(responseData);
                   },(error)=>{
                       this.props.unSignCollection();
                       this.information.pic = responseData['data']['pic'];
                       this.information.name = responseData['data']['name'];
                       this.information.title = responseData['data']['gold'];
                       // 处理网络数据
                       this.dealWithData(responseData);
                   });
                
   
                   //
               }
           ).catch(
               (err) => {
                  this.setState(
                      {
                          error:true
                      }
                  )
               }
           )
        }
       
    }


    dealWithData(responseData) {
        var jsonData = responseData['data'];
        var listDataArr = [];
        listDataArr.push(jsonData);
        this.setState(
            {
                pageLoading:false,
                footerDataDic:jsonData,
                headerDataDic:jsonData,
                dataSource :this.state.dataSource.cloneWithRows(listDataArr)


            }
        );
    }

    // 导航条
    renderNavBar(){
        // alert(JSON.stringify(this.state.headerDataDic));
        let title = '';
        let titleUrl = '';
        let text = '';
        let imgPath = '';
        let url = '';
        let comment = '';
       if(this.state.headerDataDic)
       {
          title = this.state.headerDataDic.title;
          titleUrl = 'www.guaiguaiyingshi.com';
          text = '我正在看这部';
          imgPath =  this.state.headerDataDic.litpic.indexOf('https://www.guaiguaiyingshi.com') == -1? 'https://www.guaiguaiyingshi.com' + this.state.headerDataDic.litpic : this.state.headerDataDic.litpic;
          url='www.guaiguaiyingshi.com';
          comment = '感觉不错';
       }
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity  style={styles.leftViewStyle}  onPress={()=>{
                    if(this.props.navigation)
                    {
                        this.props.navigation.goBack()
                    }else{
                        YSNativeModule.goBack();
                    }
                    }}>
                    <Image source={{uri: 'nav_goback'}} style={styles.navImageStyle}/>
                </TouchableOpacity>
                <View style={styles.txtStyle}>
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>咕噜影院</Text>
                </View>

                <TouchableOpacity onPress={()=>{this.props.collectionStart(JSON.stringify(this.state.headerDataDic),this.state.headerDataDic['id'])}} style={styles.collectionViewStyle}>
                    <Image source={{uri:this.props.isSign ?'nav_collection_current' : 'nav_collection'}} style={styles.navImageStyle}/>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.rightViewStyle}>
                    <ShareBtn style={styles.navImageStyle}  
                    title = {title} 
                    titleUrl={titleUrl} 
                    text={text} 
                    imgPath={imgPath } 
                    url={url}
                    comment={comment} />
                </TouchableOpacity>
            </View>
        )
    }

    // 生成随机ID：GUID 全局唯一标识符（GUID，Globally Unique Identifier）是一种由算法生成的二进制长度为128位的数字标识符
    // GUID生成的代码来自于Stoyan Stefanov

    genId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }
}




  
// const mapToDispatchToProps = dispatch =>({
//     collectionStart:bindActionCreators(collectionAction.collectionStart,dispatch),
//     });


export default connect(
    state =>({
        isSign: state.collection.isSign,
        }),
         (dispatch) => ({
            collectionStart: (favourite,id) => dispatch(collectionAction.collectionStart(favourite,id)),
            signCollection:()=>dispatch(collectionAction.signCollection()),
            unSignCollection:()=>dispatch(collectionAction.unSignCollection()),
        })

  )(VideoDetail)

//相似
class SimilarList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            // cell的数据源
            scrollVar:false,
            dataSource: ds.cloneWithRows(this.props.data)

        }
        this.renderSimilarRow= this.renderSimilarRow.bind(this);

    }

    makeScroll(){
        scrollGlobalVar = true;
        this.setState({
            scrollVar:scrollGlobalVar
        });
    }

    unEnabledScroll(){
        scrollGlobalVar = false;
        this.setState({
            scrollVar:scrollGlobalVar
        });
    }

    render(){
        return(
            <ListView
                ref="listView"
                dataSource={this.state.dataSource}
                renderRow={this.renderSimilarRow}
                onScrollEndDrag={(e)=>this.scrollEnd(e)}
                    scrollEnabled={scrollGlobalVar}
            />
        )
    }

    scrollEnd(e){

        var offset =  e.nativeEvent.contentOffset.y;

        if (offset<=0){


           this.unEnabledScroll();
        }else {
            this.makeScroll();
        }

    }

    renderSimilarRow(rowData){

        return(
            <TouchableOpacity onPress={()=>{
                const { navigator } = this.props;

                if (navigator) {
                    navigator.push({
                        name: '详情页面',
                        component: VideoDetail,
                        params:rowData
                    })
                }
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
                            <Text style={{color:'gray'}}>{rowData.area}</Text>
                        </View>

                        <Text style={{color:'gray'}}>{rowData.actor}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

//评价
class CommentList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            scrollVar:false,
            // cell的数据源
            dataSource: ds.cloneWithRows(this.props.data)

        }
        this.renderCommentRow= this.renderCommentRow.bind(this);

    }

    makeScroll(){
        console.log('视图状态改变');
        scrollGlobalVar = true;
        this.setState({
            scrollVar:scrollGlobalVar
        });
    }

    unEnabledScroll(){
        scrollGlobalVar = false;
        this.setState({
            scrollVar:scrollGlobalVar
        });
    }

    render(){
        return(
            <ListView
                ref="commentListView"
                dataSource={this.state.dataSource}
                renderRow={this.renderCommentRow}
                onScrollEndDrag={(e)=>this.scrollEnd(e)}
                scrollEnabled={scrollGlobalVar}
            />
        )
    }

    scrollEnd(e){

        var offset =  e.nativeEvent.contentOffset.y;

        if (offset<=0){


            this.unEnabledScroll();
        }else {
            this.makeScroll();
        }

    }

    renderCommentRow(rowData){

        return(

            <View style={styles.commentListViewStyle}>

                    {/*显示用户信息*/}
                    <View style={styles.userInfo}>
                           <Text style={{color:'gray'}}>{rowData.username} </Text>
                           <Text style={{color:'gray'}}>{rowData.creat_at} </Text>
                    </View>

                    {/*评论*/}
                    <View style={styles.commentContentStyle}>
                        <Text style={{color:'#262626',fontSize:14}}>{rowData.content} </Text>
                    </View>
            </View>

        )
    }
}

//简介
class BriefList extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <ScrollView >
                <View style={styles.directorStyle}>
                    <Text  style={{color:'gray',fontSize:14}}> 导演: </Text>
                    <Text > {this.props.data.director}</Text>

                </View>
                <View style={styles.actorStyle}>
                    <Text  style={{color:'gray',fontSize:14}}> 主演: </Text>
                    <View style={{width:width - 55}}>
                        <Text > {this.props.data.actor}</Text>
                    </View>
                </View>

                <View style={styles.cateStyle}>
                    <Text  style={{color:'gray' ,fontSize:14}} > 类型: </Text>
                    <Text>{this.props.data.keywords} </Text>
                </View>
                <View style={styles.yearStyle}>
                    <Text  style={{color:'gray',fontSize:14}}> 年份: </Text>
                    <Text> {this.props.data.year}</Text>
                </View>

                <View style={styles.desStyle}>
                    <Text  style={{fontSize:14}}>{this.props.data.content}</Text>
                </View>
            </ScrollView>
        )
    }

}

//连续剧

class SeriesList extends Component {
    constructor(props) {
        super(props);
       
        let dataArr = [];
        let count =  this.props.data.length;
        for (let i in this.props.data) {
            if (i % 4 ===0 ){
                let arr4 =[];
                if(parseInt(i) <= count - 1){
                    data1 = this.props.data[parseInt(i)];
                }
                if(parseInt(i) + 1 <= count - 1){
                    data2 = this.props.data[parseInt(i) + 1];
                }

                if(parseInt(i) + 2 <= count - 1){
                    data3 = this.props.data[parseInt(i) + 2];
                }

                if(parseInt(i) + 3 <= count - 1){
                    data4 =  this.props.data[parseInt(i) + 3];
                }
                arr4.push(data1);
                arr4.push(data2);
                arr4.push(data3);
                arr4.push(data4);
                dataArr.push(arr4);
            }
        }

        this.state = {
            scrollVar:false,
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows(dataArr)
        }
    }

    makeScroll(){
        scrollGlobalVar = true;
        this.setState({
            scrollVar:scrollGlobalVar
        });
    }

    unEnabledScroll(){
        scrollGlobalVar = false;
        this.setState({
            scrollVar:scrollGlobalVar
        });
    }

    render(){
        let list = [];

        let count =  this.props.data.length;
        for (let i in this.props.data) {
           console.log('i:',i);
            if (i % 4 === 0) {
                //两个等号 ：不判断类型
                let string1 = "未知";
                let string2 = "未知";
                let string3 = "未知";
                let string4 = "未知";
                //三个等号：判断类型
               if(parseInt(i) <= count - 1){
                   string1 = this.props.data[parseInt(i)].play_name;
               }
               if(parseInt(i) + 1 <= count - 1){
                  string2 = this.props.data[parseInt(i) + 1].play_name;
               }

                if(parseInt(i) + 2 <= count - 1){
                    string3 = this.props.data[parseInt(i) + 2].play_name;
                }

                if(parseInt(i) + 3 <= count - 1){
                   string4 =  this.props.data[parseInt(i) + 3].play_name;
                }
                let boolVar1 = string1 == "未知" ? false : true;
                let boolVar2 = string2 == "未知" ? false : true;
                let boolVar3 = string3 == "未知" ? false : true;
                let boolVar4 = string4 == "未知" ? false : true;
                console.log('boolVar:',boolVar1);
                let row = (
                    <View style={styles.row} key={i}>

                            <Item play_name={string1}
                                  show={boolVar1}
                                  press={this.press.bind(this, this.props.data[i]) }

                            ></Item>

                        <Item play_name={string2}
                              show={boolVar2}
                              press={this.press.bind(this, this.props.data[i + 1]) }
                        ></Item>

                        <Item play_name={string3}
                              show={boolVar3}
                              press={this.press.bind(this, this.props.data[i + 2]) }
                        ></Item>

                        <Item play_name={string4}
                              show={boolVar4}
                              press={this.press.bind(this, this.props.data[i + 3]) }
                        ></Item>
                    </View>

                );
                list.push(row);

            }
        }
        // return (
        //     <ScrollView style={{ marginTop: 10 }}>
        //         {list}
        //
        //     </ScrollView>
        // );
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />

        );
    }
    renderRow(data){

        let boolVar1 = data[0] ? true : false;
        let boolVar2 = data[1]  ? true : false;
        let boolVar3 = data[2]  ? true : false;
        let boolVar4 = data[3] ? true : false;
        
        let row = (
            <View style={styles.row} >

                <Item play_name={data[0].play_name}
                      show={boolVar1}
                      press={this.press.bind(this, data[0]) }

                ></Item>

                <Item play_name={data[1].play_name}
                      show={boolVar2}
                      press={this.press.bind(this, data[1]) }
                ></Item>

                <Item play_name={data[2].play_name}
                      show={boolVar3}
                      press={this.press.bind(this, data[2]) }
                ></Item>

                <Item play_name={data[3].play_name}
                      show={boolVar4}
                      press={this.press.bind(this, data[3]) }
                ></Item>
            </View>

        );
        return row;
    }


 
}

class Item extends Component {

    static defaultProps = {
        play_name: '默认标题',
        show:true,
    };  // 注意这里有分号
   

    render() {

        if (this.props.show){
            return (
                <View style={styles.item}>
                    <TouchableOpacity onPress={this.props.press}>

                        <Text numberOfLines={1} style={styles.item_text}>{this.props.play_name}</Text>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <View style={styles.item_view}>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'rgba(255,255,255,1)'
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
        left:0,
        bottom:Platform.OS == 'ios' ? 0:0,
        justifyContent:'center',
        alignItems:'center',
        width:44,
        height:44,

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
    collectionViewStyle:{
        position:'absolute',
        right:45,
        bottom:Platform.OS == 'ios' ? 15:13
    },

    txtStyle:{
         marginTop:Platform.OS == 'ios' ? 30 : 10
    },
    lineStyle:{
        backgroundColor:'#00ae54'
    },
    cellStyle:{
        width:width,
        height:height -  Platform.OS == 'ios' ? 64 : 44
    },

    headViewStyle:{
        backgroundColor:'rgba(0,0,0,0.6)',
        padding:14,
        flexDirection:'row'
    },
    imageViewStyle:{
        width:130,
        height:173
    },
    rightContentStyle:{
        marginLeft:14,
        width:width - 130 - 14 * 2 - 14,
    },
    contentStyle:{
        marginTop:3
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

    commentListViewStyle:{
        backgroundColor:'white',
        padding:10,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:0.5,
    },
    userInfo:{
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    commentContentStyle:{
      marginTop:4,
    },

    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },

    history:{
        position:'absolute',
        bottom:50,
        left:0,
    },

    page: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    zhifu: {
        height: 150,
    },

    flex: {
        flex: 1,
    },
    at: {
        borderWidth: 1 / PixelRatio.get(),
        width: 80,
        marginLeft:10,
        marginRight:10,
        borderColor: '#18B7FF',
        height: 1,
        marginTop: 10

    },
    date: {
        textAlign: 'center',
        marginBottom: 5
    },
    station: {
        fontSize: 20
    },
    mp10: {
        marginTop: 5,
    },
    btn: {
        justifyContent:'center',
        marginTop:25,
        width: 80,
        height: 35,
        borderRadius: 3,
        backgroundColor: '#00ae54',
    },
    btn_text: {
        lineHeight: 18,
        textAlign: 'center',
        color: '#fff',
    },

    footerStyle:
    {
        width:width,
        height:height - 64 -64
    },
    directorStyle: {
        marginTop:10,
        paddingLeft:10,
        flexDirection:'row'
    },
    actorStyle:{
        marginTop:4,
        paddingLeft:10,
        flexDirection:'row'
    },
    cateStyle:{
        marginTop:4,
        paddingLeft:10,
        flexDirection:'row'
    },
    yearStyle:{
        marginTop:4,
        paddingLeft:10,
        flexDirection:'row'
    },
    desStyle:{
        padding:10
    },

    contentViewStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 多个cell在同一行显示
        flexWrap:'wrap',
        // 宽度
        width:width,
        alignItems:'flex-start',
    },
    item_view:{
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    item: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop:5,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        height: 30,
        borderRadius:3,
        backgroundColor:'#f9f9f9'
    },
    item_text: {

        color: '#262626',
        height: 20,
        lineHeight: 18,
        textAlign: 'center',
        marginTop: 5,
    },
});


