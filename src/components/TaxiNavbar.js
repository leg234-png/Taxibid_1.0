import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaxiNavbar = ({ navigation, taxi, rides }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('About')}>
        <Text style={styles.navText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('wallet')}>
        <Text style={styles.navText}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClientList', { ride: rides , taxi : taxi })}>
        <Text style={styles.navText}>My Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TaxiProfile')}>
        <Text style={styles.navText}>Profile</Text>
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

export default TaxiNavbar;
