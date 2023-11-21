type Path<Prefix extends string, Name extends string> = `screen/${Prefix}/${Name}`

type PathCreator<Prefix extends string> = <Name extends string>(name: Name) => Path<Prefix, Name>

export const createModuleScreenName =
  <Module extends string>(module: Module): PathCreator<Module> =>
  (name) =>
    `screen/${module}/${name}`
