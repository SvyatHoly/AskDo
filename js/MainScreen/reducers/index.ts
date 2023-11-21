import { localStorage } from 'utils/localStorage'
import { persistCombineReducers } from 'utils/persist'

import { REDUCER_NAME, SUB_REDUCERS } from '../constants'
import { onboarding } from './onboarding'

const config = {
  key: REDUCER_NAME,
  storage: localStorage,
  whitelist: [],
}

const reducers = persistCombineReducers(config, {
  [SUB_REDUCERS.ONBOARDING]: onboarding,
})

export const MainReducer = {
  name: REDUCER_NAME,
  reducer: reducers,
}
