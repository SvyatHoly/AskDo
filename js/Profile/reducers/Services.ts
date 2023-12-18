import { createSelector, createSlice } from '@reduxjs/toolkit'

import { REDUCER_NAME } from '../constants'
import { ServiceCategory } from 'Profile/types'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

interface State {
  services: ServiceCategory[]
}

const initialState: State = {
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
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
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
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
    {
      id: uuidv4(),
      name: 'parrent two',
      subcategories: [
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
    {
      id: uuidv4(),
      name: 'parrent two',
      subcategories: [
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
    {
      id: uuidv4(),
      name: 'parrent two',
      subcategories: [
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
    {
      id: uuidv4(),
      name: 'parrent two',
      subcategories: [
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
    {
      id: uuidv4(),
      name: 'parrent two',
      subcategories: [
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
    {
      id: uuidv4(),
      name: 'parrent two',
      subcategories: [
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
        { id: uuidv4(), name: 'service one' },
        { id: uuidv4(), name: 'service two' },
        { id: uuidv4(), name: 'service three' },
      ],
    },
  ],
}

export const servicesSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {},
})

const rootSelector = (state: AskDo.RootState) => state[REDUCER_NAME]

export const stateReducer = createSelector(rootSelector, (root) => root[servicesSlice.name])
export const servicesSelector = createSelector(stateReducer, (state) => state)
