/**
 * Created by yangang on 17/3/14.
 */
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
    TouchableOpacity,
    ListView,
    Dimensions,
    ActivityIndicator,
    FlatList,
} from 'react-native';

var {width} = Dimensions.get('window');
import request from '../Common/request';
import config from '../Common/config';
import VideoDetail from '../VideoDetail/VideoDetail'
import LoadImage from '../Until/LoadImage';
import RetryView from '../Widget/RetryView';
import LoadingView from '../Widget/LoadingView';
import  Orientation from 'react-native-orientation';

var cols = 3;
var space = 8;
var imgW = (width - (cols + 1) * space)/cols;
var imgH =  (152.0/114.0 )*imgW;
var cellW = imgW;
var cellH = imgH + 44;

export default class ChannelDetail extends Component{
    constructor(props){
        super(props);

        this.cachedResults = {
            nextPage:1,
            items:[],
            total:0,
        }

        this.state = {
            error:false,
            pageLoading:true,
            cateid:this.props.id,
            isLoading:false,
            data:[],

        };
        this.renderCell = this.renderCell.bind(this);
        this.renderFooter = this.renderFooter.bind(this);

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
            return (
                <View style={styles.container}>

                    {this.renderNavBar()}
                    
                

                    <FlatList style={{flex: 1}}
                        onEndReached = {this.loadMoreData}
                        onEndReachedThreshold = {20}
                        ListFooterComponent={this.renderFooter}
                        numColumns={3}
                        data={this.state.data}
                        renderItem={this.renderCell}
                        keyExtractor={(item, index) => {
                            return index
                        }}
                        />

                </View>
            );
    }

    renderNavBar(){
        return(
            <View style={styles.navOutViewStyle}>
              
              <TouchableOpacity  style={styles.leftViewStyle}  onPress={()=>{
                    this.props.navigation.goBack()}}>
                    <Image source={{uri: 'nav_goback'}} style={styles.navImageStyle}/>
                </TouchableOpacity>

                <View style={styles.txtStyle}>
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>频道详情</Text>
                </View>

             
            </View>
        )
    }

    renderCell(rowdata){
        
        return(
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                const { navigate } = this.props.navigation;
                navigate('VideoDetail',rowdata.item);
            } }>
                <View style={styles.cellStyle}>
               
                    <Image source={{uri:rowdata.item.litpic}} loadingIndicatorSource ={{uri:'common_loading'}} style = {{width:imgW,height:imgH}} />
                    <View style={styles.titleStyle}>
                        <Text style={{fontSize:12,color:'#ffffff'}}>8.0  </Text>
                    </View>
                    <View style={styles.bottomViewStyle}>
                        <Text style={{fontSize:13,textAlign: 'center',color:'#262626'}} numberOfLines={2}>{rowdata.item.title}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        );
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
        console.log('total:',this.cachedResults.total);
        console.log('count:',this.cachedResults.items.length);
        console.log("boolVar:",this.cachedResults.items.length !== this.cachedResults.total);
        console.log("boolVar:",this.hasMore());
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

    loadDataFromNet(page){
        
        const { params } = this.props.navigation.state;
        request.post(config.api.base + 'ysapi/v1/rank/getrank',{
            typeid:params.typeid,
            page:this.cachedResults.nextPage,
            pageSize:12,
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
                    error: true,
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
            data:this.cachedResults.items,
            isRefreshing:false
        });

        // console.log(headerArr, listDataArr);
    }


    componentWillMount(){
        Orientation.lockToPortrait();
    }

    componentDidMount(){
        this.loadDataFromNet(1);
    }

}
// class Item extends Component {
//     constructor(props) {
//         super(props);
//         console.log('item init');
//
//     }
//
//     render(){
//         console.log('selectd:',this.props.selected);
//         let txtStyle = this.props.selected ? {color:'rgba(0,174,84,1)'}:{color:'rbga(38,38,38,1)'}
//         return(
//             <TouchableOpacity activeOpacity={1}  onPress={this.props.press}>
//                 <View style={styles.itemStyle}>
//                     <Text style={txtStyle}>
//                         {this.props.name}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }
//
//     componentWillReceiveProps(){
//
//         let txtStyle = this.props.selected ? {color:'rgba(0,174,84,1)'}:{color:'rbga(38,38,38,1)'}
//         return(
//             <TouchableOpacity activeOpacity={1}  onPress={this.props.press}>
//                 <View style={styles.itemStyle}>
//                     <Text style={txtStyle}>
//                         {this.props.name}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }
//
//
//
// }

const Item = ({selected, press, name}) => {
    return (
        <TouchableOpacity onPress={press} style={styles.itemStyle}>
            <Text style={{color:selected ?  'rgb(0, 174, 84)' : 'rgb(38, 38, 38)'}}>{name}</Text>
        </TouchableOpacity>
    )
}





const styles = StyleSheet.create({

    container:{
        flex:1,
    },

    itemStyle:{
        marginLeft:14
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

    loadingMore:{
        alignItems:'center',
        marginVertical:21
    },
    loadingText:{
        fontSize:13,
        color:'gray',
        textAlign:'center'
    },

    cellStyle:{

        width:cellW,
        height:cellH,
        marginLeft:space,
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





});


