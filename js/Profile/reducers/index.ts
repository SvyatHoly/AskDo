import { localStorage } from 'utils/localStorage'
import { persistCombineReducers } from 'utils/persist'

import { REDUCER_NAME } from '../constants'
import { profileDetailsSlice } from './ProfileDetails'
import { servicesSlice } from './Services'

const config = {
  version: 1,
  key: REDUCER_NAME,
  storage: localStorage,
  whitelist: [],
}

const reducers = persistCombineReducers(config, {
  [profileDetailsSlice.name]: profileDetailsSlice.reducer,
  [servicesSlice.name]: servicesSlice.reducer,
})

export const profileReducer = {
  name: REDUCER_NAME,
  reducer: reducers,
}
