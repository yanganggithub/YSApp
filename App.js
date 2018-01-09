/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 /**-------导入外部的组件类---------**/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';



import VideoDetail from './Component/VideoDetail/VideoDetail.js';
import Channel from './Component/Channel/Channel.js';
import ChannelDetail from './Component/Channel/ChannelDetail.js';
import { StackNavigator } from 'react-navigation';
import Main from './Component/Main/Main'

  // global.console = {
  //   info: () => {},
  //   log: () => {},
  //   warn: () => {},
  //   error: () => {},
  // };






const App = StackNavigator({
  Home: { screen: Main },
  VideoDetail:{screen:VideoDetail},
  Channel:{screen:Channel},
  ChannelDetail:{screen:ChannelDetail},

},
  {
  headerMode:'none'
}
);

export default App
























