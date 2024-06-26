import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../contexts/AuthContext';
import { HERE_API_KEY } from '../services/config';
import axios from 'axios';
import api from '../services/api';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaxiNavbar from '../components/TaxiNavbar';

const TaxiHomePage = ({ navigation }) => {
  const { logout, getInfos, setinfos } = useAuth();
  const [location, setLocation] = useState();
  const [currentPlace, setCurrentPlace] = useState();
  const [availableSeats, setAvailableSeats] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [taxi, setTaxi] = useState([]);
  const [ride, setRide] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const infos = await getInfos();
      if (infos) {
        setRide(infos.ride);
        setTaxi(infos.taxi);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00001,
        longitudeDelta: 0.00001,
      });

      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserId(JSON.parse(user).id);
      } else console.log("no user");
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

  const handleCreateRide = async () => {
    try {
      const rideData = {
        taxiId: userId,
        availableSeats: parseInt(availableSeats, 10),
        basePrice: parseFloat(basePrice),
        startLocation: currentPlace.description,
        endLocation: destination
      };

      const response = await api.post('/rides/create', rideData);
      const taxi = response.data.taxiId;
      const rides = response.data.id;

      setinfos(taxi, rides);

      navigation.navigate('ClientList', { ride: rides, taxi: taxi });
    } catch (error) {
      console.error('Error creating ride:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TaxiNavbar navigation={navigation} taxi={taxi} rides={ride} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Text style={styles.title}>Accueil Taxi</Text>
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
          placeholder="Nombre de places disponibles"
          keyboardType="numeric"
          value={availableSeats}
          onChangeText={setAvailableSeats}
        />
        <TextInput
          style={styles.input}
          placeholder="Prix de base"
          keyboardType="numeric"
          value={basePrice}
          onChangeText={setBasePrice}
        />
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
        <TouchableOpacity onPress={handleCreateRide} style={styles.createButton}>
          <Text style={styles.createButtonText}>Créer un trajet</Text>
        </TouchableOpacity>
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
  createButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaxiHomePage;
