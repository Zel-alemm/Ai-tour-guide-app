import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HotelDetails from './HotelDetails';
import Availability from './Availability';
import Facilities from './Facility';
import HouseRules from './HotelRules';

function HotelsLodges() {
  const route = useRoute();
  const hotel = route.params?.hotel;

  if (!hotel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hotel data available</Text>
      </View>
    );
  }

  // Ensure all required data exists with defaults
  const hotelWithData = {
    id: hotel.id || '',
    name: hotel.name || 'Hotel Name',
    image: hotel.image || 'https://via.placeholder.com/300',
    location: hotel.location || 'Location not specified',
    description: hotel.description || 'No description available',
    latitude:hotel.latitude  || 0,
    longitude:hotel.longitude  || 0,
    facilities: Array.isArray(hotel.facilities) ? hotel.facilities : [],
    rules: hotel.rules || {
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM',
      childrenPolicy: 'Children policy not specified',
      petPolicy: 'Pet policy not specified',
      smokingPolicy: 'Smoking policy not specified',
      paymentMethods: ['Cash', 'Credit Card'],
      cancellationPolicy: 'Cancellation policy not specified'
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HotelDetails hotel={hotelWithData} />
      <Availability  />
      <Facilities  />
      <HouseRules  />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    padding: 1,
  },
  errorText: {
    color: '#EEEEEE',
    fontSize: 18,
    marginTop: 20,
  },
});

export default HotelsLodges;