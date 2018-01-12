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
    TouchableOpacity,
    ListView,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';

import Dimensions from'Dimensions';
import request from '../Common/request';
import config from '../Common/config';
import VideoDetail from '../VideoDetail/VideoDetail';
import LoadingView from '../Widget/LoadingView';
import RetryView from '../Widget/RetryView';

var {width,height} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { StackNavigator } from 'react-navigation';





export default class Rank extends Component{
    constructor(props){
        super(props);
    }

    render() {
       
        return (
            <View style={styles.container}>
                {/*导航*/}
                {this.renderNavBar()}
                <ScrollableTabView
                    tabBarUnderlineColor='#FF0000'
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#00ae54'
                    tabBarInactiveTextColor='#262626'
                    tabBarTextStyle={{fontSize: 14}}
                    >
                    <VideoList tabLabel="电影"  type="24" navigation={this.props.navigation}/>
                    <VideoList tabLabel="电视剧" type="21" navigation={this.props.navigation}/>
                    <VideoList tabLabel="综艺" type="23" navigation={this.props.navigation}/>
                    <VideoList tabLabel="动漫" type="25" navigation={this.props.navigation}/>

                </ScrollableTabView>
            </View>

        );
    }

    // 导航条
    renderNavBar(){
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity  style={styles.leftViewStyle}>
                    <Image source={{uri: 'nav_search'}} style={styles.navImageStyle}/>
                </TouchableOpacity>
                <View style={styles.txtStyle}>
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>排行榜</Text>
                </View>

                <TouchableOpacity onPress={()=>{alert('点了!')}} style={styles.rightViewStyle}>
                    <Image source={{uri: 'nav_record'}} style={styles.navImageStyle}/>
                </TouchableOpacity>
            </View>
        )
    }

   
}



class VideoList extends Component {

    constructor(props){
        super(props);

        this.cachedResults = {
            nextPage:1,
            items:[],
            total:0,
        }

        this.state = {
            // cell的数据源
            error:false,
            pageLoading:true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            isLoading:false,
            isRefreshing:false
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
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                onEndReached={this.loadMoreData}
                onEndReachedThreshold={20}
                renderFooter={this.renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}

                    />
                }
            />

        );
    }

    //下拉刷新的回调   从服务器获取最新的数据
    onRefresh=()=>{

        if( this.state.isRefreshing) {
            return
        }

        this.setState({
            isRefreshing:true
        });
        this.loadDataFromNet(1);



    }

    renderFooter=()=>{
        if(!this.hasMore()  && this.cachedResults.total!== 0 ){
            return (<View style={styles.loadingMore}>
                <Text style={styles.loadingText}>没有更多数据啦...</Text>
            </View>);
        }

        if(!this.state.isLoading){
            return <View style={styles.loadingMore}/>
        }

        return (

            <ActivityIndicator
                style={styles.loadingMore}
            />

        );
    }

    //加载更多的数据 上拉加载更多  滑动分页
    loadMoreData=()=>{

        if(!this.hasMore() || this.state.isLoading){
            return
        }

        //去服务器请求加载更多的数据了
        this.cachedResults.nextPage++;
        this.setState({
            isLoading:true
        });

        let page=  this.cachedResults.nextPage;

        this.loadDataFromNet(page);

    }

    hasMore(){
        return this.cachedResults.items.length !== this.cachedResults.total
    }

    retry() {
        this.setState({
            error: false,
            pageLoading: true,
        });
        this.loadDataFromNet(1);
    }

    // 请求网络数据
    componentDidMount(){
        console.log(this.props.type);
        this.loadDataFromNet(1);
    }

    loadDataFromNet(page){

        request.post(config.api.base + 'ysapi/v1.Rank/getRankByid',{
            typeid:this.props.type,
            page:page
        }).then(
            (responseData)=>{
                var jsonData = responseData['data'];
                // 处理网络数据
               this.dealWithData(jsonData,page);
            }
        ).catch(
            (err) => {
               
                    console.log(err);
                    this.cachedResults.nextPage--;
                    this.setState({
                        error:true
                    });
                
                
            }
        )


    }

    // 处理网络数据
    dealWithData(jsonData,page){

        if (page == 1){
            this.cachedResults.items.splice(0,this.cachedResults.items.length);
        }
       let items = this.cachedResults.items.slice();
       items = this.cachedResults.items.concat(jsonData['list']);
       this.cachedResults.items = items;
        this.cachedResults.total = jsonData['count'];
        console.log('itemsCount=',this.cachedResults.items.length);
        // 更新状态机
        this.setState({
            isLoading:false,
            pageLoading:false,
            error:false,
            // cell的数据源
            dataSource: this.state.dataSource.cloneWithRows(this.cachedResults.items),
            isRefreshing:false
        });

        // console.log(headerArr, listDataArr);
    }

    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                {/*const { navigator } = this.props;*/}

                {/*if (navigator) {*/}
                    {/*navigator.push({*/}
                        {/*name: '详情页面',*/}
                        {/*component: VideoDetail,*/}
                        {/*params:rowData*/}
                    {/*})*/}
                {/*}*/}
                const { navigate } = this.props.navigation;

                navigate('VideoDetail',rowData);
            } }>
                <View style={styles.listViewStyle}>
                    {/*左边*/}
                    <Image source={{uri:rowData.litpic}}  loadingIndicatorSource ={{uri:'common_loading'}} style={styles.imageViewStyle} />
                    {/*右边*/}

                    <View style={styles.rightContentStyle}>

                        <View style={styles.rightTopViewStyle}>
                            <Text>{rowData.title}</Text>

                        </View>
                        

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}




const styles = StyleSheet.create({

    loadingMore:{
        marginVertical:25
    },

    container: {
        flex: 1,
    },

    lineStyle:{
      backgroundColor:'#00ae54'
    },

    txtStyle:{
        marginTop:Platform.OS == 'ios' ? 30 : 10
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
    loadingText:{
        fontSize:13,
        color:'gray',
        textAlign:'center'
    },

});





