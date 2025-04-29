import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

const CameraComponent = ({ handleUpload }) => {
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const requestGalleryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const pickFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission required', 'Camera access is needed.');
      return;
    }

    const data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!data.canceled && data.assets?.length > 0) {
      const asset = data.assets[0];
      const fileExt = asset.uri.split('.').pop();
      const file = {
        uri: asset.uri,
        type: `image/${fileExt}`,
        name: `image.${fileExt}`,
      };
      handleUpload(file);
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission required', 'Gallery access is needed.');
      return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!data.canceled && data.assets?.length > 0) {
      const asset = data.assets[0];
      const fileExt = asset.uri.split('.').pop();
      const file = {
        uri: asset.uri,
        type: `image/${fileExt}`,
        name: `image.${fileExt}`,
      };
      handleUpload(file);
    }
  };

  return (
    <View style={styles.options}>
      <TouchableOpacity style={styles.tab} onPress={pickFromGallery}>
        <View style={styles.row}>
          <Ionicons name="images-sharp" size={18} color="#fff" />
          <Text style={styles.tabTitle}>From Gallery</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={pickFromCamera}>
        <View style={styles.row}>
        <Ionicons name="camera" size={18} color="#fff" />
          <Text style={styles.tabTitle}>From Camera</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tab: {
    elevation: 8,
    backgroundColor: '#71b79c',
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 5,
    marginTop: 5,
    width: width * 0.7,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  tabTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    paddingLeft: 10,
  },
});

export default CameraComponent;
