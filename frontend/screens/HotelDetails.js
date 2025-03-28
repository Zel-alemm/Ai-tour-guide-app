import React, { useState } from 'react';
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
  TextInput 
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const HotelDetails = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Traveler123', rating: 5, comment: 'Excellent service and beautiful location!', date: '2023-08-15' },
    { id: 2, user: 'AdventureSeeker', rating: 4, comment: 'Great amenities, but room service could be faster.', date: '2023-08-14' },
  ]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', user: '' });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

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
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i <= rating ? 'star' : 'star-border'}
          size={24}
          color="#00ADB5"
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.content}>
        <View style={styles.hotelHeader}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <View style={styles.ratingContainer}>
            {renderRatingStars(Math.round(averageRating))}
            <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.location}>
          <MaterialIcons name="location-on" size={16} color="#00ADB5" /> {hotel.location}
        </Text>

        <Text style={styles.description}>{hotel.description}</Text>

        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilities}>
          <View style={styles.facilityItem}>
            <MaterialIcons name="wifi" size={24} color="#00ADB5" />
            <Text style={styles.facilityText}>Free WiFi</Text>
          </View>
          <View style={styles.facilityItem}>
            <MaterialIcons name="restaurant" size={24} color="#00ADB5" />
            <Text style={styles.facilityText}>Restaurant</Text>
          </View>
          <View style={styles.facilityItem}>
            <MaterialIcons name="pool" size={24} color="#00ADB5" />
            <Text style={styles.facilityText}>Swimming Pool</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Gallery</Text>
        <FlatList
          horizontal
          data={[hotel.image, hotel.image, hotel.image]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <Image source={{ uri: item }} style={styles.galleryImage} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.gallery}
        />

        <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.review}>
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
          <Text style={styles.addReviewButtonText}>Add Review</Text>
        </TouchableOpacity>
      </View>

      {/* Image Modal */}
      <Modal visible={selectedImage !== null} transparent={true}>
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

      {/* Review Modal */}
      <Modal visible={showReviewModal} animationType="slide">
        <View style={styles.reviewModal}>
          <View style={styles.reviewModalHeader}>
            <Text style={styles.reviewModalTitle}>Add Your Review</Text>
            <TouchableOpacity onPress={() => setShowReviewModal(false)}>
              <MaterialIcons name="close" size={24} color="#00ADB5" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingInput}>
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setNewReview({ ...newReview, rating: star })}
                >
                  <FontAwesome
                    name={star <= newReview.rating ? 'star' : 'star-o'}
                    size={30}
                    color="#00ADB5"
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
            placeholder="Write your review here..."
            multiline
            numberOfLines={4}
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
        </View>
      </Modal>
    </ScrollView>
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
    padding: 20,
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
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#EEEEEE',
  },
  location: {
    fontSize: 16,
    color: '#EEEEEE',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#EEEEEE',
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 15,
  },
  facilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  facilityText: {
    marginLeft: 5,
    color: '#EEEEEE',
  },
  gallery: {
    marginBottom: 20,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  review: {
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
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#EEEEEE',
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
    marginBottom: 30,
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
    width: '100%',
    height: '80%',
  },
  reviewModal: {
    flex: 1,
    backgroundColor: '#222831',
    padding: 20,
  },
  reviewModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  reviewModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
  },
  ratingInput: {
    marginBottom: 20,
  },
  ratingLabel: {
    color: '#EEEEEE',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
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