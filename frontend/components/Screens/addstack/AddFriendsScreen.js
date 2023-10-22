import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import host from '../../../config'
import { userRef } from '../../../database/firebase-auth';

import CustomButton from '../../CustomButton';


const AddFriendsScreen = ({ route }) => {
  const { photoUri, navigation } = route.params;
  const [searchText, setSearchText] = useState('');
  const [idList, setIdList] = useState([]); // [1, 2, 3
  const [userList, setUserList] = useState([]);
  const [receiptName, setReceiptName] = useState('');

  const addUser = async () => {
    try {
      if (searchText.trim() === '') {
        Alert.alert('Invalid User', 'Please enter a valid username.');
        return;
      }
  
      if (userList.some((user) => user === searchText)) {
        Alert.alert('User Already Added', 'This user is already in the list.');
        return;
      }
      const response = await fetch(host + '/search/' + searchText);
      if (!response.ok) {
        throw new Error('Network request failed');
      }
      const data = await response.json();
      if (data.results.length === 0) {
        Alert.alert('User Not Found', 'Please enter a valid username.');
        return;
      }
      setIdList([...idList, data.results[0].id]);
      setUserList([...userList, data.results[0].name]);
      setSearchText('');
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async () => {
    const formData = new FormData();
    formData.append("image", { uri: photoUri, name: 'test_receipt.jpg', type: 'image/jpg' });
    formData.append("receipt_name", receiptName);
    formData.append("user_list", idList);

    const response = await fetch(host + '/add_receipt/' + userRef.id, {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await response.json();
    console.log(data);

    nextPressed();
  };

  const nextPressed = () => {
    navigation.navigate('Add Split');
  };

  return (
    <View style={styles.container}>
      <View style={styles.receiptNameContainer}>
        <Text style={styles.label}>Receipt Name:</Text>
        <TextInput
          placeholder="Enter receipt name"
          onChangeText={(text) => setReceiptName(text)}
          value={receiptName}
          style={styles.receiptNameInput}
        />
      </View>

      <Text style={styles.title}>Search and Add Users</Text>
      <TextInput
        placeholder="Enter a username"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        style={styles.usernameInput}
      />
      <Button title="Add User" onPress={addUser} />

      <View style={styles.addedUsersContainer}>
        <Text style={styles.addedUsersTitle}>Added Users:</Text>
        {userList.map((user, index) => (
          <Text key={index}>{user}</Text>
        ))}
      </View>

      <View style={styles.nextButtonContainer}>
        <CustomButton label="Next" onPress={uploadData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  receiptNameContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  receiptNameInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  usernameInput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  addedUsersContainer: {
    marginTop: 20,
  },
  addedUsersTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  nextButtonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AddFriendsScreen;