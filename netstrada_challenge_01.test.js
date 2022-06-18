const getCalendarView = require('./netstrada_challenge_01')

describe('getCalendarView function called with arguments:', () => {
  describe('February 1988 (leap year, starts on Monday)', () => {
    const month = getCalendarView(1988, 2)

    it('should return 5 weeks', () => {
      expect(month.length).toEqual(5)
    })

    it('should return the proper data', () => {
      const expected = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, null, null, null, null, null, null]
      ]

      expect(month).toEqual(expected)
    })
  })

  describe('February 1993 (28-day month, starts on Monday)', () => {
    const month = getCalendarView(1993, 2)

    it('should return 4 weeks', () => {
      expect(month.length).toEqual(4)
    })

    it('should return the proper data', () => {
      const expected = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28]
      ]

      expect(month).toEqual(expected)
    })
  })

  describe('January 2022 (31-day month, starts on Saturday)', () => {
    const month = getCalendarView(2022, 1)

    it('should return 6 weeks', () => {
      expect(month.length).toEqual(6)
    })

    it('should return the proper data', () => {
      const expected = [
        [null, null, null, null, null, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30],
        [31, null, null, null, null, null, null]
      ]

      expect(month).toEqual(expected)
    })
  })

  describe('June 2022 (30-day month, starts on Wednesday)', () => {
    const month = getCalendarView(2022, 6)

    it('should return 5 weeks', () => {
      expect(month.length).toEqual(5)
    })

    it('should return the proper data', () => {
      const expected = [
        [null, null, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, null, null, null]
      ]

      expect(month).toEqual(expected)
    })
  })
})
