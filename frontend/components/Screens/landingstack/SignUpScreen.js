import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        // handle sign up logic here
    };

    const handleGoogleSignUp = () => {
        // handle sign up with Google logic here
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sign Up</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={handleSignUp}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoogleSignUp}>
                <Text>Sign Up with Google</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;
