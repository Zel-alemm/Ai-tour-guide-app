import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Card, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';

const HotelRules = ({ hotelId, rules = {} }) => {
  // Enhanced default rules with more details
  const defaultRules = {
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    childrenPolicy: 'Children of all ages are welcome. Children under 12 stay free when using existing bedding.',
    petPolicy: 'Pets are not allowed. Service animals are welcome.',
    smokingPolicy: '100% non-smoking property. Smoking in rooms will result in a $250 cleaning fee.',
    paymentMethods: ['Visa', 'MasterCard', 'American Express', 'Discover', 'Cash'],
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in. Late cancellations will be charged one night\'s stay.',
    specialInstructions: 'Please present photo ID and credit card at check-in. Early check-in and late check-out subject to availability.'
  };

  // Merge provided rules with defaults
  const mergedRules = {
    ...defaultRules,
    ...rules
  };

  // State for collapsible sections
  const [activeSections, setActiveSections] = React.useState({
    checkInOut: true,
    children: false,
    pets: false,
    smoking: false,
    payments: false,
    cancellation: false,
    special: false
  });

  const toggleSection = (section) => {
    setActiveSections({
      ...activeSections,
      [section]: !activeSections[section]
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Hotel Policies</Text>
      
      {/* Check-In/Out Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('checkInOut')}>
          <Card.Title
            title="Check-In & Check-Out"
            left={(props) => <Icon {...props} name="access-time" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.checkInOut ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.checkInOut}>
          <Card.Content>
            <View style={styles.policyItem}>
              <Icon name="login" size={20} color="#00ADB5" style={styles.itemIcon} />
              <Text style={styles.policyText}>Check-in: {mergedRules.checkInTime}</Text>
            </View>
            <View style={styles.policyItem}>
              <Icon name="logout" size={20} color="#00ADB5" style={styles.itemIcon} />
              <Text style={styles.policyText}>Check-out: {mergedRules.checkOutTime}</Text>
            </View>
            {mergedRules.earlyCheckIn && (
              <View style={styles.policyItem}>
                <Icon name="alarm-add" size={20} color="#00ADB5" style={styles.itemIcon} />
                <Text style={styles.policyText}>Early check-in: {mergedRules.earlyCheckIn}</Text>
              </View>
            )}
          </Card.Content>
        </Collapsible>
      </Card>

      {/* Children Policy Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('children')}>
          <Card.Title
            title="Children Policy"
            left={(props) => <Icon {...props} name="child-friendly" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.children ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.children}>
          <Card.Content>
            <Text style={styles.policyText}>{mergedRules.childrenPolicy}</Text>
          </Card.Content>
        </Collapsible>
      </Card>

      {/* Pet Policy Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('pets')}>
          <Card.Title
            title="Pet Policy"
            left={(props) => <Icon {...props} name="pets" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.pets ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.pets}>
          <Card.Content>
            <Text style={styles.policyText}>{mergedRules.petPolicy}</Text>
          </Card.Content>
        </Collapsible>
      </Card>

      {/* Smoking Policy Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('smoking')}>
          <Card.Title
            title="Smoking Policy"
            left={(props) => <Icon {...props} name="smoke-free" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.smoking ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.smoking}>
          <Card.Content>
            <Text style={styles.policyText}>{mergedRules.smokingPolicy}</Text>
          </Card.Content>
        </Collapsible>
      </Card>

      {/* Payment Methods Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('payments')}>
          <Card.Title
            title="Payment Methods"
            left={(props) => <Icon {...props} name="credit-card" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.payments ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.payments}>
          <Card.Content>
            <View style={styles.paymentMethods}>
              {mergedRules.paymentMethods.map((method, index) => (
                <View key={index} style={styles.paymentMethod}>
                  <Icon 
                    name={method.toLowerCase().includes('visa') ? 'credit-card' : 
                          method.toLowerCase().includes('cash') ? 'money' : 'credit-card'}
                    size={20} 
                    color="#00ADB5" 
                  />
                  <Text style={styles.paymentText}>{method}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Collapsible>
      </Card>

      {/* Cancellation Policy Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('cancellation')}>
          <Card.Title
            title="Cancellation Policy"
            left={(props) => <Icon {...props} name="cancel" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.cancellation ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.cancellation}>
          <Card.Content>
            <Text style={styles.policyText}>{mergedRules.cancellationPolicy}</Text>
          </Card.Content>
        </Collapsible>
      </Card>

      {/* Special Instructions Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleSection('special')}>
          <Card.Title
            title="Special Instructions"
            left={(props) => <Icon {...props} name="info" size={24} color="#00ADB5" />}
            right={(props) => <Icon {...props} name={activeSections.special ? 'expand-less' : 'expand-more'} size={24} color="#00ADB5" />}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!activeSections.special}>
          <Card.Content>
            <Text style={styles.policyText}>{mergedRules.specialInstructions}</Text>
          </Card.Content>
        </Collapsible>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#222831',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#393E46',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    marginRight: 12,
  },
  policyText: {
    color: '#EEEEEE',
    fontSize: 15,
    lineHeight: 22,
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222831',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  paymentText: {
    color: '#EEEEEE',
    marginLeft: 6,
    fontSize: 14,
  },
});

export default HotelRules;