import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import AddStack from './addstack/AddStack';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavScreen = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                headerShown: false, // Hide the header for all screens within the tab navigator
              }}>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Add" component={AddStack} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainNavScreen;
