export const CI = {
  log: (message: string) => {
    // eslint-disable-next-line no-console
    console.log(message)
  },
  error: (error: unknown) => {
    // eslint-disable-next-line no-console
    console.error(error)
  },
}
