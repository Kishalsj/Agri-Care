import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../constants';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    getAsyncData();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 5,
        bounciness: 10,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  };

  const getAsyncData = async () => {
    try {
      const data = await AsyncStorage.getItem('@user_data');
      if (data && JSON.parse(data).email) {
        navigation.navigate('HomeScreen');
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
  };

  const onLoginSubmit = async () => {
    try {
      setIsLoading(true);
      setLoginError('');
      
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (!email) {
        setIsLoading(false);
        return setEmailError('*Required');
      } else if (reg.test(email) === false) {
        setIsLoading(false);
        return setEmailError('Enter valid email address');
      }
      if (!password) {
        setIsLoading(false);
        return setPasswordError('*Required');
      }

      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      if (_.isArray(response.data)) {
        await storeData(response.data[0]);
        navigation.navigate('HomeScreen');
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (err) {
      setLoginError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const resetEmailErrors = () => {
    setEmailError('');
    setLoginError('');
  };

  const resetPasswordErrors = () => {
    setPasswordError('');
    setLoginError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Animated.View 
            style={[
              styles.backgroundCircle,
              {
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.1],
                }),
              }
            ]}
          />
          
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Image
              source={require('../assets/logo.png')}
              resizeMode='contain'
              style={styles.logo}
            />
          </Animated.View>

          <Animated.View 
            style={[
              styles.boxContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>LOGIN</Text>
              <View style={styles.underline} />
              <Image
                source={require('../assets/profilepic.png')}
                resizeMode='contain'
                style={styles.avatar}
              />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#71b79c" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  placeholderTextColor='#9B9B9B'
                  onChangeText={setEmail}
                  onFocus={resetEmailErrors}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {emailError ? (
                <Text style={styles.errorMsg}>{emailError}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#71b79c" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  placeholderTextColor='#9B9B9B'
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  onFocus={resetPasswordErrors}
                  value={password}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={togglePasswordVisibility}
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#71b79c" 
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorMsg}>{passwordError}</Text>
              ) : null}

              {loginError ? (
                <Text style={[styles.errorMsg, styles.loginError]}>{loginError}</Text>
              ) : null}

              <TouchableOpacity 
                style={[
                  styles.button, 
                  isLoading && styles.buttonDisabled
                ]} 
                onPress={onLoginSubmit}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                </Text>
              </TouchableOpacity>

              <View style={styles.linkContainer}>
                <Text style={styles.loginText}>Not a Member? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                  <Text style={styles.linkText}>REGISTER</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  backgroundCircle: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#71b79c',
    top: -width * 0.5,
    left: -width * 0.25,
  },
  boxContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#414143',
    marginBottom: 5,
  },
  underline: {
    height: 3,
    width: 50,
    backgroundColor: '#71b79c',
    borderRadius: 3,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#71b79c',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#71b79c',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
    color: '#414143',
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#71b79c',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#a0c8b8',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    color: '#414143',
  },
  linkText: {
    color: '#71b79c',
    fontWeight: '600',
  },
  errorMsg: {
    color: '#e74c3c',
    fontSize: 12,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  loginError: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#71b79c',
    fontSize: 14,
    fontWeight: '500',
  },
  logo: {
    width: width * 0.7,
    height: 150,
    marginBottom: 20,
  },
});

export default LoginScreen;