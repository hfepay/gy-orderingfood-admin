import moment from 'dayjs'
import { timeUnitType } from './timeUnit'
import { firstWordToUpperCase } from './helper'

/**
 * timeUtils：
 *  方法列表:
 *    format(fmt) : 根据fmt格式化时间，默认YYYY-MM-DD HH:mm:ss
 *    getNow() : 获取当前时间
 *    // ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', 'years']
 *    get[type]Range: 获取未来范围时间
 *    getBefore[type]Range: 获取过去范围时间
 */
const defaultFmt = 'YYYY-MM-DD HH:mm:ss'

const format = function(date = new Date(), fmt = defaultFmt) {
  return moment(date).format(fmt)
}

const rangeTypes = Object.keys(timeUnitType).map(key => timeUnitType[key])

const getNow = function(fmt) {
  return format(new Date(), fmt)
}

const timeUtils = {
  format, getNow
}
/**
 *
 * @param fmt 格式
 * @param key
 * @param type 获取过去时间段（subtract）or未来时间段（add）
 * @returns {string[]}
 */
const getRange = (fmt, key, type = 'add') => {
  const now = getNow(fmt)
  let interval = null
  switch (type) {
    case 'subtract':
      interval = moment(now).subtract(1, key).format(fmt)
      return [interval, now]
    default:
      interval = moment(now).add(1, key).format(fmt)
      return [now, interval]
  }
}

rangeTypes.forEach(key => {
  timeUtils[`get${firstWordToUpperCase(key)}Range`] = (fmt = defaultFmt) => {
    return getRange(fmt, key)
  }
  timeUtils[`getBefore${firstWordToUpperCase(key)}Range`] = (fmt = defaultFmt) => {
    return getRange(fmt, key, 'subtract')
  }
})

export default timeUtils
