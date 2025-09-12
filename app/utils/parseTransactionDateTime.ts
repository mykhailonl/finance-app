import { getUserTimezone } from '~/utils/getUserTimeZone'

export const parseTransactionDateTime = (isoString: string) => {
  const date = new Date(isoString)
  const userTimezone = getUserTimezone()

  const localDateString = date.toLocaleString('sv-SE', {
    timeZone: userTimezone,
  })

  const [dateISO, timeWithSeconds] = localDateString.split(' ')
  const timeISO = timeWithSeconds.slice(0, 5)

  return { dateISO, timeISO }
}
