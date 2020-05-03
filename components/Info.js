import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Share,
  Alert,
} from 'react-native';
import Menu from '../assets/menu.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyProfilePic from '../assets/abdul-ghani.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {version} from '../package.json';
import Axios from 'axios';

const Info = ({navigation}) => {
  const [latestVersion, setLatestVersion] = useState('');
  const [showUpdateAlertBox, setShowUpdateAlertBox] = useState(false);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Download The Corona App now to get latest updates on Covid-19',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const checkAppUpdates = () => {
    Axios.get(
      'https://raw.githubusercontent.com/abdulghanitech/theCoronaApp/master/package.json',
    ).then((res) => {
      if (res.status === 200) {
        console.log('got version info from server!');
        console.log(res.data.version);
        setLatestVersion(res.data.version);
        if (res.data.version > '0.9.8') {
          //new update available
          Alert.alert(
            "There's an update available",
            'Want to update the app now?',
            [
              {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed'),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          setShowUpdateAlertBox(true);
        }
      }
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Menu
            style={styles.headerIcons}
            onPress={() => navigation.openDrawer()}
          />
          <Ionicons
            name="ios-information-circle-outline"
            size={30}
            style={{...styles.headerIcons, color: '#FFF', marginTop: -10}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={MyProfilePic}
            style={{width: 120, height: 120, borderRadius: 120 / 2}}
          />
          <Text style={styles.h2}>Abdul Ghani</Text>
          <Text style={styles.para}>Full Stack Developer</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="twitter"
          size={30}
          style={{padding: 10}}
          onPress={() => Linking.openURL('https://twitter.com/abdulghanitech')}
        />
        <MaterialCommunityIcons
          name="github-circle"
          size={30}
          style={{padding: 10}}
          onPress={() => Linking.openURL('https://github.com/abdulghanitech')}
        />
        <MaterialCommunityIcons
          name="linkedin-box"
          size={30}
          style={{padding: 10}}
          onPress={() =>
            Linking.openURL('https://linkedin.com/in/abdulghanitech')
          }
        />
        <MaterialCommunityIcons
          name="instagram"
          size={30}
          style={{padding: 10}}
          onPress={() =>
            Linking.openURL('https://instagram.com/abdulghani.tech')
          }
        />
        <MaterialCommunityIcons
          name="web"
          size={30}
          style={{padding: 10}}
          onPress={() => Linking.openURL('https://abdulghani.tech')}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.callBtn} onPress={onShare}>
          <Text style={styles.btnText}>
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              style={{marginEnd: 10}}
            />
            &nbsp; Share App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.callBtn, backgroundColor: '#999FBF'}}
          onPress={checkAppUpdates}>
          <Text style={styles.btnText}>
            <MaterialCommunityIcons
              name="update"
              size={20}
              style={{marginEnd: 10}}
            />
            &nbsp; Check updates
          </Text>
        </TouchableOpacity>

        <Text style={{marginTop: 20}}>App Version: {version}</Text>
        <Text onPress={() => Linking.openURL('https://covid19india.org')}>
          Source: covid19india.org
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingBottom: 30,
    flex: 0.4,
    backgroundColor: '#473F97',
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  preventionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    marginHorizontal: 24,
    fontSize: 24,
    color: '#FFF',
    marginTop: 40,
    fontWeight: '600',
  },
  h2: {
    marginHorizontal: 24,
    fontSize: 20,
    color: '#FFF',
    marginTop: 40,
  },
  para: {
    marginHorizontal: 24,
    fontSize: 14,
    color: '#FFF',
    marginTop: 12,
    opacity: 0.8,
  },
  headerIcons: {
    marginHorizontal: 24,
  },
  callBtn: {
    backgroundColor: '#4D79FF',
    width: 180,
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  phone: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Info;
