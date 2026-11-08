import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteAccessibility() {
  const { pathname } = useLocation()

  useEffect(() => {
    const heading = document.querySelector<HTMLHeadingElement>(
      '#main-content h1',
    )

    document.title = heading
      ? `${heading.textContent?.trim() || 'Sổ Chi Tiêu'} | 6651071017`
      : 'Sổ Chi Tiêu | 6651071017'

    if (heading) {
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}