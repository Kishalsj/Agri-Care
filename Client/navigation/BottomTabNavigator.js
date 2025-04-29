import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListScreen from '../screens/ListScreen';
import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function CustomTabButton({ children, onPress, focused }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 6,
          borderTopWidth: focused ? 2 : 0,
          borderTopColor: focused ? '#000' : 'transparent',
          backgroundColor: '#fff',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

export default function CustomerBottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} focused={props.accessibilityState.selected} />
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <TabBarIcon name='home-outline' color={focused ? '#000' : '#888'} />
              {/* <TabBarLabel focused={focused} name='Home' /> */}
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name='List'
        component={ListScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} focused={props.accessibilityState.selected} />
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <TabBarIcon name='list' color={focused ? '#000' : '#888'} />
              {/* <TabBarLabel focused={focused} name='List' /> */}
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} focused={props.accessibilityState.selected} />
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <TabBarIcon name='person-circle-outline' color={focused ? '#000' : '#888'} />
              {/* <TabBarLabel focused={focused} name='Profile' /> */}
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
