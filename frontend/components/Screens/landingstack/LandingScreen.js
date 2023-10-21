
import React from 'react';
import { View, Text, Button } from 'react-native';

const LandingScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                Welcome to Payback!
            </Text>
            <Button title="Login" onPress={() => console.log('Login button pressed')} />
            <Button title="Signup" onPress={() => console.log('Signup button pressed')} />
        </View>
    );
};

export default LandingScreen;

