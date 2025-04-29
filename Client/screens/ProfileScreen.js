import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Animated,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('screen');

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    location: 'San Francisco, CA',
    accountType: 'Premium',
    joinDate: 'March 2023',
    plantCount: 12,
    scansCount: 48,
    savedTreatments: 7
  });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('history');
  
  // For animation
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  // State for recent scans - will be updated from AsyncStorage or route params
  const [scanHistory, setScanHistory] = useState([
    { id: '1', plant: 'Tomato Plant', diagnosis: 'Early Blight', date: '04/25/2025', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
    { id: '2', plant: 'Cucumber', diagnosis: 'Powdery Mildew', date: '04/22/2025', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
    { id: '3', plant: 'Rose Bush', diagnosis: 'Healthy', date: '04/19/2025', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
    { id: '4', plant: 'Basil', diagnosis: 'Downy Mildew', date: '04/15/2025', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
  ]);
  
  // Sample plants data
  const userPlants = [
    { id: '1', name: 'Tomato Plant', health: 'Healthy', lastChecked: '2 days ago', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
    { id: '2', name: 'Cucumber', health: 'Needs attention', lastChecked: '1 week ago', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
    { id: '3', name: 'Rose Bush', health: 'Healthy', lastChecked: '3 days ago', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
    { id: '4', name: 'Basil', health: 'Needs attention', lastChecked: '2 days ago', image: 'https://i.ibb.co/qF8qRnK/upload-1.png' },
  ];
  
  // Sample saved treatments data with expanded treatment information
  const savedTreatments = [
    { 
      id: '1', 
      name: 'Early Blight Treatment', 
      saveDate: '04/20/2025', 
      type: 'Fungal disease',
      treatments: [
        'Apply copper-based fungicide',
        'Remove and destroy infected plant parts',
        'Improve air circulation around plants',
        'Maintain proper irrigation practices'
      ]
    },
    { 
      id: '2', 
      name: 'Powdery Mildew Treatment', 
      saveDate: '04/18/2025', 
      type: 'Fungal disease',
      treatments: [
        'Apply neem oil or sulfur-based fungicide',
        'Prune overcrowded plants to improve airflow',
        'Avoid overhead watering',
        'Remove heavily infected plants'
      ]
    },
    { 
      id: '3', 
      name: 'Nutrient Deficiency Treatment', 
      saveDate: '04/10/2025', 
      type: 'Nutrition',
      treatments: [
        'Apply balanced NPK fertilizer',
        'Use compost tea for micronutrients',
        'Test soil pH and adjust if necessary',
        'Consider foliar feeding for quick absorption'
      ]
    },
  ];

  useEffect(() => {
    getAsyncData();
    
    // Add animation for profile load
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Get recent scans from AsyncStorage
    getRecentScans();
    
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Check if we're receiving recent scans from the home screen
  useEffect(() => {
    if (route.params?.recentScans) {
      // Convert recent scans from home screen to scan history format
      const formattedScans = route.params.recentScans.map(scan => ({
        id: scan.id,
        plant: 'Unknown Plant', // You might want to update this if you have plant type info
        diagnosis: scan.result,
        date: scan.date,
        image: scan.image
      }));
      
      setScanHistory(formattedScans);
      
      // Store the updated scan history
      saveRecentScans(formattedScans);
    }
  }, [route.params?.recentScans]);

  const getAsyncData = async () => {
    try {
      const data = await AsyncStorage.getItem('@user_data');
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData.email) {
          setUserData(prevState => ({
            ...prevState,
            email: parsedData.email,
            fullname: parsedData.fullname,
          }));
        }
      }
    } catch (e) {
      console.error('Error loading user data', e);
    }
  };

  const getRecentScans = async () => {
    try {
      const scans = await AsyncStorage.getItem('@recent_scans');
      if (scans) {
        const parsedScans = JSON.parse(scans);
        setScanHistory(parsedScans);
      }
    } catch (e) {
      console.error('Error loading recent scans', e);
    }
  };

  const saveRecentScans = async (scans) => {
    try {
      await AsyncStorage.setItem('@recent_scans', JSON.stringify(scans));
    } catch (e) {
      console.error('Error saving recent scans', e);
    }
  };

  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  const confirmLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('@user_data');
      setModalVisible(false);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('LoginScreen');
      }, 800);
    } catch (err) {
      setLoading(false);
      console.error('Logout error:', err);
    }
  };

  const showHelpAndSupport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHelpModalVisible(true);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'plants':
        return (
          <View style={styles.tabContentContainer}>
            {userPlants.map(plant => (
              <View key={plant.id} style={styles.plantItem}>
                <Image source={{ uri: plant.image }} style={styles.plantImage} />
                <View style={styles.plantDetails}>
                  <Text style={styles.plantName}>{plant.name}</Text>
                  <Text style={[
                    styles.plantHealth, 
                    plant.health === 'Healthy' ? styles.healthyText : styles.warningText
                  ]}>
                    {plant.health}
                  </Text>
                  <Text style={styles.plantLastChecked}>Last checked: {plant.lastChecked}</Text>
                </View>
                <TouchableOpacity style={styles.plantActionButton}>
                  <AntDesign name="right" size={16} color="#71b79c" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      case 'treatments':
        return (
          <View style={styles.tabContentContainer}>
            {savedTreatments.map(treatment => (
              <View key={treatment.id}>
                <View style={styles.treatmentItem}>
                  <View style={styles.treatmentIconContainer}>
                    <MaterialCommunityIcons name="medical-bag" size={24} color="#fff" />
                  </View>
                  <View style={styles.treatmentDetails}>
                    <Text style={styles.treatmentName}>{treatment.name}</Text>
                    <Text style={styles.treatmentType}>{treatment.type}</Text>
                    <Text style={styles.treatmentDate}>Saved on: {treatment.saveDate}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.treatmentActionButton}
                    onPress={() => {
                      // Toggle expanded state for this treatment
                      setExpandedTreatment(prevId => prevId === treatment.id ? null : treatment.id);
                    }}
                  >
                    <AntDesign name="right" size={16} color="#71b79c" />
                  </TouchableOpacity>
                </View>
                
                {/* Treatment details section */}
                <View style={styles.diseaseDetailSection}>
                  <Text style={styles.detailSectionTitle}>Treatment Options</Text>
                  <Text style={styles.detailText}>
                    • {treatment.treatments[0] || "Apply appropriate fungicide/pesticide"}
                    {"\n"}
                    • {treatment.treatments[1] || "Remove and destroy infected plant parts"}
                    {"\n"}
                    • {treatment.treatments[2] || "Improve air circulation around plants"}
                    {"\n"}
                    • {treatment.treatments[3] || "Maintain proper irrigation practices"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
      default: // history
        return (
          <View style={styles.tabContentContainer}>
            {scanHistory.length > 0 ? (
              scanHistory.map(scan => (
                <View key={scan.id} style={styles.historyItem}>
                  <Image source={{ uri: scan.image }} style={styles.historyImage} />
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyPlantName}>{scan.plant}</Text>
                    <Text style={[
                      styles.historyDiagnosis, 
                      scan.diagnosis === 'Healthy' ? styles.healthyText : styles.warningText
                    ]}>
                      {scan.diagnosis}
                    </Text>
                    <Text style={styles.historyDate}>{scan.date}</Text>
                  </View>
                  <TouchableOpacity style={styles.historyActionButton}>
                    <MaterialCommunityIcons name="file-document-outline" size={20} color="#71b79c" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <MaterialCommunityIcons name="image-search-outline" size={50} color="#71b79c" />
                <Text style={styles.emptyStateText}>No scan history yet</Text>
                <Text style={styles.emptyStateSubText}>Start scanning plants to build your history</Text>
              </View>
            )}
          </View>
        );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#71b79c" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#71b79c" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#71b79c" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          
          <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Entypo name="leaf" size={24} color="#ffffff" />
              <Text style={styles.logoText}>Profile</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
            <Feather name="info" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/profilepic.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{userData.fullname || 'Plant Enthusiast'}</Text>
          <Text style={styles.userEmail}>{userData.email || 'user@example.com'}</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Scan History</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'plants' && styles.activeTabButton]}
            onPress={() => setActiveTab('plants')}
          >
            <Text style={[styles.tabText, activeTab === 'plants' && styles.activeTabText]}>My Plants</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'treatments' && styles.activeTabButton]}
            onPress={() => setActiveTab('treatments')}
          >
            <Text style={[styles.tabText, activeTab === 'treatments' && styles.activeTabText]}>Treatments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentCard}>
          {renderTabContent()}
        </View>

        <View style={styles.optionsCard}>
          <TouchableOpacity style={styles.optionItem} onPress={showHelpAndSupport}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="help-circle-outline" size={20} color="#71b79c" />
            </View>
            <Text style={styles.optionText}>Help & Support</Text>
            <AntDesign name="right" size={16} color="#71b79c" style={styles.optionArrow} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Agri-Care v1.2.0</Text>
        </View>
      </ScrollView> 

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Logout Confirmation</Text>
            <Text style={styles.modalText}>Are you sure you want to logout from your account?</Text>
            
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLogout}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.helpModalView]}>
            <View style={styles.helpModalHeader}>
              <Text style={styles.helpModalTitle}>How Agri-Care Works</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setHelpModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#2e5540" />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.helpModalContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.helpSection}>
                <View style={styles.helpIconContainer}>
                  <Ionicons name="camera-outline" size={34} color="#71b79c" />
                </View>
                <Text style={styles.helpSectionTitle}>Step 1: Capture or Upload</Text>
                <Text style={styles.helpSectionText}>
                  Simply take a photo of a plant leaf with your camera or upload an existing image from your gallery.
                </Text>
              </View>

              <View style={styles.helpSection}>
                <View style={styles.helpIconContainer}>
                  <MaterialCommunityIcons name="leaf-maple" size={34} color="#71b79c" />
                </View>
                <Text style={styles.helpSectionTitle}>Step 2: AI Analysis</Text>
                <Text style={styles.helpSectionText}>
                  Our advanced AI technology will analyze the image to identify the plant and detect any diseases or issues.
                </Text>
              </View>

              <View style={styles.helpSection}>
                <View style={styles.helpIconContainer}>
                  <MaterialCommunityIcons name="medical-bag" size={34} color="#71b79c" />
                </View>
                <Text style={styles.helpSectionTitle}>Step 3: Diagnosis & Treatment</Text>
                <Text style={styles.helpSectionText}>
                  Receive detailed information about the plant condition and get expert treatment recommendations.
                </Text>
              </View>

              <View style={styles.helpSection}>
                <View style={styles.helpIconContainer}>
                  <MaterialCommunityIcons name="history" size={34} color="#71b79c" />
                </View>
                <Text style={styles.helpSectionTitle}>Step 4: Save & Track</Text>
                <Text style={styles.helpSectionText}>
                  Your scans are saved in your profile, allowing you to track plant health over time and review past treatments.
                </Text>
              </View>

              <View style={styles.supportContact}>
                <Text style={styles.supportContactTitle}>Need Additional Help?</Text>
                <Text style={styles.supportContactText}>
                  Contact our support team at:
                </Text>
                <Text style={styles.supportContactEmail}>agricarehelp@gmail.com</Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setHelpModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  infoButton: {
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#71b79c',
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#71b79c',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e5540',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: '#4c5a55',
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2e5540',
    fontWeight: 'bold',
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    minHeight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  tabContentContainer: {
    width: '100%',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e5540',
    marginTop: 15,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#4c5a55',
    marginTop: 5,
    textAlign: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  historyDetails: {
    flex: 1,
    marginLeft: 15,
  },
  historyPlantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e5540',
  },
  historyDiagnosis: {
    fontSize: 14,
    marginTop: 3,
  },
  healthyText: {
    color: '#4CAF50',
  },
  warningText: {
    color: '#e24d4d',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  historyActionButton: {
    padding: 8,
  },
  plantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  plantImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  plantDetails: {
    flex: 1,
    marginLeft: 15,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e5540',
  },
  plantHealth: {
    fontSize: 14,
    marginTop: 3,
  },
  plantLastChecked: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  plantActionButton: {
    padding: 8,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  treatmentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#71b79c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatmentDetails: {
    flex: 1,
    marginLeft: 15,
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e5540',
  },
  treatmentType: {
    fontSize: 14,
    color: '#4c5a55',
    marginTop: 3,
  },
  treatmentDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  treatmentActionButton: {
    padding: 8,
  },
  diseaseDetailSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e5540',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4c5a55',
    lineHeight: 22,
  },
  optionsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#2e5540',
    flex: 1,
  },
  optionArrow: {
    padding: 5,
  },
  logoutButton: {
    backgroundColor: '#e24d4d',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#4c5a55',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#e24d4d',
  },
  cancelButtonText: {
    color: '#4c5a55',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Help & Support Modal styles
  helpModalView: {
    padding: 0,
    maxHeight: height * 0.8,
    width: width * 0.9,
  },
  helpModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e5540',
  },
  closeButton: {
    padding: 5,
  },
  helpModalContent: {
    width: '100%',
    maxHeight: height * 0.6,
  },
  helpSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2f9f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e5540',
    marginBottom: 10,
  },
  helpSectionText: {
    fontSize: 15,
    color: '#4c5a55',
    lineHeight: 22,
  },
  supportContact: {
    padding: 15,
    alignItems: 'center',
  },
  supportContactTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2e5540',
    marginBottom: 10,
  },
  supportContactText: {
    fontSize: 15,
    color: '#4c5a55',
    marginBottom: 5, 
  },
  supportContactEmail: {
    fontSize: 16,
    color: '#71b79c',
    fontWeight: '500',
  },
  closeModalButton: {
    backgroundColor: '#71b79c',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;