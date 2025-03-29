import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const backgroundImage = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80';

const FilteredHotels = ({ route, navigation }) => {
  const { filteredHotels } = route.params || { filteredHotels: [] };

  const sortedHotels = [...filteredHotels].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.hotelCard}
      onPress={() => navigation.navigate('HotelLodges', { hotel: item })}
    >
      <Image source={{ uri: item.image }} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelLocation}>{item.location}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={20} color="#00ADB5" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: backgroundImage }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Filtered Hotels</Text>
        
        {sortedHotels.length > 0 ? (
          <FlatList
            data={sortedHotels}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderHotelItem}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No hotels found matching your criteria.</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(34, 40, 49, 0.8)',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  hotelCard: {
    backgroundColor: '#393E46',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  hotelImage: {
    width: '100%',
    height: 200,
  },
  hotelInfo: {
    padding: 15,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 14,
    color: '#EEEEEE',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#EEEEEE',
    marginLeft: 5,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#EEEEEE',
    textAlign: 'center',
  },
});

export default FilteredHotels;