// NOTE: this implementation breaks the rule (just a tad bit) for the challenge in the following ways:
//
// - uses an external library (gpu.js) - a small one, though ;)
// - uses "-1", instead of `null`, for "empty" days, at the beginning and/or end of the month (tests have been adjusted accordingly)
// - returns an array of `Float32Array`s, instead of returning an array of "simple" arrays (tests have been adjusted accordingly)

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
 * @param {number} start Day of the week of the first day of the month (0, for Monday to 6, for Sunday)
 * @param {number} lastDay Last day of the month (28 | 29 | 30 | 31)
 * @returns The kernel to perform the computation for the month days in parallel on the GPU
 */
const getCalendarViewKernel = function(start, lastDay) {
  // Parallel code, computed on the GPU - each thread performs computations for its own day!
  // Think of the month as a 2D matrix of `nWeeks` rows and 7 columns
  const dayOfWeek = this.thread.x // 0 to 6
  const weekOfMonth = this.thread.y // 0 to 4 | 5 | 6, depending on the month
  const daysPerWeek = 7
  const nullValue = -1 // kernels can only return Float32, so no `null` value, unfortunately!

  if (weekOfMonth === 0 && dayOfWeek < start) return nullValue

  const day = dayOfWeek - start + weekOfMonth * daysPerWeek + 1

  return (day > lastDay) ? nullValue : day
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
  const { GPU } = require('gpu.js')
  const gpu = new GPU()
  const numberOfDaysInWeeks = monthData.last.dayOfMonth + monthData.first.dayOfWeek // including "null" days
  const daysPerWeek = 7
  const nWeeks = Math.ceil(numberOfDaysInWeeks / daysPerWeek)
  const kernelSettings = {
    output: [daysPerWeek, nWeeks] // notice: width, height of the 2D array
  }
  const parallelGetCalendarView = gpu.createKernel(getCalendarViewKernel, kernelSettings)
  const weeks = parallelGetCalendarView(monthData.first.dayOfWeek, monthData.last.dayOfMonth)

  return weeks
}

module.exports = getCalendarView
