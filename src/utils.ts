export function formatCurrency(
  amount: number,
  currency: string = 'VND',
): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function truncateText(
  text: string,
  maxLength: number,
): string {
  const limit = Math.max(0, Math.floor(maxLength))

  if (text.length <= limit) {
    return text
  }

  return `${text.slice(0, limit)}...`
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: Args): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined
      fn(...args)
    }, delay)
  }
}