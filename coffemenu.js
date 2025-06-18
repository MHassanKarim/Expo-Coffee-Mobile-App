import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ThemeContext } from './themeContext'; // Import your ThemeContext

const CoffeeMenu = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Access theme context
  const coffeeData = [
    { id: 1, name: 'Espresso', price: 5, image: require('./assets/espresso.jpg') },
    { id: 2, name: 'Latte', price: 6, image: require('./assets/latte.jpeg') },
    { id: 3, name: 'Cappuccino', price: 6, image: require('./assets/cappuccino.jpeg') },
    { id: 4, name: 'Americano', price: 4, image: require('./assets/americano.jpg') },
    { id: 5, name: 'Mocha', price: 7, image: require('./assets/mocha.jpeg') },
    { id: 6, name: 'Macchiato', price: 5, image: require('./assets/macchiato.jpeg') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Coffee Menu</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>

      <View style={styles.menuGrid}>
        {coffeeData.map(coffee => (
          <View key={coffee.id} style={styles.coffeeItem}>
            <Image source={coffee.image} style={styles.coffeeImage} />
            <Text style={[styles.coffeeName, { color: isDarkMode ? '#FFF' : '#000' }]}>{coffee.name}</Text>
            <Text style={[styles.coffeePrice, { color: isDarkMode ? '#CCC' : '#888' }]}>${coffee.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <Button title="Place Your Order" onPress={() => navigation.navigate('CoffeeOrder')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#000',
  },
  toggleButton: {
    padding: 10,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  coffeeItem: {
    width: '48%', // Adjusted to fit two items per row
    marginBottom: 20,
    alignItems: 'center',
  },
  coffeeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coffeePrice: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons
    marginTop: 20,
  },
});

export default CoffeeMenu;  
