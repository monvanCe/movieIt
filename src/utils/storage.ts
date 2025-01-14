import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

const getItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(error);
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  clear,
};
