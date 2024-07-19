import React, { useState, ReactNode, useRef, useEffect } from 'react'
import { debounce } from '../debounce'

type CarouselProps = {
  device: string
  children: ReactNode
}

export default function Carousel({ device, children }: CarouselProps) {
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState(0)
  const [initialPosition, setInitialPosition] = useState(0)
  const [minPosition, setMinPosition] = useState(-2200)
  const carouselRef = useRef<HTMLDivElement>(null)

  const updateMinPosition = () => {
    const isMobileViewport = window.innerWidth <= 768
    const windowWidth = window.innerWidth
    const adjustment = Math.max(0, 1228 - windowWidth)

    if (isMobileViewport) {
      setMinPosition(-2200 - adjustment + 526)
    } else if (device === 'phone') {
      setMinPosition(-2200 - adjustment)
    } else {
      setMinPosition(-1550 - adjustment)
    }
  }

  useEffect(() => {
    const debouncedUpdateMinPosition = debounce(updateMinPosition, 200)

    updateMinPosition()

    window.addEventListener('resize', debouncedUpdateMinPosition)

    return () => {
      window.removeEventListener('resize', debouncedUpdateMinPosition)
    }
  }, [device])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return
      const dx = event.clientX - startPosition
      let newPosition = initialPosition + dx

      if (newPosition > 0) {
        newPosition = 0
      } else if (newPosition < minPosition) {
        newPosition = minPosition
      }
      setPosition(newPosition)
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging) return
      const dx = event.touches[0].clientX - startPosition
      let newPosition = initialPosition + dx

      if (newPosition > 0) {
        newPosition = 0
      } else if (newPosition < minPosition) {
        newPosition = minPosition
      }
      setPosition(newPosition)
      event.preventDefault()
    }

    const handleMouseUpTouchEnd = () => {
      setIsDragging(false)
    }

    const handleContextMenu = () => {
      setIsDragging(false)
    }

    window.addEventListener('mouseup', handleMouseUpTouchEnd)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleMouseUpTouchEnd)
    window.addEventListener('contextmenu', handleContextMenu)

    return () => {
      window.removeEventListener('mouseup', handleMouseUpTouchEnd)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUpTouchEnd)
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [isDragging, startPosition, initialPosition, minPosition])

  useEffect(() => {
    updateMinPosition()
    setPosition(0)
  }, [device])

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true)
    setStartPosition(event.clientX)
    setInitialPosition(position)
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDragging(true)
    setStartPosition(event.touches[0].clientX)
    setInitialPosition(position)
  }

  return (
    <div
      className="relative mt-14 overflow-x-hidden md:mt-10"
      style={{ overflow: 'hidden' }}
    >
      <div className="mx-auto flex max-w-7xl px-2.5">
        <div
          className="inline-flex cursor-pointer gap-6 transition-transform duration-500 ease-snap md:cursor-grab md:active:cursor-grabbing"
          style={{ transform: `translateX(${position}px)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          ref={carouselRef}
        >
          {children}
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 transform">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-midnight to-transparent md:w-16"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-midnight to-transparent md:w-16"></div>
      </div>
    </div>
  )
}
