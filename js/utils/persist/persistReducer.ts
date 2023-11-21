/* eslint-disable no-restricted-imports */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Action, Reducer } from 'redux'
import {
  PersistConfig as ReduxPersistConfig,
  persistCombineReducers as reduxPersistCombineReducers,
  persistReducer as reduxPersistReducer,
} from 'redux-persist'

type AnyState = Record<string, any>
type DefaultPersistConfig<State extends AnyState> = ReduxPersistConfig<State, any, any, any>

export type PersistConfig<State extends AnyState> = Omit<DefaultPersistConfig<State>, 'whitelist' | 'blacklist'> & {
  whitelist: ReadonlyArray<keyof State>
}

export function persistReducer<State extends AnyState, A extends Action = Action>(
  config: PersistConfig<State>,
  baseReducer: Reducer<State, A>
) {
  return reduxPersistReducer<State, A>(config as any, baseReducer)
}

export function persistCombineReducers<State extends AnyState, A extends Action = Action>(
  config: PersistConfig<State>,
  baseReducer: ReducersMapObject<State, A>
) {
  return reduxPersistCombineReducers<State, A>(config as any, baseReducer)
}
