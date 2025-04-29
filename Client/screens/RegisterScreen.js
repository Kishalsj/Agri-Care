import React, { useState, useEffect, useRef } from 'react';
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
  ScrollView,
  Alert
} from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../constants';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollViewRef = useRef();

  useEffect(() => {
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

  const onRegisterSubmit = async () => {
    try {
      setIsLoading(true);
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      // Validation
      if (!fullname) {
        setIsLoading(false);
        return setFullnameError('*Required');
      }
      if (!email) {
        setIsLoading(false);
        return setEmailError('*Required');
      } else if (!reg.test(email)) {
        setIsLoading(false);
        return setEmailError('Enter valid email address');
      }
      if (!password) {
        setIsLoading(false);
        return setPasswordError('*Required');
      } else if (password.length < 6) {
        setIsLoading(false);
        return setPasswordError('Password must be at least 6 characters');
      }

      const response = await axios.post(`${BASE_URL}/api/users`, {
        email,
        fullname,
        password,
      });

      if (response.data) {
        Alert.alert(
          'Success',
          'Account registration successful',
          [
            { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
          ]
        );
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (err) {
      Alert.alert(
        'Error', 
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetFullnameErrors = () => {
    setFullnameError('');
  };

  const resetEmailErrors = () => {
    setEmailError('');
  };

  const resetPasswordErrors = () => {
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const focusNextField = (nextField) => {
    nextField?.current?.focus();
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
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
              <Text style={styles.header}>REGISTER</Text>
              <View style={styles.underline} />
              <Image
                source={require('../assets/profilepic.png')}
                resizeMode='contain'
                style={styles.avatar}
              />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color="#71b79c" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='Full Name'
                  placeholderTextColor='#9B9B9B'
                  onChangeText={setFullname}
                  onFocus={resetFullnameErrors}
                  value={fullname}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(emailRef)}
                  blurOnSubmit={false}
                />
              </View>
              {fullnameError ? (
                <Text style={styles.errorMsg}>{fullnameError}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#71b79c" style={styles.inputIcon} />
                <TextInput
                  ref={emailRef}
                  style={styles.input}
                  placeholder='Email'
                  placeholderTextColor='#9B9B9B'
                  onChangeText={setEmail}
                  onFocus={resetEmailErrors}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(passwordRef)}
                  blurOnSubmit={false}
                />
              </View>
              {emailError ? (
                <Text style={styles.errorMsg}>{emailError}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#71b79c" style={styles.inputIcon} />
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder='Password'
                  placeholderTextColor='#9B9B9B'
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  onFocus={resetPasswordErrors}
                  value={password}
                  returnKeyType="done"
                  onSubmitEditing={onRegisterSubmit}
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

              <TouchableOpacity 
                style={[
                  styles.button, 
                  isLoading && styles.buttonDisabled
                ]} 
                onPress={onRegisterSubmit}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER'}
                </Text>
              </TouchableOpacity>

              <View style={styles.linkContainer}>
                <Text style={styles.loginText}>Already a Member? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.linkText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
  logo: {
    width: width * 0.7,
    height: 150,
    marginBottom: 20,
  },
});

export default RegisterScreen;