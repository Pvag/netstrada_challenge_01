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

function getCalendarView(year, month) {
  const monthData = getFirstAndLastDay(year, month - 1)
  // here your code!

  const data = []
  const counterEnd = monthData.last.dayOfMonth + monthData.first.dayOfWeek
  const nWeeks = Math.ceil(counterEnd / 7)
  let dayOfMonth = monthData.first.dayOfMonth
  let globalCounter = 0
  for (let weekId = 1; weekId <= nWeeks; weekId++) {
    const week = getWeek(
      monthData.first.dayOfWeek,
      monthData.last.dayOfMonth,
      dayOfMonth,
      globalCounter
    )
    dayOfMonth = week[6] + 1
    globalCounter += 7
    data.push(week)
  }

  return data
}

function getWeek(indexOfFirstDayOfFirstWeek, lastDayOfMonth, dayOfMonth, globalCounter) {
  const week = new Array(7).fill(null)

  for (let day = 0; day < 7; day++) {
    if (dayOfMonth > lastDayOfMonth) break
    if (globalCounter >= indexOfFirstDayOfFirstWeek) {
      week[day] = dayOfMonth++
    }
    globalCounter++
  }

  return week
}

module.exports = getCalendarView
