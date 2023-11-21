import { NativeModules, Platform } from 'react-native'

/**
 * These parameters are set during codepush build.
 * @see scripts/codepush.js
 */
export type Info = Partial<{
  changedAssets: string[]
  codeBundleId: string
  codepushVersion: number
  mainBundlePath: string
  isDevMenuEnabled?: boolean
}>

interface CodepushInfoIOSModule {
  mainBundlePath?: string
}

const CodepushInfoModule = NativeModules.CodepushInfoNativeModule as CodepushInfoIOSModule | null

if (process.env.NODE_ENV !== 'test' && Platform.OS === 'ios' && !CodepushInfoModule) {
  throw new Error('It seems you forgot to link the native part!')
}

const mainBundlePath = __DEV__ ? undefined : CodepushInfoModule?.mainBundlePath

export function setupCodepushInfo<Config extends Record<string, any>>(config: Config): Info & Partial<Config> {
  return {
    mainBundlePath,
    ...config,
  }
}
