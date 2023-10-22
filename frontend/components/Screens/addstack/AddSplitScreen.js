import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const testReceipt = [
    {
      receiptId: 1,
      items: [
        { itemName: 'Item 1', cost: 10.99 },
        { itemName: 'Item 2', cost: 5.99 },
      ],
    },
    {
      receiptId: 2,
      items: [
        { itemName: 'Item A', cost: 8.49 },
        { itemName: 'Item B', cost: 12.99 },
      ],
    },
    // Add more test receipts as needed
  ];

const SplitScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={testReceipt}
                keyExtractor={(item) => item.receiptId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.receiptContainer}>
                        <Text style={styles.receiptTitle}>Receipt {item.receiptId}</Text>
                        {item.items.map((receiptItem, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <Text>{receiptItem.itemName}</Text>
                                <Text>${receiptItem.cost.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    receiptContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    receiptTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SplitScreen;