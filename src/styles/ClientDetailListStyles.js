import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    availableSeats: {
      fontSize: 16,
      marginBottom: 10,
    },
    clientItem: {
      padding: 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ced4da',
      marginBottom: 10,
    },
    selectedClientItem: {
      backgroundColor: '#e9ecef',
    },
    clientName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    clientDestination: {
      fontSize: 14,
      color: '#6c757d',
    },
    confirmButton: {
      backgroundColor: '#28a745',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    confirmButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  export default styles;