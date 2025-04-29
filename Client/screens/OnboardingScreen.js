import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// --- Updated slides array ---
const slides = [
  {
    id: '1',
    title: 'Welcome to Agri-Care',
    description: 'Discover all the amazing features our app has to offer.',
    image: require('../assets/welcome-agricare.png'), // Replace with your actual image
  },
  {
    id: '2',
    title: 'Login Easily',
    description: 'Sign in quickly and securely to access your personalized dashboard.',
    image: require('../assets/login-agricare.png'), // Replace with your actual image
  },
  {
    id: '3',
    title: 'How It Works',
    description: 'Capture or upload a plant image and receive disease detection and treatment tips.',
    image: require('../assets/howitworks-agricare.png'), // Replace with your actual image
  },
  {
    id: '4',
    title: 'Let’s Get Started!',
    description: 'Join the community and start growing healthier plants today.',
    image: require('../assets/getstart-agricare.png'), // Replace with your actual image
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
    //   await AsyncStorage.setItem('@onboarding_complete', 'true');
      navigation.replace('WelcomeScreen'); // Adjust this if your next screen is different
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Animated.View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </Animated.View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
                currentIndex === i && styles.activeDot,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.backgroundCircle} />

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={completeOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
      />

      <Paginator />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={scrollTo}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#71b79c',
    opacity: 0.1,
    top: -width * 0.5,
    left: -width * 0.25,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#414143',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#71717a',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#71b79c',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#414143',
  },
  bottomContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#71b79c',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#414143',
    fontWeight: '600',
  },
});

export default OnboardingScreen;
