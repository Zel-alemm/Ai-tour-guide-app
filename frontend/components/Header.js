import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, FlatList, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

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

const Header = ({ navigation, isLoggedIn, user }) => {
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.searchIcon} 
            onPress={() => setSearchVisible(true)}
          >
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialCommunityIcons name="earth" size={24} color="#fff" />
          <Text style={styles.headerText}>Visit Amhara</Text>
        </TouchableOpacity>

        <View style={styles.rightIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {isLoggedIn && user?.profileImage ? (
              <Image source={user.profileImage} style={styles.profileImage} />
            ) : (
              <MaterialCommunityIcons name="account" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  );
};

const getIconName = (type) => {
  switch (type) {
    case 'Hotel': return 'hotel';
    case 'Destination': return 'map-marker';
    case 'Event': return 'calendar';
    case 'Service': return 'account-tie';
    default: return 'magnify';
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    height: 60,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIcon: {
    marginLeft: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  rightIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
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

export default Header;