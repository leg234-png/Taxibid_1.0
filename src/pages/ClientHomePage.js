import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../contexts/AuthContext';
import { HERE_API_KEY } from '../services/config';
import axios from 'axios';
import api from '../services/api.js'
import * as Location from 'expo-location';
import ClientNavbar from '../components/ClientNavbar.js';

const ClientHome = ({ navigation }) => {
  const { logout, user } = useAuth(); // assuming useAuth provides user details
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('mokolo');
  const [currentPlace, setCurrentPlace] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => { 
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleLogout = () => {
    logout();
    navigation.navigate('LoginPage');
  };

  const onRegionChangeComplete = async (region) => {
    try {
      const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${region.latitude},${region.longitude}&apiKey=${HERE_API_KEY}`);
      const address = response.data.items[0].address.label;
      setCurrentPlace({
        description: address,
        latitude: region.latitude,
        longitude: region.longitude,
      });
    } catch (error) {
      console.error('Error fetching location data:', error.message);
    }
  };

  const handleDestinationChange = async (text) => {
    setDestination(text);
    if (text.length > 5) {
      try {
        const response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${text}&apiKey=${HERE_API_KEY}`);
        setSuggestions(response.data.items);
      } catch (error) {
        console.error('Error fetching suggestions:', error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setDestination(suggestion.address.label);
    setSuggestions([]);
  };

  const handleBid = async () => {
    try {
      await api.post(`/auth/updateLocation`, {
        userId: user.id, 
        latitude: currentPlace.latitude,
        longitude: currentPlace.longitude, 
        destination: destination
      });
      navigation.navigate('TaxiList', { currentLocation: location, destination });
    } catch (error) {
      console.error('Error updating user location:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ClientNavbar navigation={navigation} location={location} destination={destination}/>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Text style={styles.title}>Accueil</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <Marker coordinate={location} title="Vous êtes ici" />
        </MapView>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrer votre destination"
          value={destination}
          onChangeText={handleDestinationChange}
        />
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
              <Text style={styles.suggestion}>{item.address.label}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={handleBid} style={styles.bidButton}>
          <Text style={styles.bidButtonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        {currentPlace && (
          <>
            <Text style={styles.infoText}>Adresse: {currentPlace.description}</Text>
            <Text style={styles.infoText}>Latitude: {currentPlace.latitude}</Text>
            <Text style={styles.infoText}>Longitude: {currentPlace.longitude}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderBottomWidth: 1,
    borderBottomColor: '#388E3C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  bidButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bidButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default ClientHome;
