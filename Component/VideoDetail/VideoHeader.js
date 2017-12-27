/**
 * Created by yangang on 17/2/27.
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
    Navigator,

} from 'react-native';

import Dimensions from'Dimensions';
var {width,height} = Dimensions.get('window');

export default class VideoDetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
        };
    }

    render(){
        if (!this.props.headerDataDic) return <View></View>;
        console.log('返回视图');
        return(
            <View style={styles.headViewStyle} onLayout={this.props.onLayout}>
                {/*左边*/}
                <Image source={{uri:this.props.headerDataDic.pic}} style={styles.imageViewStyle}/>
                {/*右边*/}

                <View style={styles.rightContentStyle}>


                    <View style={styles.contentStyle}>
                        <Text style={{color:'white',fontSize:12}}>类型: {this.props.headerDataDic.keywords}</Text>

                    </View>
                    <View style={styles.contentStyle}>
                        <Text style={{color:'white',fontSize:12}}>地区: {this.props.headerDataDic.area}</Text>
                    </View>

                    <View style={styles.contentStyle}>
                        <Text style={{color:'white',fontSize:12}}>年份: {this.props.headerDataDic.year}</Text>
                    </View>

                    <View style={styles.contentStyle}>
                        <Text style={{color:'white',fontSize:12}} onPress={this.originAction.bind(this)}>来源: {this.props.headerDataDic.vod_url_list[0].origin.name}</Text>
                    </View>


                </View>
            </View>

        );
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    startShow=()=>{
        alert('开始显示了');
    }

    originAction(){

        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };

        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff', padding: 20 }
            : null;

        <View style={{ alignItems: 'center', flex: 1 }}>
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setModalVisible(false) } }
                onShow={this.startShow}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
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

            <Text style={{ fontSize: 30,color:'red' }}  onPress={this.setModalVisible.bind(this, true) }>预定火车票</Text>


        </View>

    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(255,255,255,1)'
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

    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',

        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
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
        width: 60,
        height: 30,
        borderRadius: 3,
        backgroundColor: '#FFBA27',
        padding: 5,
    },
    btn_text: {
        lineHeight: 18,
        textAlign: 'center',
        color: '#fff',
    },

});