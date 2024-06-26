import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

const ClientDetailList = ({ route, navigation }) => {
  const { ride,taxi } = route.params;
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get(`/bids/clients/${ride}`); // permet d'afficher les clients qui ont selectionnes le taxi
        setClients(response.data); // voici la liste des bids(encheres) qui ont ete cree lorsque un client clique sur enchere , cette liste contient userid et rideid
       console.log(response.data)
      } catch (error) {
        console.error('Error fetching clients:', error.message);
      }
    };
    fetchClients();
  }, [taxi]); // ca c'est l'id du taxi

  const handleClientSelect = async (client) => {
    setSelectedClients((prevSelected) => {
      if (prevSelected.includes(client.id)) {
        return prevSelected.filter((id) => id !== client.id);
      } else {
        return [...prevSelected, client.id];
      }
    });

    try {
      await api.post(`/rides/notify-client/${client.id}`); // cette fonction permet d'envoyer une notification au client selectionnne mais ne marche pas encore 
    } catch (error) {
      console.error('Error notifying client:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des clients</Text>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClientSelect(item)}>
            <Card style={[styles.clientCard, selectedClients.includes(item.id) && styles.selectedCard]}>
              <View style={styles.clientInfo}>
                <Icon name="person" size={40} color={selectedClients.includes(item.id) ? "#fff" : "#000"} />
                <View style={styles.clientDetails}>
                  <Text style={[styles.clientName, selectedClients.includes(item.id) && styles.selectedText]}>{item.username}</Text>
                  <Text style={[styles.clientEmail, selectedClients.includes(item.id) && styles.selectedText]}>{item.email}</Text>
                  <Text style={[styles.clientPrice, selectedClients.includes(item.id) && styles.selectedText]}>Prix: {item.currentPrice} FCFA</Text>
                </View>
                {selectedClients.includes(item.id) && (
                  <Icon name="check-circle" size={30} color="white" />
                )}
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clientCard: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#28a745',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientDetails: {
    marginLeft: 15,
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientEmail: {
    fontSize: 14,
    color: '#6c757d',
  },
  clientPrice: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
});

export default ClientDetailList;
