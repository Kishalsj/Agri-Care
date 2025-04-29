import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonScale: new Animated.Value(1),
      fadeAnim: new Animated.Value(0),
      slideAnim: new Animated.Value(height),
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(this.state.slideAnim, {
        toValue: 0,
        speed: 5,
        bounciness: 10,
        useNativeDriver: true,
      })
    ]).start();
  }

  handlePressIn = () => {
    Animated.spring(this.state.buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.state.buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { buttonScale, fadeAnim, slideAnim } = this.state;
    const { navigation } = this.props;

    return (
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
            <Text style={styles.header}>ARE YOU?</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.button, styles.existingUserButton]}
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={styles.buttonText}>An existing user</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.button, styles.newUserButton]}
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                <Text style={styles.buttonText}>A New User</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

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
  buttonContainer: {
    paddingTop: 25,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  existingUserButton: {
    backgroundColor: '#71b79c',
  },
  newUserButton: {
    backgroundColor: '#414143',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
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
  },
  logo: {
    width: width * 0.7,
    height: 150,
    marginBottom: 20,
  },
});

export default WelcomeScreen;