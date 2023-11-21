import type { DangerDSLType } from 'danger'

export interface DangerJs {
  danger: DangerDSLType
  markdown: (message: string) => void
  warn: (message: string) => void
  message: (message: string) => void
  fail: (message: string) => void
}

export type Task = (dangerjs: DangerJs) => Promise<unknown> | unknown
