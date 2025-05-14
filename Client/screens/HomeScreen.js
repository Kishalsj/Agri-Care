import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Modal,
  Pressable,
  Animated,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import axios from 'axios';
import * as Haptics from 'expo-haptics';

import Camera from '../components/Camera';
import { BASE_URL } from '../constants';

const { width, height } = Dimensions.get('screen');

const Home = () => {
  const [prediction, setPrediction] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const [tipOfTheDay, setTipOfTheDay] = useState("");
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  // Animation for welcome banner
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Set up tip of the day
    const tips = [
      "Water your plants in the early morning to reduce evaporation.",
      "Rotate your crops to prevent soil depletion and reduce pest issues.",
      "Consider companion planting to naturally deter pests.",
      "Mulching helps retain soil moisture and suppress weeds.",
      "Test your soil regularly to understand its nutrient content."
    ];
    setTipOfTheDay(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const onUpload = async (image) => {
    setSelectedImage(image.uri);
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const data = new FormData();
    data.append('file', image);

    try {
      const response = await axios.post(`${BASE_URL}/api/predict`, data);
      if (response) {
        setPrediction(response.data);
        // Add to recent scans
        const newScan = {
          id: Date.now().toString(),
          image: image.uri,
          result: response.data.prediction,
          date: new Date().toLocaleDateString()
        };
        setRecentScans(prev => [newScan, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      console.log(err.message);
      alert('Error during prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearPrediction = () => {
    setPrediction(null);
    setSelectedImage('');
  };

  const PositivePrediction = () => (
    <View style={styles.predictionContainer}>
      <Text style={styles.predictionTitle}>Prediction Results</Text>
      <Ionicons name='md-warning' size={72} color='#e24d4d' />
      <Text style={styles.predictionText}>
        Your Plant May Be At Risk!
      </Text>
      <Text style={styles.conditionText}>
        Condition: {prediction?.prediction}
      </Text>
      {/* <Text style={styles.accuracyText}>
        Accuracy: {prediction?.probability}%
      </Text> */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Detailed Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newScanButton}
          onPress={clearPrediction}
        >
          <Text style={styles.buttonText}>New Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const PredictionImage = () => (
    <View style={styles.imagePreviewContainer}>
      <Image
        source={{
          uri: selectedImage || 'https://i.ibb.co/qF8qRnK/upload-1.png',
        }}
        resizeMode='cover'
        style={styles.thumb}
      />
      {selectedImage && !prediction && !loading && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={clearPrediction}
        >
          <AntDesign name="close" size={18} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );

  const PredictionScreen = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#71b79c" />
          <Text style={styles.loadingText}>Analyzing your plant...</Text>
        </View>
      );
    } else if (prediction?.prediction) {
      return <PositivePrediction />;
    } else {
      return <PredictionImage />;
    }
  };

  const TipOfTheDay = () => (
    <View style={styles.tipContainer}>
      <View style={styles.tipHeader}>
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#FFD700" />
        <Text style={styles.tipTitle}>Tip of the Day</Text>
      </View>
      <Text style={styles.tipText}>{tipOfTheDay}</Text>
    </View>
  );

  const RecentScans = () => {
    if (recentScans.length === 0) return null;
    
    return (
      <View style={styles.recentScansContainer}>
        <Text style={styles.recentScansTitle}>Recent Scans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScansScroll}>
          {recentScans.map(scan => (
            <TouchableOpacity 
              key={scan.id} 
              style={styles.recentScanItem}
              onPress={() => {
                setSelectedImage(scan.image);
                setPrediction({ prediction: scan.result, probability: "Previously Scanned" });
              }}
            >
              <Image source={{ uri: scan.image }} style={styles.recentScanImage} />
              <Text style={styles.recentScanResult} numberOfLines={1}>{scan.result}</Text>
              <Text style={styles.recentScanDate}>{scan.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const DetailedModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Detailed Analysis</Text>
          
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="cover"
          />
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Condition:</Text>
              <Text style={styles.detailValue}>{prediction?.prediction}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Confidence:</Text>
              <Text style={styles.detailValue}>{prediction?.probability}%</Text>
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Possible Causes</Text>
              <Text style={styles.sectionContent}>
                • Fungal infection due to high humidity{"\n"}
                • Insufficient air circulation{"\n"}
                • Overwatering or poor drainage{"\n"}
                • Soil contamination
              </Text>
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Recommended Actions</Text>
              <Text style={styles.sectionContent}>
                • Remove affected leaves immediately{"\n"}
                • Apply fungicide treatment{"\n"}
                • Improve air circulation around plants{"\n"}
                • Adjust watering schedule{"\n"}
                • Consider soil testing
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.treatmentButton}
            onPress={() => {
              setModalVisible(false);
              // Here you would navigate to treatment screen
              alert("Treatment guide would open here");
            }}
          >
            <Text style={styles.treatmentButtonText}>View Treatment Guide</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#71b79c" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={styles.logoContainer}>
            <Entypo name="leaf" size={32} color="#ffffff" />
            <Text style={styles.logoText}>Agri-Care</Text>
          </View>
          <Text style={styles.headerSubtitle}>Plant Health Assistant</Text>
          
        </Animated.View>

        <View style={styles.mainCard}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Detect Plant Diseases Instantly</Text>
            <Text style={styles.welcomeText}>
              Take a photo of your plant and our AI will analyze it for potential diseases and provide treatment recommendations.
            </Text>
          </View>

          <TipOfTheDay />
          
          <View style={styles.cameraContainer}>
            <Camera handleUpload={onUpload} />
          </View>
          
          <View style={styles.predictionArea}>
            <PredictionScreen />
          </View>
          
          <RecentScans />
        </View>
      </ScrollView>
      <DetailedModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#71b79c',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 5,
  },
  mainCard: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  welcomeSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#4c5a55',
    lineHeight: 24,
  },
  tipContainer: {
    backgroundColor: '#fffcf0',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FFD700',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4c5a55',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 15,
    color: '#4c5a55',
    lineHeight: 22,
  },
  cameraContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
  },
  predictionArea: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  thumb: {
    borderRadius: 15,
    width: width * 0.7,
    height: width * 0.7,
    marginVertical: 10,
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#71b79c',
  },
  predictionContainer: {
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  predictionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 15,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e24d4d',
    marginVertical: 10,
  },
  conditionText: {
    fontSize: 16,
    color: '#4c5a55',
    marginVertical: 5,
  },
  accuracyText: {
    fontSize: 16,
    color: '#4c5a55',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  reportButton: {
    backgroundColor: '#71b79c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  newScanButton: {
    backgroundColor: '#4c5a55',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recentScansContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  recentScansTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 15,
  },
  recentScansScroll: {
    flexDirection: 'row',
  },
  recentScanItem: {
    width: 120,
    marginRight: 15,
    alignItems: 'center',
  },
  recentScanImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  recentScanResult: {
    fontSize: 14,
    color: '#e24d4d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recentScanDate: {
    fontSize: 12,
    color: '#4c5a55',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e5540',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4c5a55',
  },
  detailValue: {
    fontSize: 16,
    color: '#e24d4d',
    fontWeight: 'bold',
  },
  detailSection: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 15,
    color: '#4c5a55',
    lineHeight: 22,
  },
  treatmentButton: {
    backgroundColor: '#71b79c',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  treatmentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;