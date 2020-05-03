/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Share,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Menu from '../assets/menu.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import AvoidCloseContact from '../assets/closecontact.svg';
import CleanHands from '../assets/cleanhands.svg';
import FaceMask from '../assets/facemask.svg';
import Lady from '../assets/lady.svg';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
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
            onPress={() => navigation.navigate('Info')}
            style={{...styles.headerIcons, color: '#FFF', marginTop: -10}}
          />
        </View>

        <Text style={styles.headerText}>Covid-19</Text>

        <View>
          <Text style={styles.h2}>Are you feeling sick??</Text>
          <Text style={styles.para}>
            If you feel sick with any of covid-19 symptoms please call or
            WhatsApp immediately for help.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
            }}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Linking.openURL(`tel:${1075}`)}>
              <Text style={styles.btnText}>
                <Icon name="phone" size={20} style={{marginEnd: 10}} />
                &nbsp; Call now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.callBtn, backgroundColor: '#4CD97B'}}
              onPress={() =>
                Linking.openURL('https://wa.me/919013151515?text=Hi')
              }>
              <Text style={styles.btnText}>
                <Icon name="whatsapp" size={20} style={{marginEnd: 10}} />
                &nbsp; WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={{fontSize: 20, marginHorizontal: 24, marginVertical: 20}}>
        Prevention
      </Text>
      <View style={styles.preventionContainer}>
        <View>
          <AvoidCloseContact />
          <Text style={{textAlign: 'center', fontSize: 14}}>
            Avoid close {'\n'}contact
          </Text>
        </View>
        <View>
          <CleanHands />
          <Text style={{textAlign: 'center', fontSize: 14}}>
            Clean your {'\n'}hands often
          </Text>
        </View>
        <View>
          <FaceMask />
          <Text style={{textAlign: 'center', fontSize: 14}}>
            Wear a {'\n'}facemask
          </Text>
        </View>
      </View>

      <View style={{flex: 1, marginHorizontal: 24, marginVertical: 40}}>
        <LinearGradient
          angle={268.74}
          useAngle={true}
          colors={['#56549E', '#AEA1E6']}
          style={{borderRadius: 16}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: -10}}>
              <Lady height={110} />
            </View>

            <View>
              <Text style={{...styles.h2, marginTop: 10, fontSize: 18}}>
                Do your own test!
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...styles.para,
                    flexShrink: 1,
                    marginRight: 5,
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  Follow the instructions to {'\n'}do your own test.
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}
        onPress={onShare}>
        <MaterialCommunityIcons
          name="share-variant"
          size={30}
          color="#473F97"
        />
      </TouchableOpacity>
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

export default HomeScreen;
