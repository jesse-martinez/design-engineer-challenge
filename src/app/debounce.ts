export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): T {
  let timeout: NodeJS.Timeout | null

  return function (this: any, ...args: any[]) {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }

    clearTimeout(timeout!)
    timeout = setTimeout(later, wait)
  } as T
}
