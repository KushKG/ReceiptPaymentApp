import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import LandingScreen from './components/Screens/landingstack/LandingScreen';
import SignUpScreen from './components/Screens/landingstack/SignUpScreen';
import LogInScreen from './components/Screens/landingstack/LogInScreen';
import MainNavScreen from './components/Screens/MainNavScreen';

export default function App() {
  return (
    <MainNavScreen />
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
