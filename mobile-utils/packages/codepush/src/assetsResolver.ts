import { Image, ImageResolvedAssetSource, Platform } from 'react-native'

// See https://github.com/facebook/react-native/blob/v0.71.7/Libraries/Image/AssetSourceResolver.js#L53
interface AssetSourceResolver {
  defaultAsset(): ImageResolvedAssetSource
  resourceIdentifierWithoutScale(): ImageResolvedAssetSource
  scaledAssetPath(): ImageResolvedAssetSource
}

function isChanged(changedUris: string[], uri: string): boolean {
  return changedUris.some((changedUri) => uri.endsWith(changedUri))
}

type AssetTransformer = (resolver: AssetSourceResolver) => ImageResolvedAssetSource

const codePushTransformer =
  (mainBundlePath: string, uris: string[]): AssetTransformer =>
  (resolver) => {
    const asset = resolver.defaultAsset()

    if (isChanged(uris, asset.uri)) {
      return asset
    }

    if (Platform.OS === 'android') {
      return resolver.resourceIdentifierWithoutScale()
    }

    if (Platform.OS === 'ios') {
      // Resolves to just the scaled asset filename
      // E.g. 'assets/AwesomeModule/icon@2x.png'
      const iosAsset = resolver.scaledAssetPath()
      return {
        ...iosAsset,
        uri: `${mainBundlePath}/${iosAsset.uri}`,
      }
    }

    return asset
  }

type SetSourceTransformer = (transformer: AssetTransformer) => void

const setCustomSourceTransformer =
  // @ts-expect-error See https://github.com/facebook/react-native/blob/v0.71.7/Libraries/Image/resolveAssetSource.js#L77
  Image.resolveAssetSource.setCustomSourceTransformer as SetSourceTransformer

if (__DEV__ && typeof setCustomSourceTransformer !== 'function') {
  throw new Error('There is not setCustomSourceTransformer frunction')
}

export const setupCustomSourceTransformer = (mainBundlePath: string, changedAssets: string[]) =>
  setCustomSourceTransformer(codePushTransformer(mainBundlePath, changedAssets))
