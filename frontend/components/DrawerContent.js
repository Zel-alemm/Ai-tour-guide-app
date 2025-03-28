import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  Modal, 
  FlatList, 
  ScrollView 
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const colors = {
  primary: '#222831',
  secondary: '#393E46',
  accent: '#00ADB5',
  background: '#EEEEEE',
};

const languages = [
  { id: 1, name: 'English', code: 'en', flag: '🇬🇧' },
  { id: 2, name: 'Amharic', code: 'am', flag: '🇪🇹' },
  { id: 3, name: 'French', code: 'fr', flag: '🇫🇷' },
  { id: 4, name: 'Arabic', code: 'ar', flag: '🇸🇦' },
  { id: 5, name: 'Spanish', code: 'es', flag: '🇪🇸' },
];

const destinationCategories = [
  { id: 1, name: 'Things to Do' },
  { id: 2, name: 'World Heritage Sites' },
  { id: 3, name: 'National Parks and Community' },
  { id: 4, name: 'Lakes, Hot Springs and Water Falls' },
  { id: 5, name: 'Protected Areas' },
  { id: 6, name: 'Religious Sites' },
  { id: 7, name: 'Historical Landmarks' },
];

const touristFacilities = [
  { id: 1, name: 'Flights' },
  { id: 2, name: 'Hotels and Lodges' },
  { id: 3, name: 'Tourist Information Centers' },
  { id: 4, name: 'Other Service Providers' },
];

const aboutSections = [
  { id: 1, name: 'Amhara Region' },
  { id: 2, name: 'The Bureau' },
  { id: 3, name: 'Our Management' },
  { id: 4, name: 'Mandate and Responsibility' },
];

const searchData = [
  { id: 1, name: 'Hotels and Locations', type: 'Category' },
  { id: 2, name: 'Unison Hotel', type: 'Hotel' },
  { id: 3, name: 'Lalibela', type: 'Destination' },
  { id: 4, name: 'Timket Festival', type: 'Event' },
  { id: 5, name: 'Simien Mountains', type: 'Destination' },
  { id: 6, name: 'Tour Guides', type: 'Service' },
];

const DrawerContent = ({ navigation, isLoggedIn, user, setIsLoggedIn, setUser }) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [showDestinations, setShowDestinations] = React.useState(false);
  const [showFacilities, setShowFacilities] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);

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
    navigation.navigate('Main', { 
      screen: 'Search', 
      params: { item } 
    });
    setSearchVisible(false);
    setSearchQuery('');
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
    setShowDestinations(false);
    setShowFacilities(false);
    setShowAbout(false);
  };

  const toggleDestinations = () => {
    setShowDestinations(!showDestinations);
    setShowFacilities(false);
    setShowLanguageDropdown(false);
    setShowAbout(false);
  };

  const toggleFacilities = () => {
    setShowFacilities(!showFacilities);
    setShowDestinations(false);
    setShowLanguageDropdown(false);
    setShowAbout(false);
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
    setShowDestinations(false);
    setShowFacilities(false);
    setShowLanguageDropdown(false);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const getIconName = (type) => {
    switch (type) {
      case 'Hotel': return 'bed';
      case 'Destination': return 'map-marker';
      case 'Event': return 'calendar';
      case 'Service': return 'account-tie';
      default: return 'magnify';
    }
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => selectLanguage(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => navigation.navigate('Main', { 
        screen: 'Destination', 
        params: { category: item.name } 
      })}
    >
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFacilityItem = ({ item }) => {
    if (item.name === 'Hotels and Lodges') {
      return (
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => navigation.navigate('Main', { 
            screen: 'FilterHotel',
            params: { facilityType: item.name } 
          })}
        >
          <Text style={styles.dropdownItemText}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => navigation.navigate('Main', { 
          screen: 'Facility', 
          params: { type: item.name } 
        })}
      >
        <Text style={styles.dropdownItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderAboutItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => navigation.navigate('Main', { 
        screen: 'About', 
        params: { section: item.name } 
      })}
    >
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const menuItems = [
    { 
        label: 'Home', 
        icon: 'home', 
        action: () => navigation.navigate('Main', { screen: 'Home' })
      },
    { 
      label: 'Destinations', 
      icon: 'map-marker-radius', 
      action: toggleDestinations,
      isDropdown: true,
      dropdownItems: destinationCategories
    },
    { 
      label: 'Tourist Facilities', 
      icon: 'bed',
      action: toggleFacilities,
      isDropdown: true,
      dropdownItems: touristFacilities
    },
    { 
      label: 'Events', 
      icon: 'calendar', 
      action: () => navigation.navigate('Main', { screen: 'Events' })
    },
    { 
      label: 'About', 
      icon: 'information',
      action: toggleAbout,
      isDropdown: true,
      dropdownItems: aboutSections
    },
    { 
      label: 'Language', 
      icon: 'translate', 
      action: toggleLanguageDropdown,
      isDropdown: true,
      dropdownItems: languages
    },
  ];

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

      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/icon.png')}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Visit Amhara</Text>
        </View>

        <TouchableOpacity 
          style={styles.smallSearchButton}
          onPress={() => setSearchVisible(true)}
        >
          <MaterialIcons name="search" size={20} color="#fff" />
          <Text style={styles.smallSearchText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.action}
              >
                <MaterialCommunityIcons 
                  name={item.icon} 
                  size={24} 
                  color={colors.accent} 
                />
                <Text style={styles.menuItemText}>{item.label}</Text>
                {item.isDropdown && (
                  <MaterialIcons 
                    name={
                      (item.label === 'Language' && showLanguageDropdown) ||
                      (item.label === 'Destinations' && showDestinations) ||
                      (item.label === 'Tourist Facilities' && showFacilities) ||
                      (item.label === 'About' && showAbout)
                        ? 'keyboard-arrow-up' 
                        : 'keyboard-arrow-down'
                    } 
                    size={24} 
                    color="#fff" 
                  />
                )}
              </TouchableOpacity>

              {item.label === 'Language' && showLanguageDropdown && (
                <FlatList
                  data={languages}
                  renderItem={renderLanguageItem}
                  keyExtractor={item => item.id.toString()}
                  style={styles.dropdownList}
                />
              )}

              {item.label === 'Destinations' && showDestinations && (
                <FlatList
                  data={destinationCategories}
                  renderItem={renderDestinationItem}
                  keyExtractor={item => item.id.toString()}
                  style={styles.dropdownList}
                />
              )}

              {item.label === 'Tourist Facilities' && showFacilities && (
                <FlatList
                  data={touristFacilities}
                  renderItem={renderFacilityItem}
                  keyExtractor={item => item.id.toString()}
                  style={styles.dropdownList}
                />
              )}

              {item.label === 'About' && showAbout && (
                <FlatList
                  data={aboutSections}
                  renderItem={renderAboutItem}
                  keyExtractor={item => item.id.toString()}
                  style={styles.dropdownList}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.currentLanguage}>
          Current Language: {selectedLanguage.flag} {selectedLanguage.name}
        </Text>
        <TouchableOpacity 
  style={styles.loginButton}
  onPress={() => {
    if (isLoggedIn) {
      navigation.navigate('Main', { screen: 'Profile' });
    } else {
      navigation.navigate('Main', { screen: 'Auth' });
    }
  }}
>
  <MaterialIcons name={isLoggedIn ? "account-circle" : "login"} size={24} color="#fff" />
  <Text style={styles.loginButtonText}>
    {isLoggedIn ? 'My Profile' : 'Login / Sign Up'}
  </Text>
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
    flex: 1,
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
  dropdownList: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginLeft: 44,
    marginBottom: 5,
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  flag: {
    fontSize: 20,
  },
  currentLanguage: {
    color: colors.accent,
    marginBottom: 10,
    textAlign: 'center',
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