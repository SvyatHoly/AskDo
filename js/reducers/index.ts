import { combineReducers } from '@reduxjs/toolkit'
import { MainReducer } from 'MainScreen/reducers'
import { profileReducer } from 'Profile/reducers'

import { api } from 'utils/api'

const reducers = {
  [MainReducer.name]: MainReducer.reducer,
  [api.reducerPath]: api.reducer,
  [profileReducer.name]: profileReducer.reducer,
}

export const rootReducer = combineReducers(reducers)

type RootReducerState = ReturnType<typeof rootReducer>
export type RootState = RootReducerState

declare global {
  namespace AskDo {
    interface RootState extends RootReducerState {}
  }
}
