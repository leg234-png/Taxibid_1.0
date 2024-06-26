import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ClientProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil du Client</Text>
      <Text style={styles.label}>Nom du client:</Text>
      <Text style={styles.text}>Jane Smith</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>janesmith@example.com</Text>
      <Text style={styles.label}>Numéro de téléphone:</Text>
      <Text style={styles.text}>+1234567890</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier le profil</Text>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ClientProfile;
