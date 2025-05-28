import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Dimensions,
  StatusBar,
  Modal,
} from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';


import { cropDiseases } from '../data/data.js';


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


const createImageMapping = () => {
  const mapping = {};
  

  cropDiseases.forEach(crop => {

    let key = '';
    
    if (crop.name.includes('Pepper Bell Bacterial Spot')) {
      key = 'Pepper__bell___Bacterial_spot';
    } else if (crop.name.includes('Pepper Bell Healthy')) {
      key = 'Pepper__bell___healthy';
    } else if (crop.name.includes('Potato Early Blight')) {
      key = 'Potato___Early_blight';
    } else if (crop.name.includes('Potato Healthy')) {
      key = 'Potato___healthy';
    } else if (crop.name.includes('Potato Late Blight')) {
      key = 'Potato___Late_blight';
    } else if (crop.name.includes('Tomato Target Spot')) {
      key = 'Tomato__Target_Spot';
    } else if (crop.name.includes('Tomato Mosaic Virus')) {
      key = 'Tomato__Tomato_mosaic_virus';
    } else if (crop.name.includes('Tomato YellowLeaf Curl Virus')) {
      key = 'Tomato__Tomato_YellowLeaf__Curl_Virus';
    } else if (crop.name.includes('Tomato Bacterial Spot')) {
      key = 'Tomato_Bacterial_spot';
    } else if (crop.name.includes('Tomato Early Blight')) {
      key = 'Tomato_Early_blight';
    } else if (crop.name.includes('Tomato Healthy')) {
      key = 'Tomato_healthy';
    } else if (crop.name.includes('Tomato Late Blight')) {
      key = 'Tomato_Late_blight';
    } else if (crop.name.includes('Tomato Leaf Mold')) {
      key = 'Tomato_Leaf_Mold';
    } else if (crop.name.includes('Tomato Septoria Leaf Spot')) {
      key = 'Tomato_Septoria_leaf_spot';
    } else if (crop.name.includes('Tomato Spider Mites Two Spotted Spider Mite')) {
      key = 'Tomato_Spider_mites_Two_spotted_spider_mite';
    }
    
    if (key) {
      mapping[key] = crop.image;
    }
  });
  
  return mapping;
};

const { width, height } = Dimensions.get('screen');

const ListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  const imageMapping = createImageMapping();
  
  const defaultImage = require('../assets/profilepic.png');
  
  const tips = [
    {
      text: "Water your plants in the early morning to reduce evaporation",
      icon: "water",
      image: require('../assets/watering.jpg')
    },
    {
      text: "Rotate your crops to prevent soil depletion and reduce pest issues",
      icon: "autorenew",
      image: require('../assets/crop-rotation.jpg')
    },
    {
      text: "Consider companion planting to naturally deter pests",
      icon: "grass",
      image: require('../assets/companion-planting.jpg')
    },
    {
      text: "Mulching helps retain soil moisture and suppress weeds",
      icon: "layers",
      image: require('../assets/mulching.jpg')
    },
    {
      text: "Test your soil regularly to understand its nutrient content",
      icon: "science",
      image: require('../assets/soil-test.jpg')
    }
  ];

  const transformDiseaseData = () => {
    return Object.keys(diseaseInfo).map((key, index) => {
      const disease = diseaseInfo[key];
      const cleanName = key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
      
      const diseaseImage = imageMapping[key] || defaultImage;


      let category = 'Other';
      let severity = 'Medium';
      
      if (key.includes('healthy') || key.includes('Healthy')) {
        category = 'Healthy';
        severity = 'None';
      } else if (disease.causes.some(cause => 
        cause.toLowerCase().includes('bacterial') || 
        cause.toLowerCase().includes('xanthomonas')
      )) {
        category = 'Bacterial';
        severity = 'High';
      } else if (disease.causes.some(cause => 
        cause.toLowerCase().includes('fungal') || 
        cause.toLowerCase().includes('fungus') ||
        cause.toLowerCase().includes('alternaria') ||
        cause.toLowerCase().includes('phytophthora') ||
        cause.toLowerCase().includes('septoria') ||
        cause.toLowerCase().includes('passalora')
      )) {
        category = 'Fungal';
        severity = 'High';
      } else if (disease.causes.some(cause => 
        cause.toLowerCase().includes('virus') || 
        cause.toLowerCase().includes('viral')
      )) {
        category = 'Viral';
        severity = 'Very High';
      } else if (disease.causes.some(cause => 
        cause.toLowerCase().includes('mite') || 
        cause.toLowerCase().includes('insect') ||
        cause.toLowerCase().includes('pest')
      )) {
        category = 'Pest';
        severity = 'Medium';
      }
      
      return {
        id: key,
        name: cleanName,
        category,
        severity,
        causes: disease.causes,
        treatments: disease.treatments,
        image: diseaseImage,
      };
    });
  };
  
  const allDiseases = transformDiseaseData();
  
  const categories = ['All', 'Fungal', 'Bacterial', 'Viral', 'Pest', 'Other'];
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    
    filterDiseases(searchQuery, selectedCategory);
  }, []);
  
  const filterDiseases = (query, category) => {
    let filtered = [...allDiseases];
    
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase().trim();
      filtered = filtered.filter(disease => 
        disease.name.toLowerCase().includes(searchTerm) ||
        disease.category.toLowerCase().includes(searchTerm) ||
        disease.causes.some(cause => cause.toLowerCase().includes(searchTerm)) ||
        disease.treatments.some(treatment => treatment.toLowerCase().includes(searchTerm))
      );
    }
    
    if (category && category !== 'All') {
      filtered = filtered.filter(disease => 
        disease.category === category
      );
    }
    
    setFilteredDiseases(filtered);
  };
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    filterDiseases(text, selectedCategory);
  };
  
  const handleCategorySelect = (category) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(category);
    filterDiseases(searchQuery, category);
  };
  
  const toggleExpand = (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setExpandedDisease(expandedDisease === index ? null : index);
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'None': return '#4CAF50';
      case 'Low': return '#8BC34A';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      case 'Very High': return '#9C27B0';
      default: return '#FF9800';
    }
  };
  
  const renderDiseaseItem = (disease, index) => {
    const isExpanded = expandedDisease === index;
    
    return (
      <TouchableOpacity 
        style={[
          styles.diseaseCard, 
          isExpanded && styles.expandedCard
        ]} 
        key={index}
        onPress={() => toggleExpand(index)}
        activeOpacity={0.9}
      >
        <View style={styles.diseaseSummary}>
          <Image
            source={disease.image}
            resizeMode='cover'
            style={styles.diseaseImage}
          />
          <View style={styles.diseaseInfo}>
            <Text style={styles.diseaseName}>{disease.name}</Text>
            <View style={styles.diseaseTagContainer}>
              <View style={[styles.diseaseTag, { backgroundColor: `${getSeverityColor(disease.severity)}15` }]}>
                <Text style={[styles.diseaseTagText, { color: getSeverityColor(disease.severity) }]}>
                  {disease.category}
                </Text>
              </View>
              <Text style={styles.diseaseSeverity}>
                Severity: <Text style={[styles.severityValue, { color: getSeverityColor(disease.severity) }]}>
                  {disease.severity}
                </Text>
              </Text>
            </View>
          </View>
          <Animated.View style={styles.expandIcon}>
            <MaterialIcons 
              name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color="#71b79c" 
            />
          </Animated.View>
        </View>
        
        {isExpanded && (
          <Animated.View style={styles.expandedContent}>
            <View style={styles.separator} />
            
            <View style={styles.diseaseDetailSection}>
              <Text style={styles.detailSectionTitle}>Description</Text>
              <Text style={styles.detailText}>
                {disease.category === 'Healthy' 
                  ? "This plant appears to be in excellent health with no visible signs of disease or stress."
                  : `This ${disease.category.toLowerCase()} condition affects plant health and requires proper management for optimal crop production.`}
              </Text>
            </View>
            
            <View style={styles.diseaseDetailSection}>
              <Text style={styles.detailSectionTitle}>Primary Causes</Text>
              <Text style={styles.detailText}>
                {disease.causes.map((cause, idx) => `• ${cause}`).join('\n')}
              </Text>
            </View>
            
            <View style={styles.diseaseDetailSection}>
              <Text style={styles.detailSectionTitle}>Treatment & Management</Text>
              <Text style={styles.detailText}>
                {disease.treatments.map((treatment, idx) => `• ${treatment}`).join('\n')}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate('DiseaseDetail', { disease });
              }}
            >
              <Text style={styles.learnMoreText}>View Full Details</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  const TipsModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showTipsModal}
      onRequestClose={() => setShowTipsModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <MaterialCommunityIcons 
              name="lightbulb-outline" 
              size={24} 
              color="#FFD700" 
              style={styles.lightbulbIcon}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>Plant Care Tips</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setShowTipsModal(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.tipsScrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tipsScrollContent}
          >
            {tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Image 
                  source={tip.image}
                  style={styles.tipImage}
                  resizeMode="cover"
                  loading="lazy"
                />
                <View style={styles.tipContent}>
                  <MaterialIcons name={tip.icon} size={24} color="#71b79c" style={styles.tipIcon} />
                  <Text style={styles.tipText}>{tip.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#71b79c" />
      
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plant Diseases</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Feather name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#71b79c" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search diseases, symptoms, treatments..."
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={() => {
                setSearchQuery('');
                filterDiseases('', selectedCategory);
              }}
            >
              <AntDesign name="close" size={20} color="#71b79c" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.resultsText}>
          {filteredDiseases.length} {filteredDiseases.length === 1 ? 'disease' : 'diseases'} found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </Text>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.diseasesList}
        >
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map((disease, index) => renderDiseaseItem(disease, index))
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={64} color="#71b79c" />
              <Text style={styles.noResultsText}>No diseases found</Text>
              <Text style={styles.noResultsSubtext}>
                {searchQuery 
                  ? `No results for "${searchQuery}" in ${selectedCategory === 'All' ? 'any category' : selectedCategory}`
                  : `No diseases found in ${selectedCategory} category`}
              </Text>
              <TouchableOpacity 
                style={styles.clearFiltersButton}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  filterDiseases('', 'All');
                }}
              >
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity 
          style={[styles.floatingButton, styles.secondaryFloatingButton]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShowTipsModal(true);
          }}
        >
          <MaterialIcons name="lightbulb" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <TipsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4c5a55',
    height: 50,
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  categoriesScrollContent: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  selectedCategoryButton: {
    backgroundColor: '#71b79c',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4c5a55',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  resultsText: {
    fontSize: 14,
    color: '#71b79c',
    marginBottom: 10,
    fontWeight: '600',
  },
  diseasesList: {
    paddingBottom: 100,
  },
  diseaseCard: {
    backgroundColor: '#FFFFFF',
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
    elevation: 2,
  },
  expandedCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 4,
  },
  diseaseSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  diseaseInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 5,
  },
  diseaseTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  diseaseTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
    marginBottom: 3,
  },
  diseaseTagText: {
    fontSize: 12,
    color: '#2e5540',
    fontWeight: '600',
  },
  diseaseSeverity: {
    fontSize: 12,
    color: '#4c5a55',
  },
  severityValue: {
    fontWeight: 'bold',
  },
  expandIcon: {
    padding: 5,
  },
  expandedContent: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  diseaseDetailSection: {
    marginBottom: 15,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e5540',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4c5a55',
    lineHeight: 22,
  },
  learnMoreButton: {
    backgroundColor: '#71b79c',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  learnMoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e5540',
    marginTop: 15,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#4c5a55',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  clearFiltersButton: {
    backgroundColor: '#71b79c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  clearFiltersText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#71b79c',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 15,
  },
  secondaryFloatingButton: {
    backgroundColor: '#4c5a55',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    position: 'relative',
  },
  lightbulbIcon: {
    position: 'absolute',
    left: 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  tipsScrollView: {
    maxHeight: '100%',
  },
  tipsScrollContent: {
    paddingBottom: 10,
  },
  tipItem: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#71b79c',
    flex: 1,
    fontWeight: '500',
  },
});

export default ListScreen;