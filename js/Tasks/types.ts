export enum NavigationItemType {
  Tasks = 'Tasks',
  Chat = 'Chat',
  Profile = 'Profile',
}

export interface TaskCardModel {
  id: string
  type: string
  price: number
  currency: string
  description: string
  startDate: number
  traits: string[]
  location: string
  postDate: number
}

export enum TraitType {
  PRICE,
  CREATED,
  VIEWS,
  RESPONDED,
  STATUS,
}
export interface Trait {
  type: TraitType
  value: number
  currency?: string
  additionalInfo?: string
}
