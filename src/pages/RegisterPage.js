import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import api from '../services/api';
import { registerStyles as styles } from '../styles/registerStyles';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  const [fadeAnim] = useState(new Animated.Value(0));

  const handleRegister = async () => {
    try {
      await api.post('auth/register', { email, password, role , username });
      Alert.alert('Registration Successful', 'You can now log in with your new account.');
      navigation.navigate('LoginPage');
    } catch (error) {
      Alert.alert('Registration Failed', 'Something went wrong. Please try again.');
    }
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <View style={styles.switchContainer}>
        <TouchableOpacity 
          style={[styles.switchButton, role === 'client' && styles.switchButtonActive]}
          onPress={() => setRole('client')}
        >
          <Text style={styles.switchButtonText}>Client</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.switchButton, role === 'taxi' && styles.switchButtonActive]}
          onPress={() => setRole('taxi')}
        >
          <Text style={styles.switchButtonText}>Taxi</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RegisterPage;