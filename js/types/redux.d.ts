import { Store } from '@reduxjs/toolkit'

export type AsyncAction<ReturnType, State = AskDo.RootState> = (
  dispatch: Store['dispatch'],
  getState: () => State,
  extraArgument: ExtraThunkArg
) => ReturnType

declare global {
  namespace AskDo {
    interface RootState {}
  }
}
