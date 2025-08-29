import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color_three, color_four } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateManager } from '@/utils/updateManager';
// import { PlayStoreUpdateChecker } from '@/utils/playStoreUpdateChecker'; // Disabled until backend API is ready

interface UpdateNotificationProps {
  currentVersion: string;
  playStoreUrl?: string;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({ 
  currentVersion, 
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.the_extremity.abes_aims" 
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string>('');
  const [updateType, setUpdateType] = useState<'playstore' | 'ota' | null>(null);
  const [releaseNotes, setReleaseNotes] = useState<string>('');

  useEffect(() => {
    // Automatic update checking disabled until backend API is ready
    // checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      // Check for OTA updates only for now
      const otaUpdate = await UpdateManager.checkForOTAUpdates();
      if (otaUpdate.isAvailable) {
        setUpdateType('ota');
        setShowUpdateModal(true);
        return;
      }
      
      // Play Store update checking disabled until backend API is ready
      // await checkForPlayStoreUpdates();
    } catch (error) {
      console.log('Error checking for updates:', error);
    }
  };

  const checkForPlayStoreUpdates = async () => {
    try {
      // Disabled until backend API is implemented
      // const dismissedVersion = await AsyncStorage.getItem('dismissedUpdateVersion');
      // const updateInfo = await PlayStoreUpdateChecker.mockCheckForPlayStoreUpdate(currentVersion);
      // ... rest of the implementation
    } catch (error) {
      console.log('Play Store update check failed:', error);
    }
  };

  // Manual check function for when backend API is ready
  const manualCheckForUpdates = async () => {
    try {
      // Check for OTA updates
      const otaUpdate = await UpdateManager.checkForOTAUpdates();
      if (otaUpdate.isAvailable) {
        setUpdateType('ota');
        setShowUpdateModal(true);
        return;
      }
      
      // Uncomment when backend API is ready:
      // await checkForPlayStoreUpdates();
    } catch (error) {
      console.log('Error checking for updates:', error);
    }
  };

  const handleOTAUpdate = async () => {
    setShowUpdateModal(false);
    const success = await UpdateManager.downloadAndApplyUpdate();
    if (!success) {
      // If OTA update fails, show modal again
      setShowUpdateModal(true);
    }
  };

  const handlePlayStoreUpdate = () => {
    setShowUpdateModal(false);
    Linking.openURL(playStoreUrl).catch(() => {
      Alert.alert('Error', 'Could not open Play Store');
    });
  };

  const dismissUpdate = async () => {
    if (updateType === 'playstore') {
      await AsyncStorage.setItem('dismissedUpdateVersion', latestVersion);
    }
    setShowUpdateModal(false);
  };

  const getUpdateContent = () => {
    if (updateType === 'ota') {
      return {
        title: '🚀 App Update Available',
        message: 'A new update is available and will be applied instantly without going to the Play Store. The app will restart after the update.',
        primaryButton: 'Update Now',
        primaryAction: handleOTAUpdate,
        showSecondary: false
      };
    } else {
      return {
        title: '📱 New Version Available',
        message: `Version ${latestVersion} is now available on the Play Store!\n\n${releaseNotes}`,
        primaryButton: 'Update on Play Store',
        primaryAction: handlePlayStoreUpdate,
        showSecondary: true
      };
    }
  };

  if (!showUpdateModal) return null;

  const content = getUpdateContent();

  return (
    <Modal
      visible={showUpdateModal}
      transparent={true}
      animationType="fade"
      onRequestClose={dismissUpdate}
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View className="bg-white rounded-lg p-6 w-full max-w-sm">
          <View className="items-center mb-4">
            <View 
              style={{ backgroundColor: color_three }} 
              className="w-16 h-16 rounded-full items-center justify-center mb-3"
            >
              <Ionicons 
                name={updateType === 'ota' ? "flash-outline" : "download-outline"} 
                size={32} 
                color={color_four} 
              />
            </View>
            <Text 
              style={{ color: color_three, fontFamily: 'Montserrat-Bold' }} 
              className="text-lg text-center"
            >
              {content.title}
            </Text>
          </View>

          <Text 
            style={{ color: color_three, fontFamily: 'Montserrat' }} 
            className="text-center mb-6 leading-5"
          >
            {content.message}
          </Text>

          <View className="space-y-3">
            <TouchableOpacity
              style={{ backgroundColor: color_three }}
              className="py-3 px-6 rounded-lg"
              onPress={content.primaryAction}
            >
              <Text 
                style={{ color: color_four, fontFamily: 'Montserrat-SemiBold' }} 
                className="text-center"
              >
                {content.primaryButton}
              </Text>
            </TouchableOpacity>

            {content.showSecondary && (
              <TouchableOpacity
                className="py-3 px-6 rounded-lg border border-gray-300"
                onPress={dismissUpdate}
              >
                <Text 
                  style={{ color: color_three, fontFamily: 'Montserrat' }} 
                  className="text-center"
                >
                  Later
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateNotification;
