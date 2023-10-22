import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import CheckBox from 'expo-checkbox';
import host from "../../config";
import { userRef } from '../../database/firebase-auth';

const ReceiptDetailScreen = ({ route, navigation }) => {
  const { receipt } = route.params;
  const [checkedItems, setCheckedItems] = useState({});
  const [cost, setCost] = useState(0);

  const toggleItemCheckbox = (itemId) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev, [itemId]: !prev[itemId] };

      // Remove the itemId if its value is false
      if (!updatedItems[itemId]) {
        delete updatedItems[itemId];
      }

      return updatedItems;
    });
  };

  const setup = async () => {
    const response = await fetch(host + '/getTotal/' + receipt.id + '/' + userRef.id);
    const data = await response.json();
    setCost(data['total'])
  }

  const setCheckboxes = async () => {
    const response = await fetch(host + '/getItems/' + receipt.id + '/' + userRef.id);
    const data = await response.json();
    names = data['names']
    names.map(item_name => {
      console.log(item_name);
      setCheckedItems((prev) => ({ ...prev, [item_name]: true }));
    })
  }

  useEffect(() => {
    setup();
    setCheckboxes();
  }, [])

  const sendSplitRequest = async () => {
    try {
      const response = await fetch(host + '/send_items/' + userRef.id + '/' + receipt.id, {
        method: 'POST',
        body: JSON.stringify(checkedItems),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("sent request");
      const data = await response.json();
      console.log(data);
      setup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.receiptName}>Receipt {receipt.name}</Text>
      <FlatList
        data={receipt.items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.priceAndCheckbox}>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <CheckBox
                disabled={false}
                value={checkedItems[item.name]}
                onValueChange={() => toggleItemCheckbox(item.name)}
                color={checkedItems[item.name] ? "purple" : undefined} />
            </View>
          </View>
        )}
      />
        {receipt.owner_id === userRef.id ?  <Text style={styles.costText}> Current to be paid: {cost}  </Text> : <Text style={styles.costText}>  Current cost: {cost}   </Text>}
      <View style={styles.splitButtonContainer}>
        <TouchableOpacity
          style={styles.splitButton}
          onPress={sendSplitRequest}
        >
          <Text style={styles.splitButtonText}>Split</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingTop: 20,
    paddingLeft: 20,
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  receiptName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center', // Center the text
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  priceAndCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  costText: {
    fontSize: 18, // Adjust the font size
    marginBottom: 20, // Add margin for spacing
    textAlign: 'center', // Center the text
  },
  splitButtonContainer: {
    alignItems: 'center', // Center the button
    marginTop: 20,
  },
  splitButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Make the button width 100%
  },
  splitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ReceiptDetailScreen;
