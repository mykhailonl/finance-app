import { getUserTimezone } from '~/utils/getUserTimeZone'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const userTimezone = getUserTimezone()

  return new Intl.DateTimeFormat('en-GB', {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: userTimezone,
  }).format(date)
}
