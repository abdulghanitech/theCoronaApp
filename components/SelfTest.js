import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, Platform, ActivityIndicator} from 'react-native';

const ActivityIndicatorLoadingView = () => {
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.ActivityIndicatorStyle}
    />
  );
};

const SelfTest = ({navigation}) => {
  return (
    <WebView
      source={{uri: 'https://aimsindia.com/covid/'}}
      renderLoading={ActivityIndicatorLoadingView}
      startInLoadingState={true}
    />
  );
};

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },

  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SelfTest;
