import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LogInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogin = () => {
        // handle login logic here
    };

    const handleGoogleLogin = () => {
        // handle Google login logic here
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Username:</Text>
            <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={handleUsernameChange}
            />
            <Text>Password:</Text>
            <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin}>
                <Text>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LogInScreen;
