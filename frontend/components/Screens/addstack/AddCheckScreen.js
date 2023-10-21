import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomButton from '../../CustomButton';

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
        <View style={styles.container}>
            <Image source={{ uri: photoUri }} style={styles.image} />
            <View style={{alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                <CustomButton label="Retake" onPress={goBack} style={styles.button} />
                <CustomButton label="Add Friends" onPress={addFriends} style={styles.button} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
    },
    image: {
        flex: 1,
        margin: 40,
        marginTop: 70,
    },
    button: {
        width: 100,
        height: 50,
    }
});
export default CheckScreen;
