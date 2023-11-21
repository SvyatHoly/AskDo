import { ACTIONS, REDUCER_NAME, SUB_REDUCERS } from '../constants'

interface MainOnboardingReducer {}

const initialState: MainOnboardingReducer = {}

export const onboarding = (state: MainOnboardingReducer = initialState, action: any): MainOnboardingReducer => {
  return state
  //   switch (action.type) {
  //     case ApiConstants.GET_USERS_ME_EXERCISES_SUCCESS: {
  //       return {
  //         ...state,
  //         zaryadkaFetched: true,
  //         isOldUsed: !!action.payload.data.length,
  //       }
  //     }
  //     default:
  //       return state
  //   }
}

export const paceBoostOnboardingSelector = (state: AskDo.RootState) => state[REDUCER_NAME][SUB_REDUCERS.ONBOARDING]
