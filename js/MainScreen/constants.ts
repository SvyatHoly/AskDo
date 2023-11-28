import { createModuleScreenName } from 'navigation/utils'

export const MODULE_NAME = 'MainScreen'
const createScreenName = createModuleScreenName(MODULE_NAME)

export const screens = {
  MainScreen: createScreenName('Main'),
}

//const createActionName = (name: string) => `action/${PACE_BOOST_MODULE_NAME}/${name}`

// Reducers
const REDUCER_NAME = 'Main' as const

// Actions
//const START_BOOST = createActionName('PACE_BOOST_START')

const ACTIONS = {}

const SUB_REDUCERS = {
  ONBOARDING: 'onboarding' as const,
}

export { ACTIONS, REDUCER_NAME, SUB_REDUCERS }
