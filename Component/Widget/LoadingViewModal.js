/**
 * Created by dxplay120 on 2017/5/25.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
const {width, height} = Dimensions.get('window')
export default class LoadingViewModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {showLoading} = this.props
        return (
            <Modal visible={showLoading} onRequestClose={()=>{}} transparent>
                <View style={ [styles.loadingView, {
                    opacity: 0.4,
                    backgroundColor: 'black'
                }]}></View>
                <View style={ styles.loadingImageView }>
                    <View style={ styles.loadingImage }>
                        {
                            this.props.loadingViewClick ?
                                <TouchableOpacity onPress={ this.props.loadingViewClick }>
                                    <Image style={ styles.loadingImage } source={{uri:'loading_gif'}}/>
                                </TouchableOpacity>
                                :
                                <Image style={ styles.loadingImage } source={{uri:'loading_gif'}}/>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height,
        width,
        position: 'absolute'
    },
    loadingImage: {
        width: 150,
        height: 100,
    },
    loadingImageView: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

// LoadingViewModal.propTypes = {
//     loadingViewClick: React.PropTypes.func, //.isRequired,
//     showLoading: React.PropTypes.bool.isRequired,
//     opacity: React.PropTypes.number,
//     backgroundColor: React.PropTypes.string
// }

