import React from 'react';
import {View, Text, StyleSheet, Image, Linking, Share} from 'react-native';
import Menu from '../assets/menu.svg';
import Bell from '../assets/bell.svg';
import MyProfilePic from '../assets/abdul-ghani.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {version} from '../package.json';

const Info = ({navigation}) => {
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
        <Text style={{fontSize: 25, marginBottom: 20, textAlign: 'center'}}>
          <MaterialCommunityIcons
            name="share-variant"
            size={25}
            style={{paddingHorizontal: 20, marginHorizontal: 20}}
            onPress={onShare}
          />
          Share the app
        </Text>
        <Text>App Version: {version}</Text>
        <Text onPress={() => Linking.openURL('https://covid19india.org')}>
          Check for app updates
        </Text>
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
    backgroundColor: '#FF4D58',
    width: 150,
    borderRadius: 40,
    padding: 10,
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
