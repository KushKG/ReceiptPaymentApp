import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import AddStack from './addstack/AddStack';
import ProfileScreen from './ProfileScreen';
import CustomTabIcon from '../CustomTabIcon';

const Tab = createBottomTabNavigator();

import ProfileIcon from 'frontend/assets/icons/user.png';
import HomeIcon from 'frontend/assets/icons/home.png';
import AddIcon from 'frontend/assets/icons/add.png';


const MainNavScreen = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false, // Hide the header for all screens within the tab navigator
                    tabBarActiveTintColor: 'purple', // Color of tab when pressed
                }}
                >
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <CustomTabIcon iconSource={HomeIcon} focused={focused} />
                        ),
                    }} />
                <Tab.Screen name="Add" component={AddStack}
                    options={{
                        tabBarLabel: 'Add',
                        tabBarIcon: ({ focused }) => (
                            <CustomTabIcon iconSource={AddIcon} focused={focused} />
                        ),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                      <CustomTabIcon iconSource={ProfileIcon} focused={focused} />
                    ),
                  }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainNavScreen;
