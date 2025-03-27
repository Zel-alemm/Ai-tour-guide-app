// App.js
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

// Import your components
import Header from './frontend/components/Header';
import DrawerContent from './frontend/components/DrawerContent';
import HomeScreen from './frontend/screens/HomeScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import AuthScreen from './frontend/screens/AuthScreen';
// Import other screens as needed

// Predefined user account
const Img = require('./assets/11.png');
const userAccount = {
  email: "user@example.com",
  password: "pass",
  profileImage: Img,
  name: "Zelalem tadese"
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    if (email === userAccount.email && password === userAccount.password) {
      setIsLoggedIn(true);
      setUser(userAccount);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    // In a real app, you would update this on your backend
  };

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, scene }) => (
          <Header 
            navigation={navigation} 
            isLoggedIn={isLoggedIn}
            user={user}
          />
        ),
      }}
    >
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} isLoggedIn={isLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {(props) => (
          <ProfileScreen 
            {...props} 
            isLoggedIn={isLoggedIn} 
            user={user}
            onLogout={handleLogout}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Auth">
        {(props) => (
          <AuthScreen 
            {...props} 
            onLogin={handleLogin} 
            predefinedAccount={userAccount}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ProfileSettings">
        {(props) => (
          <ProfileSettingsScreen 
            {...props} 
            user={user}
            onUpdate={handleUpdate}
          />
        )}
      </Stack.Screen>
      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          width: 300,
          backgroundColor: '#222831',
        }}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}