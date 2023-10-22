import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import AddStack from './addstack/AddStack';
import ProfileScreen from './ProfileScreen';
import CustomTabIcon from '../CustomTabIcon';

const Tab = createBottomTabNavigator();

import ProfileIcon from 'frontend/assets/icons/user.png';
import HomeIcon from 'frontend/assets/icons/home.png';
import AddIcon from 'frontend/assets/icons/add.png';

const MainNavScreen = ({ navigation }) => {
  useEffect(() => {
    const removeListener = navigation.addListener('beforeRemove', (e) => {
      // Prevent going back
      e.preventDefault();
    });

    return removeListener;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'purple',
      }}
    >
      <Tab.Screen
        name="Receipts"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Receipts',
          tabBarIcon: ({ focused }) => <CustomTabIcon iconSource={HomeIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStack}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ focused }) => <CustomTabIcon iconSource={AddIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <CustomTabIcon iconSource={ProfileIcon} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavScreen;
