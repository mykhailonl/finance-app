export const normalizePeriod = (month: string, year: string) => {
  const normalizedMonth = month.length === 1 ? `0${month}` : month

  return `${year}-${normalizedMonth}`
}
