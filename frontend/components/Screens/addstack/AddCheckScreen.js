import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

const CheckScreen = ({ route }) => {
    const { photoUri, navigation } = route.params;

    const goBack = () => {
        navigation.navigate('Add Cam');
    };

    const addFriends = async () => {
        

        //   try {
        //     const response = await axios.post('http://your-flask-backend-url/upload', formData);
        //     console.log(response.data);
        //   } catch (error) {
        //     console.error(error);
        //   }
        navigation.navigate('Add Friends', { photoUri, navigation });

    };

    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={goBack}>
                <Text>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addFriends}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CheckScreen;
