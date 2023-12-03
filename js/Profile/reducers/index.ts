import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import { localStorage } from 'utils/localStorage'
import { persistCombineReducers } from 'utils/persist'
import { REDUCER_NAME } from '../constants'
import { Experience, ExperienceType } from 'Profile/types'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { updateOrPush } from '../utils/updateOrPush'

interface ProfileState {
  description: string
  work: Experience[]
  education: Experience[]
  achieves: Experience[]
}

const initialState: ProfileState = {
  description: '',
  work: [],
  education: [],
  achieves: [],
  // work: [
  //   {
  //     id: uuidv4(),
  //     type: ExperienceType.work,
  //     name: 'employer name',
  //     startDate: 944213413,
  //     finishDate: 1007371813,
  //     photoUrl:
  //       'https://www.homeschooldiploma.com/wp-content/plugins/homeschooldiploma/images/junior-high-elementary-diploma-for-homeschools/main.jpg',
  //     showPhotoToClients: true,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: ExperienceType.work,
  //     name: 'employer name 2',
  //     startDate: 1007371813,
  //   },
  // ],
  // education: [
  //   {
  //     id: uuidv4(),
  //     type: ExperienceType.education,
  //     name: 'uni name',
  //     startDate: 944213413,
  //     finishDate: 1007371813,
  //     photoUrl:
  //       'https://www.homeschooldiploma.com/wp-content/plugins/homeschooldiploma/images/junior-high-elementary-diploma-for-homeschools/main.jpg',
  //     showPhotoToClients: true,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: ExperienceType.education,

  //     name: 'uni name 2',
  //     startDate: 1007371813,
  //   },
  // ],
  // achieves: [
  //   {
  //     id: uuidv4(),
  //     type: ExperienceType.certfication,
  //     name: 'achieves name',
  //     startDate: 944213413,
  //     finishDate: 1007371813,
  //     photoUrl:
  //       'https://www.homeschooldiploma.com/wp-content/plugins/homeschooldiploma/images/junior-high-elementary-diploma-for-homeschools/main.jpg',
  //     showPhotoToClients: true,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: ExperienceType.certfication,
  //     name: 'achieves name 2',
  //     startDate: 1007371813,
  //   },
  // ],
}

export const profileDetailsSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setWork: (state, action: PayloadAction<Experience>) => {
      state.work = updateOrPush(action.payload.id, action.payload, state.work)
    },
    setEducation: (state, action: PayloadAction<Experience>) => {
      state.education = updateOrPush(action.payload.id, action.payload, state.education)
    },
    setAchieves: (state, action: PayloadAction<Experience>) => {
      state.achieves = updateOrPush(action.payload.id, action.payload, state.achieves)
    },
    deleteById: (state, action: PayloadAction<string>) => {
      const removeExperienceFromArray = (experienceArray: Experience[]): Experience[] => {
        const index = experienceArray.findIndex((exp) => exp.id === action.payload)
        if (index !== -1) {
          return [...experienceArray.slice(0, index), ...experienceArray.slice(index + 1)]
        }
        return experienceArray
      }

      state.work = removeExperienceFromArray(state.work)
      state.education = removeExperienceFromArray(state.education)
      state.achieves = removeExperienceFromArray(state.achieves)
    },
  },
})

export const { setDescription, setWork, setEducation, setAchieves, deleteById } = profileDetailsSlice.actions

const rootSelector = (state: AskDo.RootState) => state[REDUCER_NAME]

export const stateReducer = createSelector(rootSelector, (root) => root[profileDetailsSlice.name])
export const profileSelector = createSelector(stateReducer, (state) => state)

const profileReducerConfig = {
  version: 1,
  key: profileDetailsSlice.name,
  storage: localStorage,
  whitelist: [],
}

export const profileReducer = persistCombineReducers(profileReducerConfig, {
  [profileDetailsSlice.name]: profileDetailsSlice.reducer,
})

export const profileSlice = {
  name: REDUCER_NAME,
  reducer: profileReducer,
}
