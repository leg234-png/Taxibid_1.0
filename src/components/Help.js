import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Help = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Aide</Text>
      <Text style={styles.text}>
        Bienvenue dans la section d'aide. Ici, vous trouverez des réponses aux questions fréquemment posées et des conseils pour utiliser l'application.
      </Text>
      <Text style={styles.subtitle}>Questions fréquentes</Text>
      <Text style={styles.text}>1. Comment créer un compte?</Text>
      <Text style={styles.text}>2. Comment réserver un taxi?</Text>
      <Text style={styles.text}>3. Comment voir l'historique de mes courses?</Text>
      <Text style={styles.text}>4. Que faire en cas de problème avec une course?</Text>
      <Text style={styles.text}>Si vous avez besoin de plus d'aide, n'hésitez pas à contacter notre support.</Text>
    </ScrollView>
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Help;
