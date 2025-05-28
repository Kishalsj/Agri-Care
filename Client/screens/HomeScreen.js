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
  const [showOtherScanner, setShowOtherScanner] = useState(false);
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(0))[0];

  const diseaseInfo = {
    "Pepper__bell___Bacterial_spot": {
      causes: [
        "Xanthomonas bacterial infection",
        "High humidity and warm temperatures",
        "Poor air circulation",
        "Contaminated seeds or transplants",
        "Overhead watering spreading bacteria"
      ],
      treatments: [
        "Apply copper-based bactericides",
        "Remove and destroy infected plant parts",
        "Improve air circulation around plants",
        "Use drip irrigation instead of overhead watering",
        "Rotate crops to break disease cycle"
      ]
    },
    "Pepper__bell___healthy": {
      causes: [
        "Plant appears to be in good health",
        "Proper growing conditions maintained",
        "No visible signs of disease or stress"
      ],
      treatments: [
        "Continue current care routine",
        "Monitor regularly for any changes",
        "Maintain proper watering schedule",
        "Ensure adequate nutrition",
        "Keep area clean and well-ventilated"
      ]
    },
    "Potato___Early_blight": {
      causes: [
        "Alternaria solani fungal infection",
        "High humidity with moderate temperatures",
        "Poor air circulation",
        "Stressed or weakened plants",
        "Contaminated soil or plant debris"
      ],
      treatments: [
        "Apply fungicide containing chlorothalonil or mancozeb",
        "Remove infected leaves immediately",
        "Improve air circulation and spacing",
        "Water at soil level to avoid wetting foliage",
        "Clean up plant debris at end of season"
      ]
    },
    "Potato___healthy": {
      causes: [
        "Plant appears to be in good health",
        "Optimal growing conditions present",
        "No visible disease symptoms"
      ],
      treatments: [
        "Maintain current growing practices",
        "Continue regular monitoring",
        "Ensure proper soil drainage",
        "Maintain consistent watering",
        "Practice crop rotation"
      ]
    },
    "Potato___Late_blight": {
      causes: [
        "Phytophthora infestans fungal infection",
        "Cool, wet weather conditions",
        "High humidity and moisture",
        "Poor air circulation",
        "Infected seed potatoes or nearby plants"
      ],
      treatments: [
        "Apply fungicide with metalaxyl or mancozeb",
        "Remove and destroy infected plants",
        "Improve drainage and air circulation",
        "Avoid overhead watering",
        "Harvest early if weather conditions favor disease"
      ]
    },
    "Tomato__Target_Spot": {
      causes: [
        "Corynespora cassiicola fungal infection",
        "High humidity and warm temperatures",
        "Poor air circulation",
        "Overhead watering",
        "Contaminated tools or soil"
      ],
      treatments: [
        "Apply fungicide with azoxystrobin or chlorothalonil",
        "Remove infected leaves and fruit",
        "Improve air circulation with proper spacing",
        "Use drip irrigation",
        "Sanitize tools between plants"
      ]
    },
    "Tomato__Tomato_mosaic_virus": {
      causes: [
        "Viral infection spread by contact",
        "Contaminated tools or hands",
        "Infected seeds or transplants",
        "Mechanical transmission during handling",
        "Tobacco use near plants"
      ],
      treatments: [
        "Remove and destroy infected plants",
        "Sanitize hands and tools with bleach solution",
        "Use virus-free seeds and transplants",
        "Control insect vectors",
        "Avoid smoking around plants"
      ]
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
      causes: [
        "Begomovirus transmitted by whiteflies",
        "High whitefly populations",
        "Infected transplants",
        "Nearby infected plants",
        "Warm weather favoring whitefly activity"
      ],
      treatments: [
        "Control whiteflies with insecticides or traps",
        "Remove infected plants immediately",
        "Use reflective mulches to deter whiteflies",
        "Install fine mesh screens in greenhouses",
        "Plant resistant varieties when available"
      ]
    },
    "Tomato_Bacterial_spot": {
      causes: [
        "Xanthomonas bacterial infection",
        "Warm, humid conditions",
        "Overhead watering or rain splash",
        "Contaminated seeds or transplants",
        "Poor air circulation"
      ],
      treatments: [
        "Apply copper-based bactericides",
        "Remove infected plant parts",
        "Use drip irrigation system",
        "Increase plant spacing for air circulation",
        "Rotate crops annually"
      ]
    },
    "Tomato_Early_blight": {
      causes: [
        "Alternaria solani fungal infection",
        "High humidity with warm temperatures",
        "Poor air circulation",
        "Stressed or aging plants",
        "Contaminated soil debris"
      ],
      treatments: [
        "Apply fungicide with chlorothalonil or mancozeb",
        "Remove lower infected leaves",
        "Mulch around plants to prevent soil splash",
        "Water at soil level",
        "Ensure adequate plant nutrition"
      ]
    },
    "Tomato_healthy": {
      causes: [
        "Plant shows excellent health",
        "Optimal growing conditions maintained",
        "No disease symptoms present"
      ],
      treatments: [
        "Continue current care practices",
        "Monitor regularly for changes",
        "Maintain consistent watering",
        "Ensure proper nutrition",
        "Keep growing area clean"
      ]
    },
    "Tomato_Late_blight": {
      causes: [
        "Phytophthora infestans infection",
        "Cool, wet weather conditions",
        "High humidity and moisture",
        "Infected seed or nearby plants",
        "Poor air circulation"
      ],
      treatments: [
        "Apply fungicide with metalaxyl or copper",
        "Remove and destroy infected plants",
        "Improve air circulation and drainage",
        "Avoid overhead watering",
        "Harvest green tomatoes if disease is severe"
      ]
    },
    "Tomato_Leaf_Mold": {
      causes: [
        "Passalora fulva fungal infection",
        "High humidity in enclosed spaces",
        "Poor air circulation",
        "Overhead watering",
        "Crowded plant conditions"
      ],
      treatments: [
        "Reduce humidity with ventilation",
        "Remove infected leaves",
        "Apply fungicide if necessary",
        "Increase plant spacing",
        "Water at soil level only"
      ]
    },
    "Tomato_Septoria_leaf_spot": {
      causes: [
        "Septoria lycopersici fungal infection",
        "Warm, humid weather",
        "Overhead watering or rain splash",
        "Contaminated soil or debris",
        "Poor air circulation"
      ],
      treatments: [
        "Apply fungicide with chlorothalonil",
        "Remove infected lower leaves",
        "Mulch to prevent soil splash",
        "Use drip irrigation",
        "Clean up plant debris"
      ]
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
      causes: [
        "Two-spotted spider mite infestation",
        "Hot, dry conditions",
        "Dusty environment",
        "Stressed plants",
        "Lack of natural predators"
      ],
      treatments: [
        "Apply miticide or insecticidal soap",
        "Increase humidity around plants",
        "Spray plants with water to remove mites",
        "Introduce beneficial predatory mites",
        "Remove heavily infested leaves"
      ]
    },
    "Healthy": {
      causes: [
        "Plant demonstrates optimal health",
        "Proper environmental conditions",
        "No visible stress or disease"
      ],
      treatments: [
        "Maintain current care routine",
        "Continue regular health monitoring",
        "Ensure consistent watering practices",
        "Maintain proper nutrition levels",
        "Keep growing environment clean"
      ]
    },
    "Leaf_Gall_Forming": {
      causes: [
        "Bacterial or insect-induced gall formation",
        "Agrobacterium or other bacterial infection",
        "Insect egg laying or feeding damage",
        "Genetic abnormalities",
        "Environmental stress factors"
      ],
      treatments: [
        "Remove affected leaves and branches",
        "Apply appropriate bactericide if bacterial",
        "Control insect vectors with pesticides",
        "Improve plant health with proper nutrition",
        "Monitor and remove new galls promptly"
      ]
    },
    "leaf_spot_disease": {
      causes: [
        "Various fungal or bacterial pathogens",
        "High humidity and moisture",
        "Poor air circulation",
        "Overhead watering",
        "Contaminated tools or soil"
      ],
      treatments: [
        "Apply broad-spectrum fungicide",
        "Remove infected leaves immediately",
        "Improve air circulation around plants",
        "Use drip irrigation instead of overhead watering",
        "Sanitize tools between plants"
      ]
    }
  };

  const getDiseaseInfo = (prediction) => {
    return diseaseInfo[prediction] || {
      causes: [
        "Unknown or uncommon plant condition",
        "Possible environmental stress",
        "Potential pathogen infection",
        "Further diagnosis may be needed"
      ],
      treatments: [
        "Consult with local agricultural extension",
        "Remove affected plant parts",
        "Improve growing conditions",
        "Monitor plant closely for changes",
        "Consider professional plant diagnosis"
      ]
    };
  };
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    const tips = [
      "Water your plants in the early morning to reduce evaporation.",
      "Rotate your crops to prevent soil depletion and reduce pest issues.",
      "Consider companion planting to naturally deter pests.",
      "Mulching helps retain soil moisture and suppress weeds.",
      "Test your soil regularly to understand its nutrient content."
    ];
    setTipOfTheDay(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const toggleOtherScanner = () => {
    if (showOtherScanner) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowOtherScanner(false));
    } else {
      setShowOtherScanner(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const onUpload = async (image) => {
    setSelectedImage(image.uri);
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const uriParts = image.uri.split(".");
    const extension = uriParts[uriParts.length - 1].toLowerCase();
    const mimeType = `image/${extension === "jpg" ? "jpeg" : extension}`;

    const data = new FormData();
    data.append("file", {
      uri: image.uri,
      name: `photo.${extension}`,
      type: mimeType,
    });

    try {
      const response = await axios.post(`${BASE_URL}/api/predict`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      setPrediction(result);

      const newScan = {
        id: Date.now().toString(),
        image: image.uri,
        result: result.prediction,
        date: new Date().toLocaleDateString(),
        type: 'general'
      };
      setRecentScans((prev) => [newScan, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error(error.message);
      alert("Error during prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onUpload2 = async (image) => {
    setSelectedImage(image.uri);
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const uriParts = image.uri.split(".");
    const extension = uriParts[uriParts.length - 1].toLowerCase();
    const mimeType = `image/${extension === "jpg" ? "jpeg" : extension}`;

    const data = new FormData();
    data.append("file", {
      uri: image.uri,
      name: `photo.${extension}`,
      type: mimeType,
    });

    try {
      const response = await axios.post(`${BASE_URL}/api/predictCinnamon`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      setPrediction(result);

      const newScan = {
        id: Date.now().toString(),
        image: image.uri,
        result: result.prediction,
        date: new Date().toLocaleDateString(),
        type: 'cinnamon'
      };
      setRecentScans((prev) => [newScan, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error(error.message);
      alert("Error during prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearPrediction = () => {
    setPrediction(null);
    setSelectedImage('');
  };

  const PositivePrediction = () => {
  const healthyPredictions = [
    "Pepper__bell___healthy", 
    "Potato___healthy", 
    "Tomato_healthy", 
    "Healthy"
  ];
  
  const isHealthy = healthyPredictions.includes(prediction?.prediction);
  
    return (
      <View style={styles.predictionContainer}>
        <Text style={styles.predictionTitle}>Prediction Results</Text>
        
        {isHealthy ? (
          <Ionicons name='checkmark-circle' size={72} color='#4CAF50' />
        ) : (
          <Ionicons name='warning' size={72} color='#e24d4d' />
        )}
        
        <Text style={[
          styles.predictionText, 
          { color: isHealthy ? '#4CAF50' : '#e24d4d' }
        ]}>
          {isHealthy ? 'Your Plant is Healthy!' : 'Your Plant May Be At Risk!'}
        </Text>
        
        <Text style={styles.conditionText}>
          Condition: {prediction?.prediction}
        </Text>
        
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
  };

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
          <ActivityIndicator size="large" color="#8B4513" />
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
              style={[
                styles.recentScanItem,
                scan.type === 'cinnamon' && styles.cinnamonRecentScan
              ]}
              onPress={() => {
                setSelectedImage(scan.image);
                setPrediction({ prediction: scan.result, probability: "Previously Scanned" });
              }}
            >
              <Image source={{ uri: scan.image }} style={styles.recentScanImage} />
              <View style={styles.scanTypeIndicator}>
                <Text style={styles.scanTypeText}>
                  {scan.type === 'cinnamon' ? '🌿 CINNAMON' : '🌱 GENERAL'}
                </Text>
              </View>
              <Text style={styles.recentScanResult} numberOfLines={1}>{scan.result}</Text>
              <Text style={styles.recentScanDate}>{scan.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const DetailedModal = () => {
    const currentDiseaseInfo = getDiseaseInfo(prediction?.prediction);
    
    return (
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
            
            <ScrollView style={styles.modalScrollView}>
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
                    {currentDiseaseInfo.causes.map((cause, index) => `• ${cause}`).join('\n')}
                  </Text>
                </View>
                
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Recommended Actions</Text>
                  <Text style={styles.sectionContent}>
                    {currentDiseaseInfo.treatments.map((treatment, index) => `• ${treatment}`).join('\n')}
                  </Text>
                </View>
              </View>
            </ScrollView>
            
            <TouchableOpacity
              style={styles.treatmentButton}
              onPress={() => {
                setModalVisible(false);
                alert("Treatment guide would open here");
              }}
            >
              <Text style={styles.treatmentButtonText}>View Treatment Guide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

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
          
          {/* Main Cinnamon Scanner */}
          <View style={styles.cinnamonScannerContainer}>
            <View style={styles.cinnamonHeader}>
              <View style={styles.cinnamonTitleContainer}>
                <MaterialCommunityIcons name="tree" size={25} color="#8B4513" />
                <Text style={styles.cinnamonTitle}>Cinnamon Scanner</Text>
                <View style={styles.specialistBadge}>
                  <Text style={styles.specialistText}>SPECIALIST</Text>
                </View>
              </View>
              <Text style={styles.cinnamonSubtitle}>
                Advanced AI model specifically trained for cinnamon plant diseases
              </Text>
            </View>
            
            <View style={styles.cinnamonCameraSection}>
              <Camera handleUpload={onUpload2} />
            </View>

            {/* Toggle for Other Scanner */}
            <TouchableOpacity 
              style={styles.toggleOtherScanner}
              onPress={toggleOtherScanner}
            >
              <View style={styles.toggleContent}>
                <MaterialCommunityIcons 
                  name="flower" 
                  size={20} 
                  color="#666" 
                />
                <Text style={styles.toggleText}>
                  Need to scan other plants?
                </Text>
                <MaterialCommunityIcons 
                  name={showOtherScanner ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#666" 
                />
              </View>
            </TouchableOpacity>

            {/* Compact Other Scanner */}
            {showOtherScanner && (
              <Animated.View 
                style={[
                  styles.otherScannerContainer,
                  {
                    opacity: slideAnim,
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0]
                      })
                    }]
                  }
                ]}
              >
                <View style={styles.otherScannerHeader}>
                  <MaterialCommunityIcons name="leaf" size={20} color="#71b79c" />
                  <Text style={styles.otherScannerTitle}>General Plant Scanner</Text>
                  <View style={styles.generalBadge}>
                    <Text style={styles.generalText}>GENERAL</Text>
                  </View>
                </View>
                <Text style={styles.otherScannerSubtitle}>
                  For other plant types and common diseases
                </Text>
                <View style={styles.otherCameraSection}>
                  <Camera handleUpload={onUpload} />
                </View>
              </Animated.View>
            )}
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
    paddingTop: 40,
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
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
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
  
  cinnamonScannerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#8B4513",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#D2B48C',
  },
  cinnamonHeader: {
    marginBottom: 15,
  },
  cinnamonTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cinnamonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginLeft: 10,
    flex: 1,
  },
  specialistBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialistText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  cinnamonSubtitle: {
    fontSize: 14,
    color: '#A0522D',
    lineHeight: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  cinnamonCameraSection: {
    backgroundColor: '#FFF8DC',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  
  toggleOtherScanner: {
    marginTop: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
    fontWeight: '500',
  },
  otherScannerContainer: {
    marginTop: 15,
    backgroundColor: '#f8fffe',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#b8e6d3',
  },
  otherScannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  otherScannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#71b79c',
    marginLeft: 8,
    flex: 1,
  },
  generalBadge: {
    backgroundColor: '#e8f5f0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#71b79c',
  },
  generalText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#71b79c',
  },
  otherScannerSubtitle: {
    fontSize: 13,
    color: '#5a9279',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  otherCameraSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1e7dd',
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
  width: Math.min(width * 0.7, 280), // Max width of 280
  height: Math.min(width * 0.7, 280), // Max height of 280
  maxHeight: 250, // Additional constraint
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
    color: '#8B4513',
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
  cinnamonRecentScan: {
    borderWidth: 2,
    borderColor: '#D2B48C',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#FFF8DC',
  },
  recentScanImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  scanTypeIndicator: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 5,
  },
  scanTypeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  modalScrollView: {
  maxHeight: height * 0.5,
  width: '100%',
  },
});

export default Home;