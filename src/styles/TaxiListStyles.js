import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  taxiItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taxiInfo: {
    flex: 1,
  },
  taxiName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taxiPrice: {
    fontSize: 16,
    color: '#666',
  },
  taxiSeats: {
    fontSize: 16,
    color: '#666',
  },
  taxiId: {
    fontSize: 14,
    color: '#999',
  },
  rideId: {
    fontSize: 14,
    color: '#999',
  },
  bidButtonText: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
});
