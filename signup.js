import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Switch, ImageBackground, Keyboard } from 'react-native';
import { ThemeContext } from './themeContext';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

// Password Input Component
const PasswordInput = ({ value, onChangeText, showPassword, togglePasswordVisibility, isDarkMode }) => {
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        placeholderTextColor={isDarkMode ? '#CCC' : '#888'}
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={isDarkMode ? '#FFF' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

// Main SignupLogin Component
const SignupLogin = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      Alert.alert('Error', 'User already exists!');
      return;
    }
    setUsers([...users, { username, password }]);
    Toast.show({
      text1: 'Success',
      text2: 'Account created successfully!',
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      type: 'success',
    });
    clearForm();
    navigation.navigate('CoffeeMenu');
  };

  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      Toast.show({
        text1: 'Success',
        text2: 'Login successful!',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        type: 'success',
      });
      clearForm();
      navigation.navigate('CoffeeMenu');
    } else {
      Alert.alert('Error', 'Invalid credentials!');
    }
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ImageBackground 
      source={require('./assets/NCBA&E LOGO.jpeg')} // Update the path as needed
      style={styles.background}
    >
      <View style={[styles.container, { backgroundColor: isDarkMode ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.9)' }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
            {isLogin ? 'Login' : 'Signup'}
          </Text>
          <View style={styles.themeToggleContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={isDarkMode ? '#CCC' : '#888'}
        />
        
        <PasswordInput 
          value={password} 
          onChangeText={setPassword} 
          showPassword={showPassword} 
          togglePasswordVisibility={() => setShowPassword(!showPassword)} 
          isDarkMode={isDarkMode}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.linkText}>{isLogin ? 'Create an Account' : 'SignIn'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007AFF' }]}
            onPress={isLogin ? handleLogin : handleSignup}
          >
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
          </TouchableOpacity>
        </View>

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    opacity: 0.9,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#FFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
  eyeIcon: {
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignupLogin;
