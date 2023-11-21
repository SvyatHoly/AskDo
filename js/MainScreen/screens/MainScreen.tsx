import React, { useCallback } from 'react'
import { NavigationContextProvider, useIsNavShown } from '../hooks/useBottomNavigation'
import { NavigationItemType } from '../types'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabBar } from '../components/TabBar/TabBar'
import { TasksScreen } from '../../Tasks/screens/TasksScreen'

const Tab = createBottomTabNavigator()
const { Tasks, Chat, Profile } = NavigationItemType

export const MainScreen = () => {
  return (
    <NavigationContextProvider>
      <Tab.Navigator
        initialRouteName={Tasks}
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <NavigationTabBar {...props} />}>
        <Tab.Screen name={Tasks} component={TasksScreen} />
        <Tab.Screen name={Chat} component={TasksScreen} />
        <Tab.Screen name={Profile} component={TasksScreen} />
      </Tab.Navigator>
    </NavigationContextProvider>
  )
}
const NavigationTabBar = React.memo(({ insets, state, navigation }: BottomTabBarProps) => {
  const items: NavigationItemType[] = []
  const routes = state.routes
  let selectedItem = NavigationItemType.Tasks
  let index = 0
  for (const route of routes) {
    const name = route.name as NavigationItemType
    items.push(name)
    const isFocused = state.index === index
    if (isFocused) {
      selectedItem = name
    }
    index += 1
  }
  const handleSetSelectedPage = useCallback(
    (_: NavigationItemType, newSelected: NavigationItemType) => {
      const target = routes.find((route) => route.name === newSelected)
      const event = navigation.emit({
        type: 'tabPress',
        target: target?.key,
        canPreventDefault: true,
      })

      if (!event.defaultPrevented) {
        navigation.navigate(newSelected)
      }
    },
    [routes, navigation]
  )
  const isNavShown = true //useIsNavShown()

  if (isNavShown) {
    return <TabBar selectedItem={selectedItem} items={items} onItemSelect={handleSetSelectedPage} insets={insets} />
  }

  return null
})
