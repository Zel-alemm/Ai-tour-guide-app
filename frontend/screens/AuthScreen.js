import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const predefinedAccount = {
  email: "user@example.com",
  password: "password",
  name: "John Doe",
  profileImage: require('../../assets/11.png')
};

const AuthScreen = ({ navigation, setIsLoggedIn, setUser }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        // Simulate login validation
        if (email === predefinedAccount.email && password === predefinedAccount.password) {
          setIsLoggedIn(true);
          setUser(predefinedAccount);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Profile' }],
          });
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        // Signup logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoggedIn(true);
        setUser({
          email,
          name,
          profileImage: predefinedAccount.profileImage
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Profile' }],
        });
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.authContainer}>
          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'login' 
              ? 'Login to access your account' 
              : 'Sign up to get started'}
          </Text>

          {mode === 'signup' && (
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons 
                name="account" 
                size={20} 
                color="#393E46" 
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons 
              name="email" 
              size={20} 
              color="#393E46" 
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons 
              name="lock" 
              size={20} 
              color="#393E46" 
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.authButton, 
              isLoading && styles.disabledButton
            ]} 
            onPress={handleAuth}
            disabled={isLoading}
          >
            <Text style={styles.authButtonText}>
              {isLoading 
                ? 'Processing...' 
                : mode === 'login' ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchModeButton}
            onPress={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setPassword('');
            }}
            disabled={isLoading}
          >
            <Text style={styles.switchModeText}>
              {mode === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <Text style={styles.switchModeActionText}>
                {mode === 'login' ? 'Sign Up' : 'Login'}
              </Text>
            </Text>
          </TouchableOpacity>

          {mode === 'login' && (
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  authContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#393E46',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222831',
  },
  authButton: {
    backgroundColor: '#00ADB5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchModeButton: {
    alignItems: 'center',
    marginBottom: 8,
  },
  switchModeText: {
    color: '#393E46',
    fontSize: 14,
  },
  switchModeActionText: {
    color: '#00ADB5',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#00ADB5',
    fontSize: 14,
  },
});

export default AuthScreen;