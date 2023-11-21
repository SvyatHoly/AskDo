import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
// import { MMKV } from 'react-native-mmkv'

interface Storage {
  getItem(key: string): Promise<string | undefined | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

// const mmkvStorage = new MMKV()

// const MMKVSyncStorage = {
//   setItem: (key: string, value: string) => {
//     mmkvStorage.set(key, value)
//   },
//   getItem: (key: string) => {
//     return mmkvStorage.getString(key)
//   },
//   removeItem: (key: string) => {
//     mmkvStorage.delete(key)
//   },
// }

// const MMKVAsyncStorage: Storage = {
//   getItem: (key) => {
//     return Promise.resolve(MMKVSyncStorage.getItem(key))
//   },
//   setItem: (key, value) => {
//     return Promise.resolve(MMKVSyncStorage.setItem(key, value))
//   },
//   removeItem: (key) => {
//     return Promise.resolve(MMKVSyncStorage.removeItem(key))
//   },
// }

// function createMigratedAsyncStorage({ from: fromStorage, to: toStorage }: { from: Storage; to: Storage }): Storage {
//   return {
//     async getItem(key: string) {
//       try {
//         const res = await toStorage.getItem(key)

//         if (res) {
//           // Using new storage system
//           return res
//         }
//       } catch (e) {
//         // DO NOTHING
//       }
//       // Using old storage system, should only happen once
//       const res = await fromStorage.getItem(key)
//       if (res) {
//         toStorage.setItem(key, res)
//       }
//       fromStorage.removeItem(key) // clear old storage
//       return res
//     },

//     setItem(key, value) {
//       return toStorage.setItem(key, value)
//     },

//     removeItem(key) {
//       return toStorage.removeItem(key)
//     },
//   }
// }

export const localStorage = Platform.select({
  ios: AsyncStorage,
  android: AsyncStorage,
  // android: createMigratedAsyncStorage({
  //   from: AsyncStorage,
  //   to: MMKVAsyncStorage,
  // }),
  default: AsyncStorage,
})
