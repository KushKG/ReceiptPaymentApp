import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from './components/Screens/landingstack/LandingScreen';
import SignUpScreen from './components/Screens/landingstack/SignUpScreen';
import LogInScreen from './components/Screens/landingstack/LogInScreen';
import MainNavScreen from './components/Screens/MainNavScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  console.disableYellowBox = true;
  LogBox.ignoreLogs(['Warning: ...']);

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LogIn" screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainNavScreen" component={MainNavScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
