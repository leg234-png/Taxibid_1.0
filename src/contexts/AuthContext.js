import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem} from '../Utils/AsyncStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [taxi, setTaxiInfo] = useState(null);
  const [ride, setRideInfo] = useState(null);

  useEffect(() => {

    const retrieveData = async () => {
      try {
        const storedUser = await getItem('user');
        const storedToken = await getItem('token');
       

        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error.message);
      }
    };
    retrieveData();
  }, []);

  const login = async (userData, token) => {
    try {
      setUser(userData.user);
      setToken(userData.token);

      await setItem('user', userData.user);
      await setItem('token', userData.token);
    } catch (error) {
      console.error('Error saving user and token to AsyncStorage:', error.message);
    }
  };
  
  const setinfos = async (taxi, ride) => {
    try {
      // Vérifiez les valeurs de taxi et ride avant de les enregistrer
      if (!taxi || !ride) {
        console.error('Taxi or ride is undefined or null');
        return;
      }
      
      // Ajouter des journaux de débogage pour vérifier les valeurs
      console.log("Setting taxi info:", taxi);
      console.log("Setting ride info:", ride);
  
      setTaxiInfo(taxi);
      setRideInfo(ride);
  
      await setItem('ride', ride);
      await setItem('taxi', taxi);
      console.log("Bien enregistrer taxi et rides");
      console.log("Ride ==", ride);
      console.log("Taxi ==", taxi);
      
    } catch (error) {
      console.error('Error saving ride and taxi to AsyncStorage:', error.message);
    }
  };
  

  const getInfos = async () => {
    try {
      const ride = await getItem('ride');
      const taxi = await getItem('taxi');
  
      if (ride !== null && taxi !== null) {
       
        console.log("Ride:", ride);
        console.log("Taxi:", taxi);
        return { ride, taxi };
      } else {
        console.log("Ride ou Taxi n'existe pas dans l'AsyncStorage");
        return null;
      }
    } catch (error) {
      console.error('Error retrieving ride and taxi from AsyncStorage:', error.message);
    }
  };


  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await removeItem('user');
      await removeItem('token');
    } catch (error) {
      console.error('Error removing user and token from AsyncStorage:', error.message);
    }
  };

  const updateTaxiInfo = async (taxi) => {
    try {
      setTaxiInfo(taxi);
      await setItem('taxi', taxi);
      console.log("bien enregistrer taxi")
    } catch (error) {
      console.error('Error updating taxi info in AsyncStorage:', error.message);
    }
  };

  const clearTaxiInfo = async () => {
    try {
      setTaxiInfo(null);
      setRideInfo(null)
      await removeItem('taxi');
      await removeItem('ride');
    } catch (error) {
      console.error('Error removing taxi and ride  info from AsyncStorage:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, taxi, login, logout, updateTaxiInfo, clearTaxiInfo ,ride, setinfos,getInfos }}>
      {children}
    </AuthContext.Provider>
  );
};
