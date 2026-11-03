import { describe, expect, it, vi } from 'vitest'
import { debounce } from './utils'

describe('debounce — thời gian chờ và tham số', () => {
  it('đợi đủ thời gian tính từ lần gọi cuối và dùng tham số mới nhất', () => {
    vi.useFakeTimers()

    try {
      const callback = vi.fn<(keyword: string) => void>()
      const debounced = debounce(callback, 300)

      debounced('cơm')
      vi.advanceTimersByTime(200)

      debounced('cà phê')
      vi.advanceTimersByTime(299)

      expect(callback).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith('cà phê')
    } finally {
      vi.useRealTimers()
    }
  })
})