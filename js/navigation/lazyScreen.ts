import React from 'react'

export type LazyModule<ModuleName extends string, Props> = {
  [Key in ModuleName]: React.ComponentType<Props>
}

const Empty = () => null

function module() {
  return function <Props>(config: LazyModule<string, Props>) {
    return {
      default: Object.values(config)?.[0] ?? Empty,
    }
  }
}

export function lazyScreen<Props>(factory: () => Promise<LazyModule<string, Props>>) {
  return React.lazy<React.ComponentType<Props>>(() => factory().then(module()))
}
