import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';


const AddFriendsScreen = ({ route }) => {
    const { photoUri, navigation } = route.params;
    const [searchText, setSearchText] = useState('');
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [receiptName, setReceiptName] = useState('');

    const addUser = () => {
        // Basic user validation (check if the username is not empty)
        if (searchText.trim() === '') {
            Alert.alert('Invalid User', 'Please enter a valid username.');
            return;
        }

        // Check if the user is already in the list
        if (userList.some((user) => user === searchText)) {
            Alert.alert('User Already Added', 'This user is already in the list.');
            return;
        }

        setUserList([...userList, searchText]);
        setSearchText('');
    };

    const uploadData = () => {
        // Upload the data to the backend
        // ...
        // ...
    }

    const nextPressed = () => {
        navigation.navigate('Add Split', { photoUri, navigation, userList, receiptName });
    }
    
    return (
        <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
            <Text>Receipt Name:</Text>
            <TextInput
                placeholder="Enter receipt name"
                onChangeText={(text) => setReceiptName(text)}
                value={receiptName}
            />
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Search and Add Users</Text>
            <TextInput
                placeholder="Enter a username"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Button title="Add User" onPress={addUser} />

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Added Users:</Text>
                {userList.map((user, index) => (
                    <Text key={index}>{user}</Text>
                ))}
            </View>

            <TouchableOpacity onPress={nextPressed}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddFriendsScreen;
