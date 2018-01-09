/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 /**-------导入外部的组件类---------**/
import Main from './Component/Main/Main'
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
import codePush from "react-native-code-push";


  // global.console = {
  //   info: () => {},
  //   log: () => {},
  //   warn: () => {},
  //   error: () => {},
  // };


  import { Provider } from 'react-redux';
  import configureStore from './Component/ReduxSrc/store/ConfigureStore';
  const store = configureStore();

export default class App extends Component<{}> {
  render() {
  //   return (
  //    < Provider store={store}>
  //       <Main navigation = {this.props.navigation}></Main>
  //     </Provider>
  // );
    return (
      <Main navigation = {this.props.navigation}></Main>
    );
  }

  codePushStatusDidChange(status) {
    console.log('status:',status);
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }

  componentDidMount() {
    console.log('组件加载后执行');

    //访问慢,不稳定
    codePush.checkForUpdate().then((update) => {
      if (!update) {
        Alert.alert("提示", "已是最新版本--", [
          {
            text: "Ok", onPress: () => {
            console.log("点了OK");
          }
          }
        ]);
      }
      else {
        codePush.sync({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME });
      }
    });
  }
}



App = codePush(App);

App = StackNavigator({
  Home: { screen: App },
  VideoDetail:{screen:VideoDetail},
  Channel:{screen:Channel},
  ChannelDetail:{screen:ChannelDetail},

},
  {
  headerMode:'none'
}
);

AppRegistry.registerComponent('YSApp', () => App);























