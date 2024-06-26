import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Importez useAuth depuis AuthContext
import { loginStyles as styles } from '../styles/LoginStyles';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Utilisez useAuth pour obtenir la fonction login de AuthContext

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const userData = response.data;


      if (userData.token) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', userData.token);

      }
        else {
          Alert.alert('no token')
        }

      login(userData); // Mettez à jour l'état d'authentification via la fonction login de AuthContext
      
      if (userData.user.role === 'taxi') {
        navigation.navigate('TaxiHomePage');
      } else {
        navigation.navigate('ClientHomePage');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      } else {
        console.error('Error during login:', error);
        Alert.alert('An error occurred', 'Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://img.freepik.com/vecteurs-libre/cadre-taxi-cercle-damier_78370-3172.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1714089600&semt=ais' }} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;