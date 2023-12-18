import { Album, Experience, Location, ServiceCategory } from 'Profile/types'

export function transformExperiences(experiences: Experience[]) {
  return experiences.map((experience) => {
    const id = experience.id

    const title = experience.name
    const startDate = new Date(experience.startDate).getFullYear()
    let finishDate = 'Present'

    if (experience.finishDate !== undefined && experience.finishDate !== null) {
      finishDate = new Date(experience.finishDate).getFullYear().toString()
    }

    const description = `${startDate} - ${finishDate}`

    return { id, title, description }
  })
}

export function transformLocations(locations: Location[]) {
  return locations.map((location) => {
    const id = location.id
    const title = location.name
    const description = location.address
    return { id, title, description }
  })
}

export function transformServices(services?: ServiceCategory[]) {
  if (!services) {
    return []
  }
  return services.map((service) => {
    const id = service.id
    const name = service.name
    const description = service.subcategories?.map((el) => el.name).join(', ') ?? ''
    const isSelected = false
    return { id, name, description, isSelected }
  })
}

export function transformAlbums(albums?: Album[]) {
  if (!albums) {
    return []
  }
  return albums.map((album) => {
    const id = album.id
    const name = album.name
    const photoURLs = album.photoURLs
    const description = `${album.photoURLs.length} photos`
    return { id, name, photoURLs, description }
  })
}
