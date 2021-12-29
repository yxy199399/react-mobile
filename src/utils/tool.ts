export function httpSuccess(key: string | number) {
  if (key === 200) return true
  return false
}

export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
