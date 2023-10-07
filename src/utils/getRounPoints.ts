export const getRoundPoints = (percent: number) => {
  return Math.round(percent / 100 * 5000) <= 5000 ? Math.round(percent / 100 * 5000) : 5000
}