// AuthScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AuthScreen = ({ navigation, route, onLogin, predefinedAccount }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState(predefinedAccount?.email || '');
  const [password, setPassword] = useState(predefinedAccount?.password || '');
  const [name, setName] = useState(predefinedAccount?.name || '');

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }
      // In a real app, you would create a new account here
      Alert.alert('Success', 'Account created successfully!');
      setMode('login');
      return;
    }

    // For login
    const success = onLogin(email, password);
    if (success) {
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>{mode === 'login' ? 'Login' : 'Sign Up'}</Text>
        
        {mode === 'signup' && (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={24} color="#393E46" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#393E46" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#393E46" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.switchModeButton}
          onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
        >
          <Text style={styles.switchModeText}>
            {mode === 'login' 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
  },
  authContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#393E46',
    marginBottom: 20,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchModeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#00ADB5',
    fontWeight: 'bold',
  },
});

export default AuthScreen;