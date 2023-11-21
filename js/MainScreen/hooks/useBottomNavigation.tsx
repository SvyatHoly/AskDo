import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react'

type Listener<S> = (next: S, prev: S) => void
function atom<S>(initialState: S) {
  let prev = initialState
  let value = initialState
  let listeners: Array<Listener<S>> = []

  return {
    deref: () => value,
    reset: (next: S) => {
      if (next !== value) {
        prev = value
        value = next
        listeners.forEach((listener) => listener(next, prev))
      }
    },
    subscribe: (listener: Listener<S>) => {
      listeners.push(listener)
      listener(value, prev)

      return () => {
        listeners = listeners.filter((l) => l !== listener)
      }
    },
  }
}
type NavigationShown = ReturnType<typeof atom<boolean>>

interface NavigationContextType {
  showNavigation: () => void
  hideNavigation: () => void
  navigationShown: NavigationShown
}

const NavigationContext = createContext<NavigationContextType>({
  // stub
  showNavigation: () => null,
  hideNavigation: () => null,
  navigationShown: atom(false),
})

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(() => {
    const navigationShown = atom(true)
    return {
      navigationShown,
      showNavigation: () => navigationShown.reset(true),
      hideNavigation: () => navigationShown.reset(false),
    }
  }, [])
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export const useBottomNavigation = () => {
  return useContext(NavigationContext)
}

export const useIsNavShown = () => {
  const { navigationShown } = useBottomNavigation()
  const [isNavigationShown, setNavigationShown] = useState(navigationShown.deref())

  useEffect(() => navigationShown.subscribe(setNavigationShown), [navigationShown])

  return isNavigationShown
}
