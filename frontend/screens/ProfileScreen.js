// ProfileScreen.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation, isLoggedIn, user, onLogout }) => {
  const menuItemsLoggedIn = [
    { id: 1, title: 'My Bookings', icon: 'book', screen: 'Bookings' },
    { id: 2, title: 'Reservations', icon: 'calendar-clock', screen: 'Reservations' },
    { id: 3, title: 'Wishlist', icon: 'heart', screen: 'Wishlist' },
    { id: 4, title: 'Profile Settings', icon: 'account-cog', screen: 'ProfileSettings' },
    { id: 5, title: 'Help Center', icon: 'help-circle', screen: 'Help' },
  ];

  const menuItemsLoggedOut = [
    { id: 1, title: 'Help Center', icon: 'help-circle', screen: 'Help' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={isLoggedIn ? user.profileImage : require('../../assets/icon.png')} 
          style={styles.profileImage} 
        />
        
        {isLoggedIn ? (
          <>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.profileName}>Guest User</Text>
        )}
        
        {!isLoggedIn ? (
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity
              style={[styles.authButton, { marginRight: 10 }]}
              onPress={() => navigation.navigate('Auth')}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authButton, { backgroundColor: '#393E46' }]}
              onPress={() => navigation.navigate('Auth', { mode: 'signup' })}
            >
              <Text style={styles.authButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <Text style={styles.authButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.menuSection}>
        {(isLoggedIn ? menuItemsLoggedIn : menuItemsLoggedOut).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons 
              name={item.icon} 
              size={24} 
              color="#00ADB5" 
            />
            <Text style={styles.menuItemText}>{item.title}</Text>
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={24} 
              color="#393E46" 
            />
          </TouchableOpacity>
        ))}
      </View>

      {isLoggedIn && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222831',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#00ADB5',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#00ADB5',
    marginBottom: 15,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  authButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#222831',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  logoutButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;