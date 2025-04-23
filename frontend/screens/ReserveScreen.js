import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    Dimensions,
    Platform,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider, Badge } from 'react-native-elements';

const { width } = Dimensions.get('window');

const defaultHotelImage = require('../../assets/icon.png');

const PaymentModal = ({ visible, onClose, bookingDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('chapa');
  const [selectedChapaOption, setSelectedChapaOption] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [mobilePaymentDetails, setMobilePaymentDetails] = useState({
    phoneNumber: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(true); // Test mode toggle

  // Test mode credentials
  const TEST_CHAPA_API_KEY = "CHASECK_TEST-xwTW9CzWshnFOqbyqrPPtssnrfN09Eu9";
  const TEST_CARD_NUMBER = "4242424242424242";
  const TEST_PHONE_NUMBER = "0912345678";
  const TEST_EXPIRY = "12/25";
  const TEST_CVV = "123";

  const validatePhoneNumber = (phone) => {
    const ethiopianPhoneRegex = /^09\d{8}$/;
    return ethiopianPhoneRegex.test(phone);
  };

  const validateCardNumber = (number) => {
    const cardRegex = /^\d{16}$/;
    return cardRegex.test(number);
  };

  const validateExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return expiryRegex.test(expiry);
  };

  const validateCVV = (cvv) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setSelectedChapaOption(null);
  };

  const handleChapaOptionChange = (option) => {
    setSelectedChapaOption(option);
    if (testMode) {
      // Auto-fill test data when option changes
      setMobilePaymentDetails({
        phoneNumber: TEST_PHONE_NUMBER,
        fullName: "Test User"
      });
    } else {
      setMobilePaymentDetails({
        phoneNumber: '',
        fullName: ''
      });
    }
  };

  const handleCardDetailChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMobilePaymentChange = (field, value) => {
    setMobilePaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handlePay = async () => {
    // Validate inputs
    if (paymentMethod === 'chapa') {
      if (!selectedChapaOption) {
        showAlert('Error', 'Please select a payment option');
        return;
      }
      if (!mobilePaymentDetails.phoneNumber || !mobilePaymentDetails.fullName) {
        showAlert('Error', 'Please fill all required fields for mobile payment');
        return;
      }
      if (!validatePhoneNumber(mobilePaymentDetails.phoneNumber)) {
        showAlert('Error', 'Please enter a valid Ethiopian phone number (09XXXXXXXX)');
        return;
      }
    }
    if (paymentMethod === 'mastercard') {
      if (!cardDetails.name || 
          !cardDetails.email || 
          !cardDetails.cardNumber || 
          !cardDetails.expiry || 
          !cardDetails.cvv) {
        showAlert('Error', 'Please fill all card details');
        return;
      }
      if (!validateCardNumber(cardDetails.cardNumber)) {
        showAlert('Error', 'Please enter a valid 16-digit card number');
        return;
      }
      if (!validateExpiry(cardDetails.expiry)) {
        showAlert('Error', 'Please enter a valid expiry date (MM/YY)');
        return;
      }
      if (!validateCVV(cardDetails.cvv)) {
        showAlert('Error', 'Please enter a valid CVV (3 or 4 digits)');
        return;
      }
    }
    
    // Start loading
    setLoading(true);
    
    try {
      if (testMode) {
        // Simulate API call in test mode
        console.log("Test payment initiated with Chapa");
        console.log("Using test API key:", TEST_CHAPA_API_KEY);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showAlert(
          'Payment Successful (Test Mode)', 
          `Test payment successful! ${paymentMethod === 'chapa' ? `(${selectedChapaOption})` : ''} $${bookingDetails.totalPrice} paid`
        );
      } else {
        // Real payment implementation would go here
        // const response = await axios.post(...)
        await new Promise(resolve => setTimeout(resolve, 2000));
        showAlert(
          'Payment Successful', 
          `Payment successful! ${paymentMethod === 'chapa' ? `(${selectedChapaOption})` : ''} $${bookingDetails.totalPrice} paid`
        );
      }
    } catch (error) {
      showAlert('Payment Failed', error.message || 'Payment processing failed');
    } finally {
      setLoading(false);
      setTimeout(onClose, 2000);
    }
  };

  const toggleTestMode = () => {
    setTestMode(!testMode);
    // Reset form fields when changing modes
    setCardDetails({
      name: '',
      email: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
    setMobilePaymentDetails({
      phoneNumber: '',
      fullName: ''
    });
  };

  if (!bookingDetails) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.paymentModalOverlay}>
        <View style={styles.paymentModalContainer}>
          <View style={styles.paymentModalHeader}>
            <Text style={styles.paymentModalTitle}>Complete Your Booking</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.testModeButton}
                onPress={toggleTestMode}
              >
                <Text style={styles.testModeButtonText}>
                  {testMode ? 'TEST MODE ON' : 'TEST MODE OFF'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#EEEEEE" />
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView style={styles.paymentModalContent}>
            {testMode && (
              <View style={styles.testModeBanner}>
                <Text style={styles.testModeText}>
                  You're in test mode. No real payments will be processed.
                </Text>
              </View>
            )}
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Booking Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Hotel:</Text>
                <Text style={styles.summaryValue}>{bookingDetails?.hotelName}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Room Type:</Text>
                <Text style={styles.summaryValue}>{bookingDetails?.roomType}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Rooms:</Text>
                <Text style={styles.summaryValue}>{bookingDetails?.roomNumbers.join(', ')}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Check-in:</Text>
                <Text style={styles.summaryValue}>{bookingDetails?.checkInDate}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Check-out:</Text>
                <Text style={styles.summaryValue}>{bookingDetails?.checkOutDate}</Text>
              </View>
              
              <Divider style={styles.summaryDivider} />
              
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
                <Text style={[styles.summaryValue, styles.totalValue]}>${bookingDetails?.totalPrice}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              
              <View style={styles.paymentMethods}>
                <TouchableOpacity 
                  style={[
                    styles.paymentMethodButton, 
                    paymentMethod === 'chapa' && styles.selectedPaymentMethod
                  ]}
                  onPress={() => handlePaymentMethodChange('chapa')}
                >
                  <View style={styles.paymentMethodContent}>
                    <Image source={require('../../assets/logo/Chapa.png')} style={styles.paymentMethodLogo} />
                    <Text style={styles.paymentMethodText}>Chapa</Text>
                  </View>
                  <View style={[
                    styles.radioOuter,
                    paymentMethod === 'chapa' && styles.radioOuterSelected
                  ]}>
                    {paymentMethod === 'chapa' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.paymentMethodButton, 
                    paymentMethod === 'mastercard' && styles.selectedPaymentMethod
                  ]}
                  onPress={() => handlePaymentMethodChange('mastercard')}
                >
                  <View style={styles.paymentMethodContent}>
                    <Image source={require('../../assets/logo/mastercard.jpg')} style={styles.paymentMethodLogo} />
                    <Text style={styles.paymentMethodText}>Mastercard</Text>
                  </View>
                  <View style={[
                    styles.radioOuter,
                    paymentMethod === 'mastercard' && styles.radioOuterSelected
                  ]}>
                    {paymentMethod === 'mastercard' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {paymentMethod === 'chapa' && (
                <View style={styles.chapaOptions}>
                  <Text style={styles.subtitle}>Select payment option:</Text>
                  
                  <TouchableOpacity 
                    style={[
                      styles.chapaOption,
                      selectedChapaOption === 'telebirr' && styles.selectedChapaOption
                    ]}
                    onPress={() => handleChapaOptionChange('telebirr')}
                  >
                    <Image source={require('../../assets/logo/TeleBirr.png')} style={styles.chapaOptionLogo} />
                    <Text style={styles.chapaOptionText}>Telebirr</Text>
                    <View style={[
                      styles.radioOuter,
                      selectedChapaOption === 'telebirr' && styles.radioOuterSelected
                    ]}>
                      {selectedChapaOption === 'telebirr' && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                  
                  {selectedChapaOption === 'telebirr' && (
                    <View style={styles.paymentForm}>
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#888"
                        value={mobilePaymentDetails.phoneNumber}
                        onChangeText={(text) => {
                          const value = text.replace(/\D/g, '').slice(0, 10);
                          handleMobilePaymentChange('phoneNumber', value);
                        }}
                        keyboardType="phone-pad"
                      />
                      {mobilePaymentDetails.phoneNumber && !validatePhoneNumber(mobilePaymentDetails.phoneNumber) && (
                        <Text style={styles.errorText}>Please enter a valid Ethiopian phone number (09XXXXXXXX)</Text>
                      )}
                      
                      <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        value={mobilePaymentDetails.fullName}
                        onChangeText={(text) => handleMobilePaymentChange('fullName', text)}
                      />
                      
                      <TouchableOpacity 
                        style={styles.payButton}
                        onPress={handlePay}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="#EEEEEE" />
                        ) : (
                          <Text style={styles.payButtonText}>
                            {testMode ? 'Test Telebirr Payment' : 'Pay with Telebirr'}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  
                  <TouchableOpacity 
                    style={[
                      styles.chapaOption,
                      selectedChapaOption === 'cbe' && styles.selectedChapaOption
                    ]}
                    onPress={() => handleChapaOptionChange('cbe')}
                  >
                    <Image source={require('../../assets/logo/CBEBirr.png')} style={styles.chapaOptionLogo} />
                    <Text style={styles.chapaOptionText}>CBE Birr</Text>
                    <View style={[
                      styles.radioOuter,
                      selectedChapaOption === 'cbe' && styles.radioOuterSelected
                    ]}>
                      {selectedChapaOption === 'cbe' && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                  
                  {selectedChapaOption === 'cbe' && (
                    <View style={styles.paymentForm}>
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#888"
                        value={mobilePaymentDetails.phoneNumber}
                        onChangeText={(text) => {
                          const value = text.replace(/\D/g, '').slice(0, 10);
                          handleMobilePaymentChange('phoneNumber', value);
                        }}
                        keyboardType="phone-pad"
                      />
                      {mobilePaymentDetails.phoneNumber && !validatePhoneNumber(mobilePaymentDetails.phoneNumber) && (
                        <Text style={styles.errorText}>Please enter a valid Ethiopian phone number (09XXXXXXXX)</Text>
                      )}
                      
                      <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        value={mobilePaymentDetails.fullName}
                        onChangeText={(text) => handleMobilePaymentChange('fullName', text)}
                      />
                      
                      <TouchableOpacity 
                        style={styles.payButton}
                        onPress={handlePay}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="#EEEEEE" />
                        ) : (
                          <Text style={styles.payButtonText}>
                            {testMode ? 'Test CBE Birr Payment' : 'Pay with CBE Birr'}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {paymentMethod === 'mastercard' && (
                <View style={styles.paymentForm}>
                  {testMode && (
                    <TouchableOpacity
                      style={styles.fillTestDataButton}
                      onPress={() => {
                        setCardDetails({
                          name: "Test User",
                          email: "test@example.com",
                          cardNumber: TEST_CARD_NUMBER,
                          expiry: TEST_EXPIRY,
                          cvv: TEST_CVV
                        });
                      }}
                    >
                      <Text style={styles.fillTestDataButtonText}>Fill Test Card Data</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Cardholder Name"
                    placeholderTextColor="#888"
                    value={cardDetails.name}
                    onChangeText={(text) => handleCardDetailChange('name', text)}
                  />
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    value={cardDetails.email}
                    onChangeText={(text) => handleCardDetailChange('email', text)}
                    keyboardType="email-address"
                  />
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    placeholderTextColor="#888"
                    value={cardDetails.cardNumber}
                    onChangeText={(text) => {
                      const value = text.replace(/\D/g, '').slice(0, 16);
                      handleCardDetailChange('cardNumber', value);
                    }}
                    keyboardType="numeric"
                  />
                  {cardDetails.cardNumber && !validateCardNumber(cardDetails.cardNumber) && (
                    <Text style={styles.errorText}>Please enter a valid 16-digit card number</Text>
                  )}
                  
                  <View style={styles.rowInputs}>
                    <TextInput
                      style={[styles.input, styles.halfInput]}
                      placeholder="Expiry (MM/YY)"
                      placeholderTextColor="#888"
                      value={cardDetails.expiry}
                      onChangeText={(text) => {
                        let value = text.replace(/\D/g, '');
                        if (value.length > 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        handleCardDetailChange('expiry', value);
                      }}
                      keyboardType="numeric"
                    />
                    {cardDetails.expiry && !validateExpiry(cardDetails.expiry) && (
                      <Text style={styles.errorText}>MM/YY</Text>
                    )}
                    
                    <TextInput
                      style={[styles.input, styles.halfInput]}
                      placeholder="CVV"
                      placeholderTextColor="#888"
                      value={cardDetails.cvv}
                      onChangeText={(text) => {
                        const value = text.replace(/\D/g, '').slice(0, 4);
                        handleCardDetailChange('cvv', value);
                      }}
                      keyboardType="numeric"
                      secureTextEntry
                    />
                    {cardDetails.cvv && !validateCVV(cardDetails.cvv) && (
                      <Text style={styles.errorText}>3-4 digits</Text>
                    )}
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.payButton}
                    onPress={handlePay}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#EEEEEE" />
                    ) : (
                      <Text style={styles.payButtonText}>
                        {testMode ? 'Test Mastercard Payment' : 'Pay with Mastercard'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              
              <View style={styles.secureBadge}>
                <MaterialIcons name="verified" size={20} color="#00ADB5" />
                <Text style={styles.secureBadgeText}>Secure Payment</Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.paymentModalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ReserveScreen = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reservationToRemove, setReservationToRemove] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [reservations, setReservations] = useState([
    {
      id: 1,
      title: 'Grand Hotel Roma',
      price: '35,960',
      duration: '3 nights',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      saved: true,
      location: 'Rome, Italy',
      date: 'Jun 15 - Jun 18',
      rating: '4.9',
      hotelName: 'Grand Hotel Roma',
      roomType: 'Double Room',
      roomNumbers: ['R101', 'R102'],
      numberOfRooms: 2,
      checkInDate: 'Jun 15, 2023',
      checkOutDate: 'Jun 18, 2023',
      totalPrice: '71,920'
    },
    {
      id: 2,
      title: 'Venice Canal View Hotel',
      price: '28,750',
      duration: '2 nights',
      image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      saved: true,
      location: 'Venice, Italy',
      date: 'Jul 3 - Jul 5',
      rating: '4.8',
      hotelName: 'Venice Canal View Hotel',
      roomType: 'Single Room',
      roomNumbers: ['V201'],
      numberOfRooms: 1,
      checkInDate: 'Jul 3, 2023',
      checkOutDate: 'Jul 5, 2023',
      totalPrice: '28,750'
    },
    {
      id: 3,
      title: 'Colosseum Grand Hotel',
      price: '42,300',
      duration: '4 nights',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      saved: true,
      location: 'Rome, Italy',
      date: 'Jun 22 - Jun 26',
      rating: '4.7',
      hotelName: 'Colosseum Grand Hotel',
      roomType: 'Deluxe Suite',
      roomNumbers: ['C301'],
      numberOfRooms: 1,
      checkInDate: 'Jun 22, 2023',
      checkOutDate: 'Jun 26, 2023',
      totalPrice: '42,300'
    }
  ]);

  const savedCount = reservations.filter(r => r.saved).length;

  const handleRemoveClick = (reservation) => {
    setReservationToRemove(reservation);
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    setReservations(reservations.map(r => 
      r.id === reservationToRemove.id ? { ...r, saved: false } : r
    ));
    setShowConfirmModal(false);
  };

  const handleBookNow = (reservation) => {
    setCurrentBooking({
      hotelName: reservation.hotelName,
      roomType: reservation.roomType,
      roomNumbers: reservation.roomNumbers,
      numberOfRooms: reservation.numberOfRooms,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      totalPrice: reservation.totalPrice
    });
    setShowPaymentModal(true);
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={item.image ? { uri: item.image } : defaultHotelImage} 
          style={styles.hotelImage} 
        />
      </View>
      
      <View style={styles.reservationContent}>
        <View style={styles.reservationHeader}>
          <Text style={styles.hotelName}>{item.hotelName}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
        </View>
        
        <Text style={styles.locationText}>{item.location}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="bed-king" size={20} color="#00ADB5" />
            <Text style={styles.detailText}>{item.roomType}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="door" size={20} color="#00ADB5" />
            <Text style={styles.detailText}>Rooms: {item.roomNumbers.join(', ')}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="weather-night" size={20} color="#00ADB5" />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.datesContainer}>
          <View style={styles.dateRow}>
            <MaterialCommunityIcons name="calendar-arrow-right" size={20} color="#00ADB5" />
            <Text style={styles.dateText}>Check-in: {item.checkInDate}</Text>
          </View>
          <View style={styles.dateRow}>
            <MaterialCommunityIcons name="calendar-arrow-left" size={20} color="#00ADB5" />
            <Text style={styles.dateText}>Check-out: {item.checkOutDate}</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.totalPrice}>Total: ${item.totalPrice}</Text>
          <Text style={styles.nightPrice}>(${item.price} per night)</Text>
        </View>
        
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleRemoveClick(item)}
          >
            <MaterialIcons name="delete" size={24} color="#F44336" />
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => handleBookNow(item)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <MaterialIcons name="favorite" size={40} color="#00ADB5" />
      </View>
      <Text style={styles.emptyTitle}>No Saved Reservations</Text>
      <Text style={styles.emptySubtitle}>Save your favorite hotels to see them here</Text>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse Hotels</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Reservations</Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <MaterialIcons 
              name="favorite" 
              size={20} 
              color={activeTab === 'saved' ? '#00ADB5' : '#EEEEEE'} 
            />
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved
            </Text>
            {savedCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{savedCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recommended' && styles.activeTab]}
            onPress={() => setActiveTab('recommended')}
          >
            <Text style={[styles.tabText, activeTab === 'recommended' && styles.activeTabText]}>
              Recommended
            </Text>
          </TouchableOpacity>
        </View>
        
        <Divider style={styles.divider} />
        
        {activeTab === 'saved' ? (
          reservations.filter(r => r.saved).length > 0 ? (
            <FlatList
              data={reservations.filter(r => r.saved)}
              renderItem={renderReservationItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            renderEmptyState()
          )
        ) : (
          <Text style={styles.comingSoon}>Recommended hotels coming soon</Text>
        )}
      </ScrollView>
      
      {/* Confirm Removal Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Removal</Text>
            <Text style={styles.modalText}>
              Are you sure you want to remove "{reservationToRemove?.title}" from your saved reservations?
            </Text>
            <Text style={styles.modalText}>
              Cancellation fees may apply depending on the hotel's policy.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmRemove}
              >
                <Text style={styles.modalButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Payment Modal */}
      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        bookingDetails={currentBooking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00ADB5',
  },
  activeTab: {
    backgroundColor: '#00ADB5',
  },
  tabText: {
    color: '#EEEEEE',
    fontSize: 16,
    marginLeft: 5,
  },
  activeTabText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#00ADB5',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: {
    color: '#EEEEEE',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#393E46',
    height: 1,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  reservationCard: {
    backgroundColor: '#393E46',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  hotelImage: {
    width: '100%',
    height: '100%',
  },
  reservationContent: {
    padding: 15,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ADB5',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 173, 181, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: '#EEEEEE',
    fontSize: 14,
    marginLeft: 5,
  },
  locationText: {
    color: '#00ADB5',
    fontSize: 14,
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    color: '#EEEEEE',
    fontSize: 14,
    marginLeft: 8,
  },
  datesContainer: {
    backgroundColor: 'rgba(0, 173, 181, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateText: {
    color: '#EEEEEE',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  priceContainer: {
    marginBottom: 15,
  },
  totalPrice: {
    color: '#00ADB5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nightPrice: {
    color: '#EEEEEE',
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  deleteButtonText: {
    color: '#F44336',
    marginLeft: 5,
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#00ADB5',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#EEEEEE',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    backgroundColor: '#393E46',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#00ADB5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtitle: {
    color: '#EEEEEE',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  browseButton: {
    borderWidth: 1,
    borderColor: '#00ADB5',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  browseButtonText: {
    color: '#00ADB5',
    fontSize: 14,
  },
  comingSoon: {
    color: '#EEEEEE',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#393E46',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 15,
  },
  modalText: {
    color: '#EEEEEE',
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00ADB5',
  },
  confirmButton: {
    backgroundColor: '#00ADB5',
  },
  modalButtonText: {
    color: '#EEEEEE',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentModalContainer: {
    backgroundColor: '#222831',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  paymentModalHeader: {
    backgroundColor: '#393E46',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentModalTitle: {
    color: '#EEEEEE',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentModalContent: {
    padding: 15,
  },
  paymentModalFooter: {
    backgroundColor: '#393E46',
    padding: 10,
    alignItems: 'flex-end',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#00ADB5',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#EEEEEE',
    fontSize: 16,
  },
  summaryValue: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: '500',
  },
  summaryDivider: {
    backgroundColor: '#00ADB5',
    height: 1,
    marginVertical: 15,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#00ADB5',
    fontWeight: 'bold',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  paymentMethodButton: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#393E46',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedPaymentMethod: {
    backgroundColor: 'rgba(0, 173, 181, 0.1)',
    borderColor: '#00ADB5',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodLogo: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  paymentMethodText: {
    color: '#EEEEEE',
    fontSize: 14,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#00ADB5',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ADB5',
  },
  chapaOptions: {
    marginTop: 10,
  },
  subtitle: {
    color: '#EEEEEE',
    fontSize: 14,
    marginBottom: 10,
  },
  chapaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#393E46',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedChapaOption: {
    backgroundColor: 'rgba(0, 173, 181, 0.1)',
    borderColor: '#00ADB5',
  },
  chapaOptionLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  chapaOptionText: {
    color: '#EEEEEE',
    fontSize: 14,
    flex: 1,
  },
  paymentForm: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#393E46',
    color: '#EEEEEE',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  payButtonText: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secureBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 173, 181, 0.1)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  secureBadgeText: {
    color: '#00ADB5',
    fontSize: 14,
    marginLeft: 5,
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  cancelButtonText: {
    color: '#EEEEEE',
    fontSize: 16,
  },
  testModeButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  testModeButtonText: {
    color: '#EEEEEE',
    fontSize: 12,
    fontWeight: 'bold',
  },
  testModeBanner: {
    backgroundColor: '#00ADB5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  testModeText: {
    color: '#EEEEEE',
    fontSize: 14,
    textAlign: 'center',
  },
  fillTestDataButton: {
    backgroundColor: '#393E46',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  fillTestDataButtonText: {
    color: '#00ADB5',
    fontSize: 14,
  },
});

export default ReserveScreen;