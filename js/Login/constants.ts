import { createModuleScreenName } from 'navigation/utils'

export const MODULE_NAME = 'LoginScreen'
const createScreenName = createModuleScreenName(MODULE_NAME)

export const screens = {
  LoginScreen: createScreenName('Login'),
  ChooseYourRoleScreen: createScreenName('ChooseYourRoleScreen'),
  LoginEmailScreen: createScreenName('LoginEmailScreen'),
  LoginPasswordScreen: createScreenName('LoginPasswordScreen'),
  LoginConfirmScreen: createScreenName('LoginConfirmScreen'),
  SignUpScreen: createScreenName('SignUpScreen'),
}

//const createActionName = (name: string) => `action/${PACE_BOOST_MODULE_NAME}/${name}`

// Reducers
const REDUCER_NAME = 'Login' as const

// Actions
//const START_BOOST = createActionName('PACE_BOOST_START')

const ACTIONS = {}

const SUB_REDUCERS = {
  ONBOARDING: 'onboarding' as const,
}

export { ACTIONS, REDUCER_NAME, SUB_REDUCERS }
