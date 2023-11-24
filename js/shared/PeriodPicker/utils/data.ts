import moment from 'moment'
export interface Day_Type {
  date: string | null
  type: string | null
  isToday: boolean
  isBeforeToday: boolean
  isAfterToday: boolean
  isHoliday: boolean
}

export type Week_Type = Day_Type[]
export interface Month_Type {
  year: number
  month: number
  id: string
}

export function getMonths(pastYearRange: number, futureYearRange: number) {
  const currentYear = moment().year()
  const startYear = currentYear - pastYearRange
  console.log('🚀 ~ file: data.ts:21 ~ getMonths ~ startYear:', startYear)
  const endYear = currentYear + futureYearRange
  console.log('🚀 ~ file: data.ts:23 ~ getMonths ~ endYear:', endYear)

  const months: any = []
  for (let i = 0; i < endYear - startYear; i++) {
    const year = startYear + i
    for (let i = 0; i < 12; i++) {
      let id = ''
      if (i < 9) {
        id = `${year}-0${i + 1}`
      } else {
        id = `${year}-${i + 1}`
      }
      months.push({
        id,
        year,
        month: i + 1,
      })
    }
  }
  return months
}

// export function getWeeks(month: string, startDate: string | null, endDate: string | null) {
//   const today = moment().format('YYYY-MM-DD')
//   const currentMonth = moment(month).month()
//   const currentDate = moment(month).startOf('month')

//   let week: any = []
//   let weeks: any = []
//   let dayObj: any = {}

//   do {
//     week = []
//     for (let i = 0; i < 7; i++) {
//       dayObj = {
//         type: null,
//         date: null,
//         isToday: false,
//         isBeforeToday: false,
//         isAfterToday: false,
//         isHoliday: false,
//       }
//       const currentDateString = currentDate.format('YYYY-MM-DD')

//       if (i == currentDate.weekday() && currentDate.month() == currentMonth) {
//         if (startDate && startDate === currentDateString) {
//           if (!endDate) {
//             dayObj.type = 'single'
//           } else {
//             dayObj.type = 'start'
//           }
//         }

//         if (endDate && endDate == currentDateString) {
//           if (startDate === endDate) {
//             dayObj.type = 'single'
//           } else {
//             dayObj.type = 'end'
//           }
//         }
//         if (startDate && startDate < currentDateString && endDate && endDate > currentDateString) {
//           dayObj.type = 'between'
//         }

//         const date = currentDate.clone().format('YYYY-MM-DD')
//         const passedDayFromToday = currentDate.diff(moment(), 'day') < 0
//         const futureDayFromToday = currentDate.diff(moment(), 'hours') > 0
//         dayObj.date = date
//         if (date === today) {
//           dayObj.isToday = true
//         }
//         if (passedDayFromToday) {
//           dayObj.isBeforeToday = true
//         }
//         if (futureDayFromToday) {
//           dayObj.isAfterToday = true
//         }
//         if (i === 5 || i === 6) {
//           dayObj.isHoliday = true
//         }
//         week.push(dayObj)
//         currentDate.add(1, 'day')
//       } else {
//         if (startDate && endDate && startDate < startDate && endDate >= startDate) {
//           dayObj.type = 'between'
//         }

//         week.push(dayObj)
//       }
//     }
//     weeks.push(week)
//   } while (currentDate.month() == currentMonth)

//   return weeks
// }

export function getWeeks(month: string, startDate: string | null, endDate: string | null) {
  console.log('function call')
  const today = moment().startOf('day')
  const currentMonth = moment(month).startOf('month')
  const weeks: any[] = []

  let currentDate = currentMonth.clone().startOf('week')

  while (currentDate.isSameOrBefore(currentMonth.endOf('month'), 'day')) {
    const week: any[] = []

    for (let i = 0; i < 7; i++) {
      const currentDateString = currentDate.format('YYYY-MM-DD')
      const isCurrentMonth = currentDate.month() === currentMonth.month()
      const isWeekend = i === 5 || i === 6

      let type = null
      if (isCurrentMonth) {
        if (startDate === currentDateString && endDate === startDate) {
          type = 'single'
        } else if (startDate === currentDateString) {
          type = endDate ? 'start' : 'single'
        } else if (endDate === currentDateString) {
          type = startDate === endDate ? 'single' : 'end'
        } else if (startDate && startDate < currentDateString && endDate && endDate > currentDateString) {
          type = 'between'
        }
      }

      const dayObj = {
        type,
        date: isCurrentMonth ? currentDate.format('YYYY-MM-DD') : null,
        isToday: today.isSame(currentDate, 'day'),
        isBeforeToday: today.isAfter(currentDate, 'day'),
        isAfterToday: today.isBefore(currentDate, 'day'),
        isHoliday: isWeekend,
      }

      week.push(dayObj)
      currentDate.add(1, 'day')
    }

    weeks.push(week)
  }

  return weeks
}
