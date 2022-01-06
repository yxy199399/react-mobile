export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

export const throttle = (fn: (v?: string) => void, delay: number) => {
  let timer: any = null
  return function (v?: string) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(v)
    }, delay)
  }
}
