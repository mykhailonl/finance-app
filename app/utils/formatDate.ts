export const formatDate = (dateString: string) => {
  let date: Date

  try {
    date = new Date(dateString)

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
  } catch {
    date = new Date()
  }

  return new Intl.DateTimeFormat('en-GB', {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
