import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';

const Tab = createBottomTabNavigator();


function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>      
  );
}

export default BottomNavigation;