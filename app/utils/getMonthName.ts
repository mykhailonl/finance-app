export const getMonthName = (monthNum: number, locale = 'en-US') => {
  if (monthNum < 1 || monthNum > 12) {
    return 'January'
  }

  const date = new Date(2000, monthNum - 1, 1)

  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
}
