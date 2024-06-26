import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Wallet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portefeuille</Text>
      <Text style={styles.balance}>Solde: 150.00 EUR</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ajouter des fonds</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Voir les transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balance: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Wallet;
