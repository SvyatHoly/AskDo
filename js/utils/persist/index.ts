import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// ts-prune-ignore-next
export { autoMergeLevel2 }
/**
 * By default redux-persist uses autoMergeLevel2 for combined state
 * see https://github.com/rt2zz/redux-persist/blob/master/src/persistCombineReducers.ts#L18C9-L18C24
 */
export const autoMergeCombinedState = autoMergeLevel2
export { persistReducer, persistCombineReducers } from './persistReducer'
export type { PersistConfig } from './persistReducer'
