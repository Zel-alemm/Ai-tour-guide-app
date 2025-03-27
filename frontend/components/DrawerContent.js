import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const colors = {
  primary: '#222831',
  secondary: '#393E46',
  accent: '#00ADB5',
  background: '#EEEEEE',
};

const DrawerContent = ({ navigation }) => {
  const menuItems = [
    { label: 'Home', icon: 'home', screen: 'Home' },
    { label: 'Destinations', icon: 'map-marker-radius', screen: 'Destinations' },
    { label: 'Tourist Facilities', icon: 'hotel', screen: 'TouristFacilities' },
    { label: 'Events', icon: 'calendar', screen: 'Events' },
    { label: 'Profile', icon: 'account', screen: 'Profile' },
    { label: 'Language', icon: 'translate', screen: 'Language' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/icon.png')} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.headerText}>Visit Amhara</Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Main Menu</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons 
              name={item.icon} 
              size={24} 
              color={colors.accent} 
            />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialIcons name="login" size={24} color="#fff" />
          <Text style={styles.loginButtonText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginTop:20,
    borderBottomColor: colors.secondary,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default DrawerContent;