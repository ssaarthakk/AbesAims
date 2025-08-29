import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
import Constants from 'expo-constants';

export interface UpdateInfo {
  isAvailable: boolean;
  manifest?: Updates.Manifest;
}

export class UpdateManager {
  /**
   * Check for available OTA updates
   */
  static async checkForOTAUpdates(): Promise<UpdateInfo> {
    try {
      if (__DEV__) {
        console.log('Updates are disabled in development mode');
        return { isAvailable: false };
      }

      const update = await Updates.checkForUpdateAsync();
      return {
        isAvailable: update.isAvailable,
        manifest: update.manifest
      };
    } catch (error) {
      console.error('Failed to check for OTA updates:', error);
      return { isAvailable: false };
    }
  }

  /**
   * Download and apply OTA update
   */
  static async downloadAndApplyUpdate(): Promise<boolean> {
    try {
      if (__DEV__) {
        Alert.alert('Development Mode', 'Updates are not available in development mode');
        return false;
      }

      const update = await Updates.fetchUpdateAsync();
      if (update.isNew) {
        Alert.alert(
          'Update Downloaded',
          'The app will restart to apply the update.',
          [
            {
              text: 'Restart Now',
              onPress: () => Updates.reloadAsync()
            }
          ]
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to download update:', error);
      Alert.alert('Update Failed', 'Could not download the update. Please try again later.');
      return false;
    }
  }

  /**
   * Get current app version info
   */
  static getCurrentVersion(): string {
    if (__DEV__) {
      return 'Development';
    }
    return Constants.expoConfig?.version || 'Unknown';
  }

  /**
   * Check if this is the first launch after an update
   */
  static isFirstLaunchAfterUpdate(): boolean {
    return !Updates.isEmbeddedLaunch;
  }

  /**
   * Simple update check without event listeners (since they're not available in current expo-updates)
   */
  static async checkAndPromptForUpdate(): Promise<void> {
    if (__DEV__) return;

    try {
      const updateInfo = await UpdateManager.checkForOTAUpdates();
      if (updateInfo.isAvailable) {
        Alert.alert(
          'Update Available',
          'A new update is available. Would you like to download it?',
          [
            { text: 'Later', style: 'cancel' },
            { text: 'Download', onPress: () => UpdateManager.downloadAndApplyUpdate() }
          ]
        );
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }
}
