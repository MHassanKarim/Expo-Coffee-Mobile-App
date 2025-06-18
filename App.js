import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupLogin from './signup'; 
import CoffeeOrder from './CoffeeOrder';
import CoffeeMenu from './coffemenu';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './themeContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignupLogin" component={SignupLogin} />
          <Stack.Screen name="CoffeeMenu" component={CoffeeMenu} />
          <Stack.Screen name="CoffeeOrder" component={CoffeeOrder} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> This should be placed outside NavigationContainer */}
    </ThemeProvider>
  );
};

export default App;
