/**
 * Created by yangang on 17/2/28.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    PixelRatio,
    Platform,   // 判断当前运行的系统
    ListView,
    TouchableOpacity,
    Navigator,

} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Dimensions from'Dimensions';
var {width,height} = Dimensions.get('window');

export default class VideoDetail extends Component {
    constructor(props) {
        super(props);



    }

    render(){
        if (!this.props.footerDataDic) return <View></View>;
        console.log(this.props.footerDataDic)
        return(
            <View  style={this.props.style}>

                <ScrollableTabView
                    tabBarUnderlineColor='#FF0000'
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#00ae54'
                    tabBarInactiveTextColor='#262626'
                    tabBarTextStyle={{fontSize: 14}}
                >
                    <SimilarList tabLabel="类似" data={this.props.footerDataDic['near_list']} navigator={this.props.navigator}/>
                    <CommentList tabLabel="影评"  data={this.props.footerDataDic['comment_list']} navigator={this.props.navigator}/>
                    <BriefList tabLabel="简介" data={this.props.footerDataDic['content']} navigator={this.props.navigator}/>



                </ScrollableTabView>
            </View>

        );

    }
}

class SimilarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows(this.props.data)
        }


    }
    render(){
        return(

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}

            />

        )
    }

    renderRow(rowData){
        console.log(rowData);
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

class CommentList extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <View>
                <Text>评论</Text>
            </View>
        )
    }
}

class BriefList extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <View>
                <Text>简介</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(255,255,255,1)'
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

    lineStyle:{
        backgroundColor:'#00ae54'
    },

})