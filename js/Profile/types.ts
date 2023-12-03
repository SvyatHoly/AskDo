export enum ExperienceType {
  work,
  education,
  certfication,
}
export interface Experience {
  id: string
  type: ExperienceType
  name: string
  startDate: number
  finishDate?: number | null // null if is in progress
  photoUrl?: string
  showPhotoToClients?: boolean
}
