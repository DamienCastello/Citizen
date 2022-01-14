import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"

const defaultKey = "token"

export const USER_TOKEN = "user_token"
export const USER_LOG_DATA = "user_log_data"

export const setSecureStorage = async (
  value: string,
  key: string | null = null
) => {
  const tokenKey = key ?? defaultKey

  if (SecureStore.isAvailableAsync()) {
    await SecureStore.setItemAsync(tokenKey, value)
    return
  }

  await AsyncStorage.setItem(tokenKey, value)
}

export const getSecureStorage = async (key: string | null = null) => {
  const tokenKey = key ?? defaultKey

  if (SecureStore.isAvailableAsync()) {
    return await SecureStore.getItemAsync(tokenKey)
  }

  return await AsyncStorage.getItem(tokenKey)
}

export const removeSecureStorage = async (key: string | null = null) => {
  const tokenKey = key ?? defaultKey

  if (SecureStore.isAvailableAsync()) {
    await SecureStore.deleteItemAsync(tokenKey)
    return
  }

  await AsyncStorage.removeItem(tokenKey)
}
