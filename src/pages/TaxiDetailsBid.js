import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Modal, TextInput, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/TaxiDetailsBidStyles';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const TaxiDetailsBid = ({ route }) => {
  const { user } = useAuth();
  const { taxi, bid, ride } = route.params;
  const [clients, setClients] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [timeRemaining, setTimeRemaining] = useState(bid.tempsRestant);
  const [modalVisible, setModalVisible] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const clientIdRef = useRef(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [priceColors, setPriceColors] = useState({});

  useEffect(() => {
    fetchClients();

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          navigation.navigate('TaxiList');
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigation]);

  const fetchClients = async () => {
    try {
      clientIdRef.current = bid.userid;
      const response = await api.get(`/bids/clients-with-accepted-bids/${ride.id}`);
      if (response.status === 200) {
        setClients(response.data);
      } else {
        console.error('Erreur: réponse de l\'API vide ou non valide');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await api.patch(`/bids/${bid.id}/update-user-price`);
      const response = await api.get(`/bids/clients-with-accepted-bids/${ride.id}`);
      if (response.status === 200) {
        const newClients = response.data;
        const newPriceColors = {};

        newClients.forEach((newClient) => {
          const oldClient = clients.find(client => client.id === newClient.id);
          if (oldClient) {
            if (newClient.currentPrice > oldClient.currentPrice) {
              newPriceColors[newClient.id] = 'green';
            } else if (newClient.currentPrice < oldClient.currentPrice) {
              newPriceColors[newClient.id] = 'red';
            }
          }
        });

        setClients(newClients);
        setPriceColors(newPriceColors);

        setTimeout(() => {
          setPriceColors({});
        }, 5000);
      } else {
        console.error('Erreur: réponse de l\'API vide ou non valide');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prix:', error);
    }
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails du Taxi</Text>
      <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Actualiser</Text>
      </TouchableOpacity>
      <View style={styles.taxiInfoContainer}>
        <Text style={styles.taxiPrice}>Prix de base: {ride.basePrice} FCFA</Text>
        <Text style={styles.taxiSeats}>Places disponibles: {ride.availableSeats} places restants</Text>
      </View>
      <Text style={styles.bidsTitle}> Enchères des Clients</Text>
      <Text style={styles.timeRemaining}>Temps restant: {formatTime(timeRemaining)}</Text>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.bidItem,
            item.id === clientIdRef.current && styles.userBidItem
          ]}>
            <Text style={styles.bidClient}>{item.username}</Text>
            <Text style={styles.bidPrice}>Email: {item.email}</Text>
            <Text style={[styles.bidAmount, { color: priceColors[item.id] || 'black' }]}>
              Prix: {item.currentPrice} FCFA
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.bidButton}>
        <Text style={styles.bidButtonText}>Enchérir</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Placer une Enchère</Text>
            <TextInput
              style={styles.bidInput}
              placeholder="Entrer votre prix"
              keyboardType="numeric"
              value={bidPrice}
              onChangeText={(text) => setBidPrice(text)}
            />
            <View style={styles.buttonContainer}>
              {[50, 100, 500, 1000].map((amount) => (
                <TouchableOpacity key={amount} style={styles.priceButton} onPress={() => setBidPrice((prevPrice) => (parseFloat(prevPrice) + amount).toString())}>
                  <Text style={styles.priceButtonText}>+{amount} FCFA</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={async () => {
              try {
                const response = await api.post('/bids/place', {
                  rideId: ride.id,
                  clientId: user.id,
                  price: parseFloat(bidPrice),
                });

                if (response.status === 200) {
                  await fetchClients();
                  setModalVisible(false);
                } else {
                  console.error('Erreur lors de la soumission de l\'enchère');
                }
              } catch (error) {
                console.error('Erreur lors de la soumission de l\'enchère:', error);
              }
            }}>
              <Text style={styles.submitButtonText}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaxiDetailsBid;
