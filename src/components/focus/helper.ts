export function getCountdownText(timeRemainingInSeconds: number) {
  const numMinutes = Math.floor(timeRemainingInSeconds / 60)
  const numHours = Math.floor(numMinutes / 60)
  const remainingSeconds = timeRemainingInSeconds % 60

  if (numHours > 0) {
    return `${Math.round(numHours)}h ${
      Math.round(numMinutes) - Math.round(numHours) * 60
    }m ${Math.round(remainingSeconds)}s`
  }

  if (numMinutes > 0) {
    return `${Math.round(numMinutes)}m ${Math.round(remainingSeconds)}s`
  }

  return `${Math.round(remainingSeconds)}s`
}
