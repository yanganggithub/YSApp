import React, {Component} from 'react';
import {
 
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
} from 'react-native';

export default class LoadImage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        loadNum:0,
	    };
	}

	//加载开始时调用
	_onLoadStart = ()=>{
	    console.log('onLoadStart')
	}
	//加载成功完成时调用此回调函数
	_onLoad = ()=>{
	    console.log('onLoad');
	}
	//加载结束后，不论成功还是失败，调用此回调函数
	_onLoadEnd = ()=>{
	    console.log('onLoadEnd');
	}
	//[ios]当加载错误的时候调用此回调函数，参数为{nativeEvent: {error}}
	onError(e){
	    console.log('onError='+e.nativeEvent.error);
	}
	//[ios]在加载过程中不断调用，参数为{nativeEvent: {loaded, total}}
	onProgress(e){
	    console.log('onProgress= 当前='+e.nativeEvent.loaded+' ＋总数='+e.nativeEvent.total);
	    console.log('进度='+Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total));
	    this.setState({
	    	loadNum:Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total),
	    });
	}
	render() {
		console.log(this.props.url);
		return (
		    <View >
                <Image
                    onLoadStart={this.onLoadStart}
                    onLoad={this._onLoad}
                    onLoadEnd={this.onLoadEnd}
                    onError={e=>this.onError(e)}
                    onProgress={e=>this.onProgress(e)}
                    style={{width:this.props.imgWidth,height:this.props.imgHeight}}
                    source={{
                        uri: this.props.url,
                  
                    }}>
                 
                
                </Image>  

                {this.state.loadNum == 100 
                        ?
                        null
                        :
                        <View style={{width:this.props.imgWidth,height:this.props.imgHeight,position:'absolute',alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator/>
                        </View>
                } 

           
		    </View>
		);
	}
}

const styles = StyleSheet.create({
    
   
  });
  