import { ref } from 'vue'

export function useLocalStorage<T extends object>(key: string, defaultValue = {}) {
  const data = localStorage.getItem(key) || ''
  try {
    return ref<T>(JSON.parse(data))
  } catch (error) {
    console.error(error)
  }
  return ref<T>(defaultValue as T)
}
