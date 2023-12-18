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

export interface ServiceCategory {
  id: string
  name: string
  subcategories?: ServiceCategory[]
}

export type Coordinate = {
  latitude: number
  longitude: number
}
export interface Location {
  id: string
  coordinate: Coordinate
  address: string
}

export interface Album {
  id: string
  name: string
  category: ServiceCategory
  photoURLs: string[]
}

export enum ModalType {
  description,
  work,
  education,
  achieves,
  intermediate,
  office,
  rideOut,
  service,
  albums,
}
