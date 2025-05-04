import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const backgroundImage = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80';

const ALL_LOCATIONS = 'All Locations';
const ALL_FACILITY_TYPES = 'All Facility Types';

const FilterHotel = ({ navigation }) => {
  const locations = [ALL_LOCATIONS, 'Bahir Dar', 'Gondar', 'Lalibela', 'Axum', 'Debre Markos'];
  const facilityTypes = [ALL_FACILITY_TYPES, 'Hotels', 'Lodges', 'Resorts', 'Guest Houses', 'Restaurants'];

  const [selectedLocation, setSelectedLocation] = useState(ALL_LOCATIONS);
  const [selectedFacilityType, setSelectedFacilityType] = useState(ALL_FACILITY_TYPES);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFacilityModal, setShowFacilityModal] = useState(false);

  const mockHotels = [
    {
      id: 1,
      name: "Blue Nile Resort",
      location: "Bahir Dar",
      facilityType: "Resorts",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      rating: 4.7,
      latitude: 11.595888348157883,  // required for map
      longitude:  37.385426153564985,
      description: "Luxurious resort overlooking the Blue Nile with excellent amenities and services.",
    },
    {
      id: 2,
      name: "Gondar Castle Hotel",
      location: "Gondar",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      rating: 4.3,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Historic hotel near the famous castles with modern comforts and traditional charm.",
    },
    {
      id: 3,
      name: "Lalibela Lodge",
      location: "Lalibela",
      facilityType: "Lodges",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Eco-friendly lodge with stunning views of the rock-hewn churches.",
    },
    {
      id: 4,
      name: "Tana Plaza Hotel",
      location: "Bahir Dar",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      rating: 4.1,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Modern hotel in the heart of Bahir Dar with Lake Tana views.",
    },
    {
      id: 5,
      name: "Fasilides Grand Hotel",
      location: "Gondar",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      rating: 4.4,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Elegant hotel combining traditional Gondarine architecture with modern luxury.",
    },
    {
      id: 6,
      name: "Axum Heritage Hotel",
      location: "Axum",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.2,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Comfortable hotel near the ancient stelae with excellent service.",
    },
    {
      id: 7,
      name: "Debre Markos Guest House",
      location: "Debre Markos",
      facilityType: "Guest Houses",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      rating: 3.9,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Cozy guest house with friendly staff and home-like atmosphere.",
    },
    {
      id: 8,
      name: "Tis Abay Resort",
      location: "Bahir Dar",
      facilityType: "Resorts",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      rating: 4.6,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Beautiful resort near the Blue Nile Falls with spa facilities.",
    },
    {
      id: 9,
      name: "Roha Hotel",
      location: "Lalibela",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.0,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Well-appointed hotel with easy access to the famous churches.",
    },
    {
      id: 10,
      name: "Goha Hotel",
      location: "Gondar",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      rating: 4.3,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Panoramic views of Gondar from this hilltop hotel with excellent dining.",
    },
    {
      id: 11,
      name: "Kuriftu Resort & Spa",
      location: "Bahir Dar",
      facilityType: "Resorts",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      rating: 4.8,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Luxury resort on the shores of Lake Tana with first-class amenities.",
    },
    {
      id: 12,
      name: "Sabean International Hotel",
      location: "Axum",
      facilityType: "Hotels",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.1,
      latitude: 37.78825,  // required for map
      longitude: -122.4324,
      description: "Modern hotel with comfortable rooms and professional service.",
    }
  ];

  const handleApplyFilters = () => {
    let filtered = mockHotels;

    if (selectedLocation !== ALL_LOCATIONS) {
      filtered = filtered.filter((hotel) => hotel.location === selectedLocation);
    }

    if (selectedFacilityType !== ALL_FACILITY_TYPES) {
      filtered = filtered.filter((hotel) => hotel.facilityType === selectedFacilityType);
    }

    navigation.navigate('FilteredHotels', { filteredHotels: filtered });
  };

  const renderItem = ({ item, onSelect, currentValue, closeModal }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        item === currentValue && styles.selectedItem
      ]}
      onPress={() => {
        onSelect(item);
        closeModal();
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
      {item === currentValue && (
        <MaterialIcons name="check" size={24} color="#00ADB5" />
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: backgroundImage }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Find Your Perfect Stay</Text>

          <Text style={styles.label}>Location</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => setShowLocationModal(true)}
          >
            <Text style={styles.selectorText}>{selectedLocation}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#EEEEEE" />
          </TouchableOpacity>

          <Text style={styles.label}>Facility Type</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => setShowFacilityModal(true)}
          >
            <Text style={styles.selectorText}>{selectedFacilityType}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#EEEEEE" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.searchButtonText}>Search Hotels</Text>
            <MaterialIcons name="search" size={24} color="#EEEEEE" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={locations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderItem({
                item,
                onSelect: setSelectedLocation,
                currentValue: selectedLocation,
                closeModal: () => setShowLocationModal(false)
              })}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFacilityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFacilityModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={facilityTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderItem({
                item,
                onSelect: setSelectedFacilityType,
                currentValue: selectedFacilityType,
                closeModal: () => setShowFacilityModal(false)
              })}
            />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 25,
    borderRadius: 16,
    backgroundColor: 'rgba(57, 62, 70, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(238, 238, 238, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#EEEEEE',
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 5,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ADB5',
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
    backgroundColor: 'rgba(34, 40, 49, 0.7)',
  },
  selectorText: {
    color: '#EEEEEE',
    fontSize: 16,
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ADB5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  searchButtonText: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: '#393E46',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(238, 238, 238, 0.1)',
  },
  modalItemText: {
    color: '#EEEEEE',
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 173, 181, 0.2)',
  },
});

export default FilterHotel;