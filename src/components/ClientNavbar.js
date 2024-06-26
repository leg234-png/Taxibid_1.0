import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ClientNavbar = ({ navigation , destination, location}) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClientProfile')}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() =>  navigation.navigate('TaxiList', { currentLocation: location, destination})}>
        <Text style={styles.navText}>My taxis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('wallet')}>
        <Text style={styles.navText}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Help')}>
        <Text style={styles.navText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#343a40',
  },
  navItem: {
    paddingHorizontal: 10,
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientNavbar;
