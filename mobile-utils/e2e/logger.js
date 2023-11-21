import { spawn } from 'child_process'

const iosCommand = {
  command: 'xcrun',
  args: [
    'simctl',
    'spawn',
    device.id,
    'log',
    'stream',
    '--debug',
    '--predicate',
    `subsystem == "com.facebook.react.log"`,
  ],
}

const androidCommand = {
  command: 'adb',
  args: ['-s', device.id, 'logcat', '-s', `ReactNative:V ReactNativeJS:V`],
}

export const createRegex = (key, regex, transform) => (map, line) => {
  const match = line.match(regex)
  if (match) {
    let values = map.get(key)
    if (!values) {
      values = []
      map.set(key, values)
    }
    values.push(transform(match))
  }
}

export const logger = (regexes) => {
  const { command, args } = device.getPlatform() === 'ios' ? iosCommand : androidCommand
  const map = new Map()
  let child = null

  function start() {
    if (child) {
      return
    }
    child = spawn(command, args)
    child.stdout.on('data', (data) => {
      const line = data.toString()
      for (const regex of regexes) {
        regex(map, line)
      }
    })
    child.on('close', reset)
  }
  function stop() {
    if (child) {
      child.stdout.destroy()
      child.stderr.destroy()
      child.kill('SIGKILL')
    }
  }

  function reset() {
    map.clear()
  }

  return {
    get: (key) => map.get(key) ?? [],
    start,
    stop,
    reset,
  }
}
