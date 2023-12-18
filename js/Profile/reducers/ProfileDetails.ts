import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import { localStorage } from 'utils/localStorage'
import { persistCombineReducers } from 'utils/persist'
import { REDUCER_NAME } from '../constants'
import { Album, Experience, ExperienceType, Location, ServiceCategory } from 'Profile/types'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { updateOrPush } from '../utils/updateOrPush'

interface ProfileState {
  description: string
  work: Experience[]
  education: Experience[]
  achieves: Experience[]
  office: Location[]
  rideOut: Location[]
  isWorkRemotely: boolean
  services: ServiceCategory[]
  albums: Album[]
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
  office: [
    {
      id: uuidv4(),
      coordinate: { latitude: 41.391476, longitude: 2.185535 },
      address: 'Carrer de Buenaventura Muñoz, 24I, 08018 Barcelona',
    },
  ],
  rideOut: [
    {
      id: uuidv4(),
      coordinate: { latitude: 41.391476, longitude: 2.185535 },
      address: 'Carrer de Buenaventura Muñoz, 24I, 08018 Barcelona',
    },
  ],
  isWorkRemotely: true,
  services: [
    {
      id: '1',
      name: 'parrent 1',
      subcategories: [
        { id: '2', name: 'service 2' },
        { id: '3', name: 'service 3' },
        { id: '4', name: 'service 4' },
        { id: '5', name: 'service 5' },
        { id: '6', name: 'service 6' },
      ],
    },
    {
      id: '7',
      name: 'parrent 7',
      subcategories: [
        { id: '8', name: 'service 8' },
        { id: '9', name: 'service 9' },
        { id: '10', name: 'service 10' },
        { id: '11', name: 'service 11' },
        { id: '12', name: 'service 12' },
      ],
    },
  ],
  albums: [
    {
      id: uuidv4(),
      name: 'name',
      category: {
        id: '1',
        name: 'parrent 1',
        subcategories: [
          { id: '2', name: 'service 2' },
          { id: '3', name: 'service 3' },
          { id: '4', name: 'service 4' },
          { id: '5', name: 'service 5' },
          { id: '6', name: 'service 6' },
        ],
      },
      photoURLs: [
        'https://www.tiroglass.net/uploads/35DBhdNn/357x357_256x256/tiro-glass-carpinteria-y-cristaleria-aluminio-y-pvc-1.jpg',
        'https://www.tiroglass.net/uploads/35DBhdNn/357x357_256x256/tiro-glass-carpinteria-y-cristaleria-aluminio-y-pvc-1.jpg',
        'https://www.tiroglass.net/uploads/35DBhdNn/357x357_256x256/tiro-glass-carpinteria-y-cristaleria-aluminio-y-pvc-1.jpg',
        'https://www.tiroglass.net/uploads/35DBhdNn/357x357_256x256/tiro-glass-carpinteria-y-cristaleria-aluminio-y-pvc-1.jpg',
        'https://www.tiroglass.net/uploads/35DBhdNn/357x357_256x256/tiro-glass-carpinteria-y-cristaleria-aluminio-y-pvc-1.jpg',
        'https://www.tiroglass.net/uploads/35DBhdNn/357x357_256x256/tiro-glass-carpinteria-y-cristaleria-aluminio-y-pvc-1.jpg',
      ],
    },
  ],
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
    setOffice: (state, action: PayloadAction<Location>) => {
      state.office = updateOrPush(action.payload.id, action.payload, state.office)
    },
    setRideOut: (state, action: PayloadAction<Location>) => {
      state.rideOut = updateOrPush(action.payload.id, action.payload, state.rideOut)
    },
    setIsRemote: (state, action: PayloadAction<boolean>) => {
      state.isWorkRemotely = action.payload
    },
    setServices: (state, action: PayloadAction<ServiceCategory>) => {
      state.services = updateOrPush(action.payload.id, action.payload, state.services)
    },
    setAlbum: (state, action: PayloadAction<Album>) => {
      state.albums = updateOrPush(action.payload.id, action.payload, state.albums)
    },
    deleteById: (state, action: PayloadAction<string>) => {
      const removeExperienceFromArray = (experienceArray: any[]): any[] => {
        const index = experienceArray.findIndex((exp) => exp.id === action.payload)
        if (index !== -1) {
          return [...experienceArray.slice(0, index), ...experienceArray.slice(index + 1)]
        }
        return experienceArray
      }

      state.work = removeExperienceFromArray(state.work)
      state.education = removeExperienceFromArray(state.education)
      state.achieves = removeExperienceFromArray(state.achieves)
      state.office = removeExperienceFromArray(state.office)
      state.rideOut = removeExperienceFromArray(state.rideOut)
      state.services = removeExperienceFromArray(state.services)
      state.albums = removeExperienceFromArray(state.albums)
    },
  },
})

export const {
  setDescription,
  setWork,
  setEducation,
  setAchieves,
  deleteById,
  setOffice,
  setRideOut,
  setIsRemote,
  setServices,
  setAlbum,
} = profileDetailsSlice.actions

const rootSelector = (state: AskDo.RootState) => state[REDUCER_NAME]

export const stateReducer = createSelector(rootSelector, (root) => root[profileDetailsSlice.name])
export const profileSelector = createSelector(stateReducer, (state) => state)
