'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const NavLink = ({
  href,
  exact = false,
  activeClass = 'active',
  exclude = [],
  children,
  className = '',
  ...props
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // مسیر کامل فعلی (path + query)
  const currentPath = pathname + (searchParams.toString() ? `?${searchParams}` : '')

  const isExcluded = exclude.some(ex => currentPath.startsWith(ex))
  const isActive = !isExcluded && (
    exact ? currentPath === href : currentPath.startsWith(href)
  )

  const combinedClass = isActive
    ? `${className} ${activeClass}`.trim()
    : className

  return (
    <Link href={href} className={combinedClass} {...props}>
      {children}
    </Link>
  )
}

export default NavLink