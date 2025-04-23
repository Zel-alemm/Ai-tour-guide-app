import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerContent from './frontend/components/DrawerContent';
import HomeScreen from './frontend/screens/HomeScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import AuthScreen from './frontend/screens/AuthScreen';
import ProfileSettingsScreen from './frontend/screens/ProfileSettingsScreen';
import Header from './frontend/components/Header';
import DestinationScreen from './frontend/screens/DestinationsScreen';
import FacilityScreen from './frontend/screens/FacilityScreen';
import AboutScreen from './frontend/screens/AboutScreen';
import EventsScreen from './frontend/screens/EventsScreen';
import SearchScreen from './frontend/screens/SearchScreen';
import FilterHotel from './frontend/screens/FilterHotel';
import FilteredHotels from './frontend/screens/FilteredHotels';
import HotelDetails from './frontend/screens/HotelDetails';
import HotelLodges from './frontend/screens/HotelLodges';

import BookingScreen from './frontend/screens/BookingScreen';
import ReserveScreen from './frontend/screens/ReserveScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <Header 
            navigation={navigation} 
            route={route}
            isLoggedIn={isLoggedIn}
            user={user}
          />
        ),
      })}
    >
      <Stack.Screen 
        name="Home"
        options={{ title: 'Visit Amhara' }}
      >
        {props => <HomeScreen {...props} isLoggedIn={isLoggedIn} user={user} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Profile"
        options={{ title: 'My Profile' }}
      >
        {props => (
          <ProfileScreen 
            {...props} 
            isLoggedIn={isLoggedIn} 
            user={user}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="Auth"
        options={{ 
          headerShown: true,
          title: 'Login / Sign Up' 
        }}
      >
        {props => (
          <AuthScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="ProfileSettingsScreen"
        options={{ title: 'Profile Settings' }}
      >
        {props => (
          <ProfileSettingsScreen
            {...props}
            user={user}
            setUser={setUser}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="BookingScreen"
        options={{ title: 'My Booking' }}
      >
        {props => (
          <BookingScreen
            {...props}
            user={user}
            setUser={setUser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen 
        name="ReserveScreen"
        options={{ title: 'Reservation' }}
      >
        {props => (
          <ReserveScreen
            {...props}
            user={user}
            setUser={setUser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen 
        name="Destination"
        component={DestinationScreen}
        options={{ title: 'Destinations' }}
      />
      <Stack.Screen 
        name="Facility"
        component={FacilityScreen}
        options={{ title: 'Tourist Facilities' }}
      />
      <Stack.Screen 
        name="FilterHotel"
        component={FilterHotel}
        options={{ title: 'Hotel Filters' }}
      />
      <Stack.Screen 
        name="FilteredHotels"
        component={FilteredHotels}
        options={{ title: 'Filtered Hotels' }}
      />
      <Stack.Screen 
        name="HotelDetails"
        component={HotelDetails}
        options={{ title: 'Hotel Details' }}
      />
       <Stack.Screen 
        name="HotelLodges"
        component={HotelLodges}
        options={{ title: 'Hotel Details' }}
      />

      <Stack.Screen 
        name="About"
        component={AboutScreen}
        options={{ title: 'About Us' }}
      />
      <Stack.Screen 
        name="Events"
        component={EventsScreen}
        options={{ title: 'Events' }}
      />
      <Stack.Screen 
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search Results' }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContent 
            {...props}
            isLoggedIn={isLoggedIn}
            user={user}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        )}
        drawerStyle={{
          width: 300,
          backgroundColor: '#222831',
        }}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen 
          name="Main"
          options={{ title: 'Visit Amhara' }}
        >
          {props => (
            <MainStack
              {...props}
              isLoggedIn={isLoggedIn}
              user={user}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}