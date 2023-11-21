// @ts-expect-error We don't want to throw an error because it may change the current behaviour of the application.
export function assertUnreachable(_x: never): never {
  //throw new Error(x)
}
