import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { ApiError } from 'redux-api-middleware'

/**
 * Redux middleware to intercept unathorized error.
 */
export const unauthorizedNetworkErrorInterceptor: Middleware = () => (next) => (action: AnyAction) => {
  if (action.payload instanceof ApiError) {
    unauthorizeIfUnauthorizedNetworkError(action.payload)
  }
  return next(action)
}

function isUnauthorizedError(error: Pick<ApiError, 'status'>): boolean {
  return error.status === 452
}

export function unauthorizeIfUnauthorizedNetworkError(error: Pick<ApiError, 'status'>) {
  if (isUnauthorizedError(error)) {
  }
}
