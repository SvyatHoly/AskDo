import { AnyAction, Store } from '@reduxjs/toolkit'
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import JSONBig from 'json-bigint'
import queryString from 'query-string'

// import { getSuitableLocale } from 'utils/i18n/intl'

import { unauthorizeIfUnauthorizedNetworkError } from './network/unauthorizedNetworkErrorInterceptor'
import { Coordinate } from 'Profile/types'

type Headers = Record<string, string>

interface HeadersConfig {
  config: {
    preferredLanguages?: string[]
  }
  session: {
    token?: string
  }
  headers: Headers
}

/**
 * @deprecated use rkt-query instead
 */
export function headers(extraHeaders?: Headers) {
  return ({ config, headers: storeHeaders, session }: HeadersConfig) => {
    // TODO: add Timezone

    const defaultHeaders: Headers = {
      'Content-Type': 'application/json',
      // 'Accept-Language': getSuitableLocale(config.preferredLanguages),
    }

    if (session && session.token) {
      defaultHeaders['Authentication-Token'] = session.token
    }

    return {
      ...defaultHeaders,
      ...storeHeaders,
      ...extraHeaders,
    }
  }
}

export function imageUploadHeaders() {
  return (config: HeadersConfig) => {
    // TODO: add Timezone

    return {
      ...headers()(config),
      'Content-Type': 'multipart/form-data',
    }
  }
}

interface PathParams {
  config: {
    apiUrl: string
  }
}

const hasApiUrl = (params?: any): params is PathParams => params && params.config && params.config.apiUrl

/**
 * @deprecated use rkt-query instead
 */
export function path(pathname: string, query?: unknown) {
  const fullPath = pathname + (query ? `?${queryString.stringify(query)}` : '')

  return function (params?: unknown) {
    if (hasApiUrl(params)) {
      return `${params.config.apiUrl}${fullPath}`
    }
    return fullPath
  }
}

/**
 * @deprecated use rkt-query instead
 */
export function getJSON<Result = any>(response: Response): Promise<Result> {
  if (response.ok) {
    return response.text().then(JSONBig.parse) as Promise<Result>
  }
  return response
    .text()
    .then((text) => {
      try {
        return JSON.parse(text) as unknown
      } catch (e) {
        return text
      }
    })
    .then((data) => Promise.reject(data))
}

/**
 * @deprecated use rkt-query instead
 */
export const makeStore = (api: BaseQueryApi) => {
  const getState = () => api.getState() as AskDo.RootState
  const dispatch = ((action: AnyAction) => api.dispatch(action)) as Store['dispatch']

  return {
    getState,
    dispatch,
  }
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders(requestHeader, api) {
    const headersFromState = headers({})(api.getState() as HeadersConfig)
    const entries = Object.entries(headersFromState)

    for (const [key, value] of entries) {
      if (!requestHeader.has(key)) {
        requestHeader.set(key, value)
      }
    }
  },
  fetchFn: async (input, init) => {
    const response = await fetch(input, init)
    unauthorizeIfUnauthorizedNetworkError(response)
    return response
  },
})

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#constructing-a-dynamic-base-url-using-redux-state
const dynamicBaseQuery = (): BaseQuery => (args, api, extraOptions) => {
  const state = api.getState()
  if (hasApiUrl(state)) {
    const apiUrl = state.config.apiUrl
    const path = typeof args === 'string' ? args : args.url
    const url = path.startsWith('http://') || path.startsWith('https://') ? path : `${apiUrl}/${path}`
    args = typeof args === 'string' ? url : { ...args, url }
  }
  const result = rawBaseQuery(args, api, extraOptions)

  return result
}

const reducerPath = 'askDoApi' as const

export const api = createApi({
  reducerPath,
  baseQuery: dynamicBaseQuery(),
  keepUnusedDataFor: process.env.NODE_ENV !== 'test' ? 60 : 0,
  endpoints: () => ({
    // You can put here shared endpoints
    // For feature endpoints it's better to keep them close to module and use injectEndpoints
    // See https://redux-toolkit.js.org/rtk-query/usage/code-splitting
  }),
})

type OmitFromUnion<T, K extends keyof T> = T extends any ? Omit<T, K> : never

/**
 * Redirects success response from rkt-query to onSuccess callback
 * It is usefful for migration from redux-api-middleware
 */
export function redirect<ResultType, QueryArg>({
  query,
  onSuccess,
}: {
  query(arg: QueryArg): BaseQueryArg<BaseQuery>
  onSuccess: (result: ResultType, store: ReturnType<typeof makeStore>) => void
}): OmitFromUnion<QueryDefinition<QueryArg, BaseQuery, never, null, typeof reducerPath>, 'type'> {
  return {
    queryFn: async (queryArgs, api, _extraOptions, baseQuery) => {
      const args = query(queryArgs)
      const result = await baseQuery(args)
      if (result.error == null) {
        onSuccess(result.data as ResultType, makeStore(api))
        return { ...result, data: null }
      }
      return result
    },
  }
}

const myApiKey = 'AIzaSyCdER-3lZTbyqkQm3BJzQtOgFiHUFR9q_4'

export function getAddressFromCoordinates({ latitude, longitude }: Coordinate) {
  return new Promise((resolve, reject) => {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + myApiKey

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'OK') {
          resolve(responseJson?.results?.[0]?.formatted_address)
        } else {
          reject('not found')
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
