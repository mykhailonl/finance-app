export const formatTransactionDateTime = (dateISO: string, timeISO: string) => {
  return new Date(`${dateISO}T${timeISO}:00`).toISOString()
}
