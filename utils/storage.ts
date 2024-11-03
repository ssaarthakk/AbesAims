import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData<T>(key: string, data: T): Promise<void> {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    console.log(`Data saved successfully under key: ${key}`);
  } catch (error) {
    console.error('Error saving data to AsyncStorage', error);
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return jsonData != null ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage', error);
    return null;
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data removed successfully for key: ${key}`);
  } catch (error) {
    console.error('Error removing data from AsyncStorage', error);
  }
}