import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Switch } from 'react-native';
import { ThemeContext } from './themeContext'; 

const CoffeeOrder = ({ navigation }) => {
  const [coffeeType, setCoffeeType] = useState('');
  const [quantity, setQuantity] = useState('');
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

  const handleOrder = () => {
    if (coffeeType && quantity) {
      Alert.alert('Order Placed', `You have ordered ${quantity} ${coffeeType}(s)`);
    } else {
      Alert.alert('Error', 'Please select a coffee type and quantity');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>Order Your Coffee</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
        placeholder="Enter Coffee Type (e.g., Latte, Cappuccino)"
        value={coffeeType}
        onChangeText={setCoffeeType}
        placeholderTextColor={isDarkMode ? '#CCC' : '#888'}
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
        placeholder="Enter Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholderTextColor={isDarkMode ? '#CCC' : '#888'}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CoffeeMenu')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between buttons
    marginTop: 20,
  },
  orderButton: {
    backgroundColor: '#007AFF', // Color for the order button
    borderRadius: 5,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10, // Space between buttons
  },
  backButton: {
    backgroundColor: '#007AFF', // Same color for the back button
    borderRadius: 5,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CoffeeOrder;
