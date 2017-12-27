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
    TouchableOpacity
} from 'react-native';

import Dimensions from'Dimensions';
import CateView from'./CateView.js'

var {width} = Dimensions.get('window');




export default class AdHeader extends Component{


    static defaultProps ={
        duration:3000

    };

    constructor(props){
        super(props);
        this.state = {
          // 当前的页码
           currentPage: 0,
           // 标题
           title: this.props.imageDataArr[0].name
        };
    }

    render(){


       return(
          <View style={styles.container}>

              <ScrollView
                 ref="scrollView"
                 horizontal={true}
                 // 隐藏水平滚动条
                 showsHorizontalScrollIndicator={false}

                  // 自动分页
                 pagingEnabled={true}

                 onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}

                  // 开始拖拽
                 onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                  // 停止拖拽
                 onScrollEndDrag={this.onScrollEndDrag.bind(this)}



             >

                  {this.renderAllImage()}
             </ScrollView>

              {/*返回指示器*/}
              <View style={styles.pageViewStyle}>
                  {/*返回对应的标题*/}
                  <Text style={{color:'white', marginLeft:7}}>{this.state.title}</Text>
                  {/*返回5个圆点*/}
                  <View style={{flexDirection:"row",marginRight:7}}>
                      {this.renderPageCircle()}
                  </View>

              </View>
              <CateView/>




           
          </View>
       );
    }




    // 返回所有的图片
    renderAllImage(){

        // 数组
        var allImage = [];
        // 拿到图像数组
        var imgsArr = this.props.imageDataArr;

        // 遍历
        for(var i=0; i<imgsArr.length; i++){
            // 取出单独的每一个对象
            var imgItem = imgsArr[i];
            // debugger;
            // 创建组件装入数组
            allImage.push(
                <TouchableOpacity key={i} activeOpacity={1} onPress={()=>{
                    console.log(this);
                    const { navigate } = this.props.navigation;
                    navigate('VideoDetail',imgItem);
                } }>
                    <Image key={i} source={{uri:imgItem.litpic}} style={{width:width, height:140}}/>
                </TouchableOpacity>
            );
        }
        // 返回数组
        return allImage;
    }

    // 调用开始拖拽
    onScrollBeginDrag(){
       // 停止定时器
        this.interval && clearInterval(this.interval);
    }

    // 调用停止拖拽
   onScrollEndDrag(){
     // 开启定时器
     this.startTimer();
   }

    // 实现一些复杂的操作
    componentDidMount(){
       // 开启定时器
       this.startTimer();
    }

    // 开启定时器
    startTimer(){
         // 1. 拿到scrollView
        var scrollView = this.refs.scrollView;
        var imgCount = this.props.imageDataArr.length;

         // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.interval = setInterval(()=>{
            // 2.1 设置圆点
            var activePage = 0;
            // 2.2 判断
            if((this.state.currentPage+1) >= imgCount){ // 越界
               activePage = 0;
            }else{
               activePage = this.state.currentPage+1;
            }

            // 2.3 更新状态机
            this.setState({
              currentPage: activePage
            });

            // 2.4 让scrollView滚动起来
            var offsetX = activePage * width;
            scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});

         }, this.props.duration);

    }

    componentWillUnmount() {

        this.interval && clearInterval(this.interval);

    }


   // 返回所有的圆点
   renderPageCircle(){
       // 定义一个数组放置所有的圆点
       var indicatorArr = [];
       var style;
       // 拿到图像数组
       var imgsArr = this.props.imageDataArr;
       // 遍历
       for(var i=0; i<imgsArr.length; i++){

          // 判断
          style = (i==this.state.currentPage) ? {color:'orange'} : {color:'#ffffff'};

         // 把圆点装入数组
         indicatorArr.push(
             <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
         );
       }
       // 返回
       return indicatorArr;
   }

   //  当一帧滚动结束的时候调用
   onAnimationEnd(e){
      // 1.求出水平方向的偏移量
      var offSetX = e.nativeEvent.contentOffset.x;

      // 2.求出当前的页数
      var currentPage = Math.floor(offSetX / width);
      // console.log(currentPage);

      // 3.更新状态机,重新绘制UI
      this.setState({
        // 当前的页码
        currentPage: currentPage,
        // 标题
        title: this.props.imageDataArr[currentPage].name
      });
   }

};


const styles = StyleSheet.create({
  container:{
      // marginTop:25

  },

  pageViewStyle:{
      width:width,
      height:25,
      backgroundColor:'rgba(0,0,0,0.4)',

      // 定位
      position:'absolute',
      bottom:80,

      // 设置主轴的方向
      flexDirection:'row',
      // 设置侧轴方向的对齐方式
      alignItems:'center',
      // 设置主轴的对齐方式
      justifyContent:'space-between'
  }
});
  




