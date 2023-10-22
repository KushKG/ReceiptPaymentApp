import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import host from "../../config";
import { userRef } from '../../database/firebase-auth.js';

import ReceiptDetailScreen from './ReceiptDetailScreen';

const HomeScreen = ({ navigation }) => {
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        const getReceipts = async () => {
            try {
                console.log(userRef.id);
                const response = await fetch(host + '/' + userRef.id);
                const data = await response.json();
                console.log(data);

                setReceipts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getReceipts();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={receipts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ReceiptDetail', { receipt: item, navigation: navigation })}
                        style={styles.receiptContainer}
                    >
                        <Text style={styles.receiptName}>{item.name}</Text>
                        <View style={styles.itemList}>
                            {item.items.map((receiptItem, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <Text style={styles.itemName}>{receiptItem.name}</Text>
                                    <Text style={styles.itemPrice}>${receiptItem.price}</Text>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};



const Stack = createStackNavigator();

const App = () => {
    return (
            <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false, // Hide the header for all screens within the tab navigator
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ReceiptDetail" component={ReceiptDetailScreen} />
            </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    receiptContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: 350, // Adjust the width as needed
    },
    receiptName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemList: {
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    itemName: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default App;