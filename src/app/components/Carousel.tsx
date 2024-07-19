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
  const [tabPressed, setTabPressed] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Prevent carousel from moving too far
  const updateMinPosition = () => {
    const windowWidth = window.innerWidth
    const adjustment = Math.max(0, 1228 - windowWidth)

    if (windowWidth <= 768) {
      setMinPosition(-2200 - adjustment + 526)
    } else {
      setMinPosition(
        device === 'phone' ? -2200 - adjustment : -1550 - adjustment,
      )
    }
  }

  // Adjust minPosition on window resize, using debouncing
  useEffect(() => {
    const debouncedUpdate = debounce(updateMinPosition, 200)
    updateMinPosition()

    window.addEventListener('resize', debouncedUpdate)
    return () => window.removeEventListener('resize', debouncedUpdate)
  }, [device])

  const handleDrag = (clientX: number, event: Event) => {
    if (!isDragging) return

    const dx = clientX - startPosition
    let newPosition = initialPosition + dx
    newPosition = Math.max(Math.min(newPosition, 0), minPosition)
    setPosition(newPosition)

    if (event.type === 'touchmove') {
      ;(event as TouchEvent).preventDefault()
    }
  }

  // Logic for carousel sliding, desktop & mobile
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) =>
      handleDrag(event.clientX, event)
    const handleTouchMove = (event: TouchEvent) =>
      handleDrag(event.touches[0].clientX, event)
    const stopDragging = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('mouseup', stopDragging)
    window.addEventListener('touchend', stopDragging)
    window.addEventListener('contextmenu', stopDragging)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', stopDragging)
      window.removeEventListener('touchend', stopDragging)
      window.removeEventListener('contextmenu', stopDragging)
    }
  }, [isDragging, startPosition, initialPosition, minPosition])

  // Reset state when toggling devices
  useEffect(() => {
    updateMinPosition()
    setPosition(0)
  }, [device])

  // Remove gradients if user starts tabbing
  useEffect(() => {
    const handleTabPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') setTabPressed(true)
    }

    window.addEventListener('keydown', handleTabPress)
    return () => window.removeEventListener('keydown', handleTabPress)
  }, [])

  const startDrag = (clientX: number) => {
    setIsDragging(true)
    setStartPosition(clientX)
    setInitialPosition(position)
  }

  const handleMouseDown = (event: React.MouseEvent) => startDrag(event.clientX)
  const handleTouchStart = (event: React.TouchEvent) =>
    startDrag(event.touches[0].clientX)

  return (
    <div className="relative mt-14 overflow-x-hidden md:mt-10">
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
      {!tabPressed && (
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 transform">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-midnight to-transparent md:w-16"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-midnight to-transparent md:w-16"></div>
        </div>
      )}
    </div>
  )
}
