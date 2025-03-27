import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  Dimensions,
  ImageBackground
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming
} from 'react-native-reanimated';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const colors = {
  primary: '#222831',
  secondary: '#393E46',
  accent: '#00ADB5',
  background: '#EEEEEE',
  white: '#FFFFFF',
  whereInput: '#393E46',
  whenInput: '#4E535B',
  searchButton: '#00ADB5'
};

const backgroundImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const carouselImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    title: "Lalibela",
    description: "Explore the ancient rock-hewn churches of Lalibela",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    title: "Lake Tana",
    description: "Discover the serene beauty of Lake Tana",
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    title: "Gondar",
    description: "Visit the castles of Gondar",
  },
];

const testimonials = [
  {
    id: 1,
    text: "An unforgettable experience! The churches are truly a wonder.",
    author: "Visitor 1",
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
  },
  {
    id: 2,
    text: "The hospitality and beauty left me speechless. Must visit!",
    author: "Visitor 2",
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f',
  },
];

const hiddenGems = [
  {
    id: 1,
    name: "Simien Mountains",
    description: "UNESCO World Heritage site with dramatic landscapes",
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f',
  },
  {
    id: 2,
    name: "Fasil Ghebbi",
    description: "Fortress-city showcasing Ethiopian architecture",
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
  },
];

const religiousSites = [
  {
    id: 1,
    name: "Lalibela Churches",
    description: "11 medieval monolithic cave churches",
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  },
  {
    id: 2,
    name: "Debre Berhan Selassie",
    description: "Famous for its ceiling of angel faces",
    image: 'https://images.unsplash.com/photo-1580130732478-4e339fb3376f',
  },
];

const PaginationItem = ({ animValue, index, length }) => {
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
    }
    
    const opacity = interpolate(
      animValue.value,
      inputRange,
      [0.5, 1, 0.5],
      'clamp'
    );
    
    return {
      opacity,
    };
  }, [animValue, index, length]);

  return (
    <Animated.View
      style={[
        {
          width,
          height: width,
          borderRadius: width / 2,
          backgroundColor: colors.white,
          margin: 4,
        },
        animStyle,
      ]}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  const [whereTo, setWhereTo] = useState('');
  const [when, setWhen] = useState('');
  const [activeFilter, setActiveFilter] = useState('religious');
  const progressValue = useSharedValue(0);

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.carouselImage} 
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.carouselGradient}
        >
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselDescription}>{item.description}</Text>
        </LinearGradient>
      </View>
    );
  };

  const renderTestimonial = ({ item }) => {
    return (
      <View style={styles.testimonialCard}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.testimonialImage}
        />
        <Text style={styles.testimonialText}>"{item.text}"</Text>
        <Text style={styles.testimonialAuthor}>- {item.author}</Text>
      </View>
    );
  };

  const renderGem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.gemCard}
        onPress={() => navigation.navigate('Destination', { destination: item })}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.gemImage}
          resizeMode="cover"
        />
        <View style={styles.gemTextContainer}>
          <Text style={styles.gemTitle}>{item.name}</Text>
          <Text style={styles.gemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReligiousSite = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.gemCard}
        onPress={() => navigation.navigate('Destination', { destination: item })}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.gemImage}
          resizeMode="cover"
        />
        <View style={styles.gemTextContainer}>
          <Text style={styles.gemTitle}>{item.name}</Text>
          <Text style={styles.gemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilteredContent = () => {
    switch (activeFilter) {
      case 'religious':
        return (
          <FlatList
            data={religiousSites}
            renderItem={renderReligiousSite}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gemsContainer}
          />
        );
      case 'hotels':
        return (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>Hotels in Amhara will appear here</Text>
          </View>
        );
      case 'lakes':
        return (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>Lakes in Amhara will appear here</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground 
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      blurRadius={3}
    >
      <ScrollView style={styles.container}>
        <View style={styles.overlay} />
        
        {/* Hero Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            width={viewportWidth}
            height={350}
            data={carouselImages}
            scrollAnimationDuration={1000}
            onProgressChange={(_, absoluteProgress) => {
              progressValue.value = absoluteProgress;
            }}
            renderItem={renderCarouselItem}
            autoPlay
            autoPlayInterval={3000}
          />
          
          <View style={styles.paginationContainer}>
            {carouselImages.map((_, index) => (
              <PaginationItem
                animValue={progressValue}
                index={index}
                key={index}
                length={carouselImages.length}
              />
            ))}
          </View>

          {/* Search Bar - Single Row */}
          <View style={styles.searchBarContainer}>
            <View style={[styles.searchInputWrapper, { backgroundColor: colors.whereInput }]}>
              <MaterialIcons name="location-on" size={20} color={colors.white} />
              <TextInput
                style={styles.searchInput}
                placeholder="Where to?"
                placeholderTextColor={colors.background}
                value={whereTo}
                onChangeText={setWhereTo}
              />
            </View>
            
            <View style={[styles.searchInputWrapper, { backgroundColor: colors.whenInput }]}>
              <MaterialIcons name="calendar-today" size={20} color={colors.white} />
              <TextInput
                style={styles.searchInput}
                placeholder="When?"
                placeholderTextColor={colors.background}
                value={when}
                onChangeText={setWhen}
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.searchButton, { backgroundColor: colors.searchButton }]}
              onPress={() => navigation.navigate('Search', { query: whereTo })}
            >
              <MaterialIcons name="search" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Why Book Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Why Book with Visit Amhara?</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="headset" size={30} color={colors.accent} />
              <Text style={styles.featureTitle}>24/7 Support</Text>
              <Text style={styles.featureText}>We're here for you anytime</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="gift" size={30} color={colors.accent} />
              <Text style={styles.featureTitle}>Earn Rewards</Text>
              <Text style={styles.featureText}>Travel more, earn more</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="thumb-up" size={30} color={colors.accent} />
              <Text style={styles.featureTitle}>Trusted Reviews</Text>
              <Text style={styles.featureText}>Verified reviews to guide you</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="credit-card" size={30} color={colors.accent} />
              <Text style={styles.featureTitle}>Flexible Plans</Text>
              <Text style={styles.featureText}>Free cancellation options</Text>
            </View>
          </View>
        </View>

        {/* Hidden Gems */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explore Amhara's Hidden Gems</Text>
          <FlatList
            data={hiddenGems}
            renderItem={renderGem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gemsContainer}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'hotels' && styles.activeFilter]}
            onPress={() => setActiveFilter('hotels')}
          >
            <Text style={[styles.filterText, activeFilter === 'hotels' && styles.activeFilterText]}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'religious' && styles.activeFilter]}
            onPress={() => setActiveFilter('religious')}
          >
            <Text style={[styles.filterText, activeFilter === 'religious' && styles.activeFilterText]}>Religious Sites</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'lakes' && styles.activeFilter]}
            onPress={() => setActiveFilter('lakes')}
          >
            <Text style={[styles.filterText, activeFilter === 'lakes' && styles.activeFilterText]}>Lakes</Text>
          </TouchableOpacity>
        </View>

        {/* Filtered Content */}
        <View style={styles.filteredContent}>
          <Text style={styles.contentTitle}>{activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} in Amhara</Text>
          {renderFilteredContent()}
        </View>

        {/* Testimonials */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>What Our Visitors Say</Text>
          <FlatList
            data={testimonials}
            renderItem={renderTestimonial}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialsContainer}
          />
        </View>

        {/* Call to Action */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Ready to Explore Amhara?</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Destinations')}
          >
            <Text style={styles.ctaButtonText}>Book Your Trip Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: viewportWidth,
    height: viewportHeight,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
  },
  carouselContainer: {
    height: 350,
    position: 'relative',
    marginBottom: 20,
  },
  carouselItem: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselGradient: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: 20,
    height: '40%',
    justifyContent: 'flex-end',
  },
  carouselTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carouselDescription: {
    color: colors.white,
    fontSize: 16,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  searchBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: colors.white,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    padding: 20,
    marginTop: 30,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 5,
  },
  featureText: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  gemsContainer: {
    paddingHorizontal: 10,
  },
  gemCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  gemImage: {
    width: '100%',
    height: 120,
  },
  gemTextContainer: {
    padding: 10,
  },
  gemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  gemDescription: {
    fontSize: 14,
    color: colors.white,
  },
  testimonialCard: {
    width: 250,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  testimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  testimonialText: {
    fontSize: 14,
    color: colors.white,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.accent,
    textAlign: 'right',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  activeFilter: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    color: colors.white,
  },
  activeFilterText: {
    color: colors.white,
  },
  filteredContent: {
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  placeholderCard: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  placeholderText: {
    color: colors.white,
    textAlign: 'center',
  },
  testimonialsContainer: {
    paddingHorizontal: 20,
  },
  ctaContainer: {
    backgroundColor: colors.accent,
    padding: 30,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;