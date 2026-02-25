import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color_three, color_four } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateManager } from '@/utils/updateManager';

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
  const [isForceUpdate, setIsForceUpdate] = useState(false);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      // 1. Check for OTA updates first (instant, no store redirect needed)
      const otaUpdate = await UpdateManager.checkForOTAUpdates();
      if (otaUpdate.isAvailable) {
        setUpdateType('ota');
        setIsForceUpdate(false);
        setShowUpdateModal(true);
        return;
      }

      // 2. Check for a newer Play Store version via hosted version manifest
      await checkForPlayStoreUpdates();
    } catch (error) {
      console.log('Error checking for updates:', error);
    }
  };

  const checkForPlayStoreUpdates = async () => {
    try {
      const updateInfo = await UpdateManager.checkForPlayStoreUpdate(currentVersion);

      if (!updateInfo.isUpdateAvailable) return;

      // Don't re-show if user already dismissed this exact version
      // (unless it's a force-update)
      if (!updateInfo.forceUpdate) {
        const dismissed = await AsyncStorage.getItem('dismissedUpdateVersion');
        if (dismissed === updateInfo.latestVersion) return;
      }

      setLatestVersion(updateInfo.latestVersion);
      setReleaseNotes(updateInfo.releaseNotes);
      setIsForceUpdate(updateInfo.forceUpdate);
      setUpdateType('playstore');
      setShowUpdateModal(true);
    } catch (error) {
      console.log('Play Store update check failed:', error);
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
    if (isForceUpdate) return; // Cannot dismiss a force update
    if (updateType === 'playstore') {
      await AsyncStorage.setItem('dismissedUpdateVersion', latestVersion);
    }
    setShowUpdateModal(false);
  };

  const getUpdateContent = () => {
    if (updateType === 'ota') {
      return {
        title: '🚀 Update Available',
        message: 'A new update is ready. It will be applied instantly — no Play Store visit needed. The app will restart after the update.',
        primaryButton: 'Update Now',
        primaryAction: handleOTAUpdate,
        showDismiss: false,
      };
    } else {
      const notes = releaseNotes ? `\n\n${releaseNotes}` : '';
      return {
        title: '📱 New Version Available',
        message: `Version ${latestVersion} is now available on the Play Store!${notes}`,
        primaryButton: 'Update on Play Store',
        primaryAction: handlePlayStoreUpdate,
        showDismiss: !isForceUpdate,
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
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <View className="items-center mb-4">
            <View
              style={{ backgroundColor: color_three }}
              className="w-16 h-16 rounded-full items-center justify-center mb-3"
            >
              <Ionicons
                name={updateType === 'ota' ? 'flash-outline' : 'download-outline'}
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

          <View className="gap-3">
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

            {content.showDismiss && (
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
