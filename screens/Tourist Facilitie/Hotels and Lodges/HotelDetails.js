import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Modal,
  FlatList,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HotelDetails = ({ hotel }) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Traveler123', rating: 5, comment: 'Excellent service and beautiful location!', date: '2023-08-15' },
    { id: 2, user: 'AdventureSeeker', rating: 4, comment: 'Great amenities!', date: '2023-08-14' },
  ]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', user: '' });
  const [mapReady, setMapReady] = useState(false);

  // Debug coordinates
  useEffect(() => {
    console.log('Hotel coordinates:', {
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      valid: !isNaN(hotel.latitude) && !isNaN(hotel.longitude)
    });
  }, [hotel.latitude, hotel.longitude]);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const handleAddReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim() !== '') {
      const review = {
        id: reviews.length + 1,
        user: newReview.user || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
      };
      setReviews([...reviews, review]);
      setNewReview({ rating: 0, comment: '', user: '' });
      setShowReviewModal(false);
    }
  };

  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FontAwesome 
        key={i} 
        name={i < Math.floor(rating) ? 'star' : (i === Math.floor(rating) && rating % 1 >= 0.5 ? 'star-half-full' : 'star-o')}
        size={16} 
        color="#FFD700" 
      />
    ));
  };

  const handleMapReady = () => {
    console.log('Map is ready');
    setMapReady(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: hotel.image }} 
        style={styles.headerImage}
        resizeMode="cover"
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#EEEEEE" />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <View style={styles.hotelHeader}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {renderRatingStars(averageRating)}
            </View>
            <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({reviews.length} reviews)</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#00ADB5" />
          <Text style={styles.locationText}>{hotel.location}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>About This Hotel</Text>
          <Text style={styles.descriptionText}>{hotel.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <FlatList
            horizontal
            data={[hotel.image, hotel.image, hotel.image]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedImage(item)}>
                <Image source={{ uri: item }} style={styles.galleryImage} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.gallery}
          />
        </View>

        {/* Map Section */}
        {hotel.latitude && hotel.longitude && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapContainer}>
              {!mapReady && (
                <View style={styles.mapPlaceholder}>
                  <Text>Loading map...</Text>
                </View>
              )}
              <MapView
                style={[styles.map, !mapReady && styles.hiddenMap]}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: hotel.latitude,
                  longitude: hotel.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01 * (SCREEN_WIDTH / SCREEN_HEIGHT),
                }}
                onMapReady={handleMapReady}
              >
                <Marker
                  coordinate={{
                    latitude: hotel.latitude,
                    longitude: hotel.longitude,
                  }}
                >
                  <View style={styles.marker}>
                    <MaterialIcons name="hotel" size={30} color="#00ADB5" />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Guest Reviews</Text>
            <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)}>
              <Text style={styles.seeAllText}>
                {showAllReviews ? 'Show Less' : `See All (${reviews.length})`}
              </Text>
            </TouchableOpacity>
          </View>

          {displayedReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <View style={styles.reviewRating}>
                  {renderRatingStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.addReviewButton}
            onPress={() => setShowReviewModal(true)}
          >
            <Text style={styles.addReviewButtonText}>Add Your Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      <Modal visible={selectedImage !== null} transparent>
        <View style={styles.imageModal}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <MaterialIcons name="close" size={30} color="#EEEEEE" />
          </TouchableOpacity>
          <Image 
            source={{ uri: selectedImage }} 
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>

      <Modal visible={showReviewModal} animationType="slide">
        <View style={styles.reviewModal}>
          <View style={styles.reviewModalHeader}>
            <Text style={styles.reviewModalTitle}>Share Your Experience</Text>
            <TouchableOpacity onPress={() => setShowReviewModal(false)}>
              <MaterialIcons name="close" size={24} color="#00ADB5" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.reviewModalContent}>
            <View style={styles.ratingInput}>
              <Text style={styles.ratingLabel}>Your Rating</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setNewReview({ ...newReview, rating: star })}
                  >
                    <FontAwesome
                      name={star <= newReview.rating ? 'star' : 'star-o'}
                      size={32}
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Your Name (optional)"
              value={newReview.user}
              onChangeText={(text) => setNewReview({ ...newReview, user: text })}
            />

            <TextInput
              style={[styles.input, styles.commentInput]}
              placeholder="Share details of your experience..."
              multiline
              value={newReview.comment}
              onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
            />

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleAddReview}
              disabled={newReview.rating === 0 || newReview.comment.trim() === ''}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  headerImage: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-start',
  },
  backButton: {
    margin: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    color: '#EEEEEE',
    marginLeft: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 15,
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionText: {
    fontSize: 15,
    color: '#EEEEEE',
    lineHeight: 22,
  },
  gallery: {
    gap: 10,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  mapContainer: {
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#393E46', // Fallback color
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  hiddenMap: {
    opacity: 0,
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393E46',
  },
  marker: {
    backgroundColor: '#222831',
    padding: 5,
    borderRadius: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#00ADB5',
    fontSize: 14,
  },
  reviewCard: {
    backgroundColor: '#393E46',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewUser: {
    fontWeight: 'bold',
    color: '#00ADB5',
    fontSize: 16,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 10,
  },
  reviewComment: {
    color: '#EEEEEE',
    lineHeight: 20,
  },
  addReviewButton: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addReviewButtonText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullImage: {
    width: SCREEN_WIDTH - 40,
    height: '70%',
  },
  reviewModal: {
    flex: 1,
    backgroundColor: '#222831',
    paddingTop: 40,
  },
  reviewModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#393E46',
  },
  reviewModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
  },
  reviewModalContent: {
    padding: 20,
  },
  ratingInput: {
    marginBottom: 25,
  },
  ratingLabel: {
    color: '#EEEEEE',
    fontSize: 16,
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#393E46',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#EEEEEE',
  },
  commentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HotelDetails;