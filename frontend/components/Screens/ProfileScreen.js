import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { userRef } from '../../database/firebase-auth';
import { getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const setup = async () => {
      const docSnapshot = await getDoc(userRef);
      const data = docSnapshot.data();
      setName(data?.name || '');
      setEmail(data?.email || '');
    };
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} // Placeholder image URL
          style={styles.profileImage}
          resizeMode="cover" // Adjusted resizeMode to 'cover'
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 20,
    paddingTop: 20, // Adjusted paddingTop to move content up
  },
  imageContainer: {
    overflow: 'hidden', // Hide any overflow from the Image
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E0E0E0', // Light gray background for placeholder
  },
  cardContainer: {
    backgroundColor: '#F3E5F5', // Light purple background for the card
    padding: 40,
    borderRadius: 20,
    elevation: 5, // Add some shadow to give a card-like appearance
    width: '100%', // Take the full width
    alignItems: 'center', // Center text horizontally
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7E57C2', // Purple color
    marginBottom: 10,
  },
  email: {
    fontSize: 20,
    color: '#7E57C2', // Purple color
  },
});

export default ProfileScreen;
