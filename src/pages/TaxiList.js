import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import styles from '../styles/TaxiListStyles';
import { useAuth } from '../contexts/AuthContext';

const TaxiList = ({ route }) => {
  const navigation = useNavigation();
  const { currentLocation, destination } = route.params;
  const [taxis, setTaxis] = useState([]);
  const [rides, setRides] = useState([]);
  const { user } = useAuth();
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await api.post('/rides/taxis/filter', {
          currentLongitude: currentLocation.longitude,
          currentLatitude: currentLocation.latitude,
          destination,
          distance: 1000
        });

        const resp = await api.post('/rides/filter', {
          currentLongitude: currentLocation.longitude,
          currentLatitude: currentLocation.latitude,
          destination,
          distance: 1000
        });

        setTaxis(response.data);
        setRides(resp.data);
      } catch (error) {
        console.error('Error fetching filtered taxis:', error.message);
      }
    };

    fetchTaxis();
  }, [currentLocation, destination]);

  const handleTaxiPress = async (ride, taxi) => {
    try {
      const bidCheckResponse = await api.get(`/bids/check?rideId=${ride.id}&userId=${user.id}`);
      if (bidCheckResponse.data.exists) {
        navigation.navigate('TaxiDetailsBid', { ride, bid: bidCheckResponse.data.bid, taxi });
      } else {
        const bidCreateResponse = await api.post('/bids/create', {
          rideId: ride.id,
          userId: user.id,
          bidAmount: ride.basePrice
        });
        navigation.navigate('TaxiDetailsBid', { ride, bid: bidCreateResponse.data, taxi });
      }
    } catch (error) {
      console.error('Error handling bid:', error.message);
    }
  };

  useEffect(() => {
    const data = rides.map(ride => {
      const taxi = taxis.find(taxi => taxi.id === ride.taxiId);
      return {
        ride: ride,
        taxi: taxi
      };
    });
    setCombinedData(data);
  }, [taxis, rides]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Taxis Disponibles</Text>
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item.ride.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taxiItem} onPress={() => handleTaxiPress(item.ride, item.taxi)}>
            <View style={styles.taxiInfo}>
              <Text style={styles.taxiName}>{item.taxi.username}</Text>
              <Text style={styles.taxiPrice}>Prix de base: {item.ride.basePrice} FCFA</Text>
              <Text style={styles.taxiSeats}>Places disponibles: {item.ride.availableSeats}</Text>
            </View>
            <Text style={styles.bidButtonText}>Enchérir</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TaxiList;
