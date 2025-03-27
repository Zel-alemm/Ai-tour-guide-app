import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Modal, FlatList } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const colors = {
  primary: '#222831',
  secondary: '#393E46',
  accent: '#00ADB5',
  background: '#EEEEEE',
};

const searchData = [
  { id: 1, name: 'Hotels and Locations', type: 'Category' },
  { id: 2, name: 'Unison Hotel', type: 'Hotel' },
  { id: 3, name: 'Lalibela', type: 'Destination' },
  { id: 4, name: 'Timket Festival', type: 'Event' },
  { id: 5, name: 'Simien Mountains', type: 'Destination' },
  { id: 6, name: 'Tour Guides', type: 'Service' },
];

const DrawerContent = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const navigateToResult = (item) => {
    navigation.navigate('Search', { item });
    setSearchVisible(false);
    setSearchQuery('');
  };

  const menuItems = [
    { label: 'Home', icon: 'home', screen: 'Home', action: () => navigation.navigate('Home') },
    { label: 'Destinations', icon: 'map-marker-radius', screen: 'Destinations' },
    { label: 'Tourist Facilities', icon: 'hotel', screen: 'TouristFacilities' },
    { label: 'Events', icon: 'calendar', screen: 'Events' },
    { label: 'Profile', icon: 'account', screen: 'Profile' },
    { label: 'Language', icon: 'translate', screen: 'Language' },
  ];

  const getIconName = (type) => {
    switch (type) {
      case 'Hotel': return 'hotel';
      case 'Destination': return 'map-marker';
      case 'Event': return 'calendar';
      case 'Service': return 'account-tie';
      default: return 'magnify';
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={searchVisible} animationType="slide" transparent={false}>
        <View style={styles.searchModal}>
          <View style={styles.searchHeader}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search destinations, hotels, events..."
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
              />
              <TouchableOpacity onPress={() => setSearchVisible(false)}>
                <MaterialIcons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => navigateToResult(item)}
              >
                <MaterialCommunityIcons 
                  name={getIconName(item.type)} 
                  size={24} 
                  color={colors.accent} 
                />
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultType}>{item.type}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.resultsContainer}
          />
        </View>
      </Modal>

      <View style={styles.header}>
        <Image 
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Visit Amhara</Text>
      </View>

      {/* Small search button at the top */}
      <TouchableOpacity 
        style={styles.smallSearchButton}
        onPress={() => setSearchVisible(true)}
      >
        <MaterialIcons name="search" size={20} color="#fff" />
        <Text style={styles.smallSearchText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Main Menu</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.action || (() => navigation.navigate(item.screen))}
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
    marginTop: 20,
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
  smallSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  smallSearchText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  menuSection: {
    marginTop: 10,
    paddingHorizontal: 15,
    flex: 1,
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
  searchModal: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  searchHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginRight: 10,
  },
  resultsContainer: {
    padding: 15,
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  resultTextContainer: {
    marginLeft: 15,
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  resultType: {
    fontSize: 14,
    color: colors.secondary,
  },
});

export default DrawerContent;