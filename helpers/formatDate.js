import {format} from 'date-fns'
import {id} from 'date-fns/locale'

export default function formatDate(date, option = {}) {
  let formatCode = 'cccc dd MMMM yyyy'

  if (option.withoutYear) {
    formatCode = formatCode.substring(0, formatCode.length - 4)
  }

  if (option.mobileFormat) {
    formatCode = 'dd MMM yyyy'
  }

  if (option.withTime) {
    formatCode += ' kk:mm'
  }

  if (!date) {
    return ''
  }

  return format(new Date(date), formatCode, {locale: id})
}

export function formatTime(date) {
  if (!date) {
    return ''
  }
  return format(new Date(date), 'KK.mm', {locale: id})
}

export function formatSimpleDate(date) {
  if (!date) {
    return ''
  }

  return format(new Date(date), 'dd MMM')
}

export function formateReviewDate(date, option = {}) {
  let formatCode = 'dd MMMM yyyy'

  return format(new Date(date), formatCode, {locale: id})
}
