import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            console.log(photo.uri);

            // Set the captured photo URI to state
            setCapturedPhotoUri(photo.uri);
            navigation.navigate('Add Check', { photoUri: photo.uri, navigation });
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1, margin: 50 }}>
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={(ref) => setCameraRef(ref)}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={takePicture}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
