/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HomeScreen from './components/HomeScreen';
import Statistics from './components/Statistics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Info from './components/Info';
import SelfTest from './components/SelfTest';

//const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#FFF',
        activeBackgroundColor: '#4C79FF',
        tabStyle: {height: 70},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-stats" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SelfTest"
        component={SelfTest}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="stethoscope"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-information-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={MyTabs} />
        <Drawer.Screen name="Statistics" component={Statistics} />
        <Drawer.Screen name="SelfTest" component={SelfTest} />
        <Drawer.Screen name="Info" component={Info} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
