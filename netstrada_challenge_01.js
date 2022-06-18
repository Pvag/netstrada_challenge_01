function getFirstAndLastDay(year, month) {
  // here January is 0
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  // here we are setting "monday" as first day
  const dayInWeekNumber = firstDay.getDay() ? firstDay.getDay() - 1 : 6 // Lunedi = 0, Domenica = 6
  const lastDayNum = lastDay.getDate() // It could 28,29,30,31
  const lastDayInWeekNum = lastDay.getDay() ? lastDay.getDay() - 1 : 6 // Lunedi = 0, Domenica = 6

  return {
    first: {
      dayOfMonth: 1,
      dayOfWeek: dayInWeekNumber,
    },
    last: {
      dayOfMonth: lastDayNum,
      dayOfWeek: lastDayInWeekNum,
    },
  }
}

/**
 * 
 * @param {number} year The year you are interested in
 * @param {number} month The month of the year, in the regular 1-to-12 format
 * @returns The whole month, divided by weeks of 7 days each, with days number, including "null days" - completes the challenge
 */
function getCalendarView(year, month) {
  const monthData = getFirstAndLastDay(year, month - 1)
  // here your code!
  const weeks = initWeeks(monthData)
  const daysPerWeek = 7
  let counter = monthData.first.dayOfWeek

  for (day = monthData.first.dayOfMonth; day <= monthData.last.dayOfMonth; day++) {
    const week = Math.floor(counter / daysPerWeek)
    const dayOfWeek = counter % daysPerWeek
    weeks[week][dayOfWeek] = day
    counter++
  }

  return weeks
}

/**
 * 
 * @param {object} monthData Contains informations about first and last day of the selected month
 * @returns The whole month, in a 2D array, with the days in all the weeks initialized to `null`, each row representing one week
 */
function initWeeks(monthData) {
  const numberOfDaysInWeeks = monthData.last.dayOfMonth + monthData.first.dayOfWeek // including "null" days
  const daysPerWeek = 7
  const nWeeks = Math.ceil(numberOfDaysInWeeks / daysPerWeek)
  const weeks = new Array(nWeeks)
  for (k = 0; k < nWeeks; k++) {
    const week = new Array(daysPerWeek).fill(null)
    weeks[k] = week
  }

  return weeks
}

module.exports = getCalendarView
