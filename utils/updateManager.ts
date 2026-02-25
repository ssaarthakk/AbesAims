import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
import Constants from 'expo-constants';

/**
 * URL to a hosted version manifest JSON file.
 * Host this file at a public URL (e.g. GitHub raw) and update it
 * each time you publish a new build to the Play Store.
 *
 * Expected JSON shape:
 * {
 *   "version": "2.1.0",
 *   "minimumVersion": "2.0.0",   // optional – forces update if current < this
 *   "releaseNotes": "What's new", // optional
 *   "forceUpdate": false          // optional – hides the "Later" button
 * }
 *
 * Example GitHub raw URL:
 * https://raw.githubusercontent.com/<username>/<repo>/main/version.json
 */
export const VERSION_MANIFEST_URL =
  'https://raw.githubusercontent.com/ssaarthakk/AbesAims/main/version.json';

export interface UpdateInfo {
  isAvailable: boolean;
  manifest?: Updates.Manifest;
}

export interface PlayStoreVersionInfo {
  isUpdateAvailable: boolean;
  latestVersion: string;
  currentVersion: string;
  releaseNotes: string;
  forceUpdate: boolean;
}

/**
 * Compares two semver strings (major.minor.patch).
 * Returns  1 if a > b,  -1 if a < b,  0 if equal.
 */
export function compareVersions(a: string, b: string): number {
  const parse = (v: string) => v.split('.').map(Number);
  const [aMaj, aMin, aPat] = parse(a);
  const [bMaj, bMin, bPat] = parse(b);
  if (aMaj !== bMaj) return aMaj > bMaj ? 1 : -1;
  if (aMin !== bMin) return aMin > bMin ? 1 : -1;
  if (aPat !== bPat) return aPat > bPat ? 1 : -1;
  return 0;
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
   * Check if a newer Play Store version is available by fetching the hosted
   * version manifest JSON (VERSION_MANIFEST_URL).
   * Returns version info and whether an update is available.
   */
  static async checkForPlayStoreUpdate(currentVersion: string): Promise<PlayStoreVersionInfo> {
    const defaultResult: PlayStoreVersionInfo = {
      isUpdateAvailable: false,
      latestVersion: currentVersion,
      currentVersion,
      releaseNotes: '',
      forceUpdate: false,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${VERSION_MANIFEST_URL}?_=${Date.now()}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      });
      clearTimeout(timeoutId);

      if (!response.ok) return defaultResult;

      const data = await response.json();
      const latestVersion: string = data.version ?? currentVersion;
      const releaseNotes: string = data.releaseNotes ?? '';
      const forceUpdate: boolean = data.forceUpdate ?? false;
      const minimumVersion: string | undefined = data.minimumVersion;

      const isNewer = compareVersions(latestVersion, currentVersion) > 0;
      const belowMinimum =
        minimumVersion ? compareVersions(currentVersion, minimumVersion) < 0 : false;

      return {
        isUpdateAvailable: isNewer,
        latestVersion,
        currentVersion,
        releaseNotes,
        forceUpdate: forceUpdate || belowMinimum,
      };
    } catch (error) {
      console.error('Play Store version check failed:', error);
      return defaultResult;
    }
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
