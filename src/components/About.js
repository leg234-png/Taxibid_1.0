import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos</Text>
      <Text style={styles.text}>
        Bienvenue dans notre application de taxi. Nous nous efforçons de fournir un service de taxi fiable et de qualité.
      </Text>
      <Text style={styles.text}>
        Notre mission est de rendre le transport facile et accessible pour tous. Nous espérons que vous apprécierez notre service.
      </Text>
      <Text style={styles.text}>
        Pour plus d'informations, veuillez nous contacter à contact@taxiapp.com.
      </Text>
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
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default About;
