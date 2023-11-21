import { DangerJs, Task } from "./types";

export function runSequently(dangerjs: DangerJs, ...tasks: Task[]) {
  try {
    let promise = Promise.resolve<unknown>(null)

    for (const task of tasks) {
      promise = promise.then(() => task(dangerjs))
    }
  
    return promise
  } catch (error: unknown) {
    dangerjs.fail(String(error))
    throw error
  }
}
