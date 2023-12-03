import { Experience } from 'Profile/types'

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
