// 毫秒值
const MILLISECOND = 1
const SECONDS = MILLISECOND * 1000
const MINUTES = SECONDS * 60
const HOUR = MINUTES * 60
const DAY = HOUR * 24
const WEEK = DAY * 7

export const timeUnit = {
  SECONDS, MINUTES, HOUR, DAY, WEEK
}
// ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', 'years']
export const timeUnitType = {
  MILLISECOND: 'milliseconds',
  SECOND: 'seconds',
  MINUTE: 'minutes',
  HOUR: 'hours',
  DAY: 'days',
  WEEK: 'weeks',
  MONTH: 'months',
  QUARTER: 'quarters',
  YEAR: 'years'
}
