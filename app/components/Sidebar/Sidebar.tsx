import cn from 'classnames'
import { motion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { NavLink, useLocation } from 'react-router'

import { Button } from '~/components/Button'
import { NavItem } from '~/components/NavItem'
import { NAV_ANIMATION_DURATION } from '~/constants'
import { useDevice } from '~/hooks/useDevice'
import { useModal } from '~/hooks/useModal'
import { iconComponents } from '~/types/IconType'
import { NAV_ITEMS } from '~/types/Navigation'

type Coords = {
  x: number
  y: number
  width: number
  height: number
}

export const Sidebar = () => {
  const { isDesktop } = useDevice()
  const { openModal } = useModal()
  const location = useLocation()
  const LogoLarge = iconComponents['logoLarge']

  const navRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [previousIndex, setPreviousIndex] = useState(-1)
  const [isReady, setIsReady] = useState(false)

  const activeIndex = NAV_ITEMS.findIndex(
    (item) => item.href === location.pathname
  )

  useLayoutEffect(() => {
    const allRefsReady = tabRefs.current.every((ref) => ref !== null)

    if (allRefsReady && navRef.current && !isReady) {
      setIsReady(true)

      setPreviousIndex(activeIndex)
    }
  }, [activeIndex, isReady])

  const getCoords = useCallback((index: number): Coords => {
    const nav = navRef.current
    const tab = tabRefs.current[index]

    if (!nav || !tab) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    const navRect = nav.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()

    const navStyle = window.getComputedStyle(nav)

    const paddingLeft = parseFloat(navStyle.paddingLeft)
    const paddingTop = parseFloat(navStyle.paddingTop)

    return {
      x: tabRect.left - navRect.left - paddingLeft,
      y: tabRect.top - navRect.top - paddingTop,
      width: tabRect.width,
      height: tabRect.height,
    }
  }, [])

  const path = useMemo(() => {
    const start = previousIndex
    const end = activeIndex

    if (start === -1 || start === end) {
      return [getCoords(end)]
    }

    const direction = end > start ? 1 : -1
    const result: Coords[] = []

    for (let i = start; i !== end; i += direction) {
      result.push(getCoords(i))
    }

    result.push(getCoords(end))

    return result
  }, [previousIndex, activeIndex, getCoords])

  useEffect(() => {
    const handleResize = () => {
      setPreviousIndex(activeIndex)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex])

  const times = useMemo(
    () =>
      path.length > 1 ? path.map((_, i) => i / (path.length - 1)) : undefined,
    [path]
  )

  const transitionConfig = useMemo(
    () => ({
      duration: NAV_ANIMATION_DURATION,
      ease: 'linear' as const,
      times,
    }),
    [times]
  )

  return (
    <div className="bg-grey-900 rounded-t-lg lg:rounded-t-none lg:rounded-r-2xl lg:flex lg:flex-col lg:gap-6 lg:w-[300px] lg:h-screen absolute inset-x-0 bottom-0 lg:static">
      <div className="hidden px-8 py-10 lg:block cursor-custom">
        <NavLink to="/">
          <LogoLarge />
        </NavLink>
      </div>

      <nav
        ref={navRef}
        className="relative flex pt-2 lg:pt-0 px-4 md:px-10 lg:px-0 lg:pr-6 lg:flex-col lg:gap-1"
      >
        {isReady && (
          <>
            {/* Background mask */}
            <motion.div
              key={`bg-${activeIndex}`}
              className="absolute bg-beige-100 rounded-t-lg lg:rounded-r-lg lg:rounded-t-none pointer-events-none"
              style={{ zIndex: 0 }}
              initial={{
                x: path[0].x,
                y: path[0].y,
                width: path[0].width,
                height: path[0].height,
              }}
              animate={{
                x: path.map((p) => p.x),
                y: path.map((p) => p.y),
                width: path.map((p) => p.width),
                height: path.map((p) => p.height),
              }}
              transition={transitionConfig}
              onAnimationComplete={() => {
                setPreviousIndex(activeIndex)
              }}
            />

            {/* Indicator mask */}
            <motion.div
              key={`indicator-${activeIndex}`}
              className={cn(
                'absolute bg-green pointer-events-none',
                'lg:top-0 lg:bottom-auto',
                'top-auto bottom-0 lg:bottom-auto'
              )}
              style={{ zIndex: 1 }}
              initial={{
                x: path[0].x,
                y: path[0].y,
                width: isDesktop ? 4 : path[0].width,
                height: isDesktop ? path[0].height : 4,
                top: isDesktop ? 0 : 'auto',
                bottom: isDesktop ? 'auto' : 0,
              }}
              animate={{
                x: path.map((p) => p.x),
                y: path.map((p) => p.y),
                width: path.map((p) => (isDesktop ? 4 : p.width)),
                height: path.map((p) => (isDesktop ? p.height : 4)),
              }}
              transition={transitionConfig}
            />
          </>
        )}

        {/* Navigation items */}
        {NAV_ITEMS.map((link, index) => (
          <NavItem
            key={link.href}
            href={link.href}
            iconName={link.iconName}
            animationDuration={NAV_ANIMATION_DURATION}
            ref={(el) => {
              tabRefs.current[index] = el
            }}
          />
        ))}
      </nav>

      <Button
        variant="logout"
        onClick={() => openModal({ type: 'logout' })}
        styles="hidden lg:flex"
      >
        Logout
      </Button>
    </div>
  )
}
