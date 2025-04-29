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
} from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { cropDiseases } from '../data/data';

const { width, height } = Dimensions.get('screen');

const ListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState(cropDiseases);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedDisease, setExpandedDisease] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  // Categories for filtering (example - adjust based on your actual data)
  const categories = ['All', 'Fungal', 'Bacterial', 'Viral', 'Pest'];
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    
    // Initial filtering
    filterDiseases(searchQuery, selectedCategory);
  }, []);
  
  const filterDiseases = (query, category) => {
    let filtered = cropDiseases;
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(disease => 
        disease.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by category
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
            source={disease?.image}
            resizeMode='cover'
            style={styles.diseaseImage}
          />
          <View style={styles.diseaseInfo}>
            <Text style={styles.diseaseName}>{disease.name}</Text>
            <View style={styles.diseaseTagContainer}>
              <View style={styles.diseaseTag}>
                <Text style={styles.diseaseTagText}>{disease.category || 'Fungal'}</Text>
              </View>
              <Text style={styles.diseaseSeverity}>
                Severity: <Text style={styles.severityValue}>{disease.severity || 'Medium'}</Text>
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
                {disease.description || 
                 "This plant disease affects the leaves and stems, causing yellowing, wilting, and reduced crop yield. Early detection is crucial for effective management."}
              </Text>
            </View>
            
            <View style={styles.diseaseDetailSection}>
              <Text style={styles.detailSectionTitle}>Symptoms</Text>
              <Text style={styles.detailText}>
                • {disease.symptoms?.[0] || "Yellowing or browning of leaves"}
                {"\n"}
                • {disease.symptoms?.[1] || "Wilting despite adequate water"}
                {"\n"}
                • {disease.symptoms?.[2] || "Spots or lesions on foliage"}
                {"\n"}
                • {disease.symptoms?.[3] || "Stunted growth and reduced vigor"}
              </Text>
            </View>
            
            <View style={styles.diseaseDetailSection}>
              <Text style={styles.detailSectionTitle}>Treatment Options</Text>
              <Text style={styles.detailText}>
                • {disease.treatment?.[0] || "Apply appropriate fungicide/pesticide"}
                {"\n"}
                • {disease.treatment?.[1] || "Remove and destroy infected plant parts"}
                {"\n"}
                • {disease.treatment?.[2] || "Improve air circulation around plants"}
                {"\n"}
                • {disease.treatment?.[3] || "Maintain proper irrigation practices"}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => {
                // Navigate to detailed screen for this disease
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
            <Feather name="info" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#71b79c" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search diseases..."
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
              <Text style={styles.noResultsSubtext}>Try a different search term or category</Text>
            </View>
          )}
        </ScrollView>
      </View>
      
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate('Camera');
          }}
        >
          <Ionicons name="camera" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.floatingButton, styles.secondaryFloatingButton]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // Navigate to prevention tips or another relevant screen
            alert("Prevention tips would open here");
          }}
        >
          <MaterialIcons name="lightbulb" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
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
    paddingBottom: 20,
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
  },
  diseaseTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
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
    color: '#e24d4d',
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
    marginBottom: 5,
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
  }
});

export default ListScreen;