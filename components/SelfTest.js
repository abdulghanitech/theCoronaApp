import React from 'react';
import {WebView} from 'react-native-webview';

const SelfTest = ({navigation}) => {
  return <WebView source={{uri: 'https://aimsindia.com/covid/'}} />;
};
export default SelfTest;
