import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from './Button'
import CopyButton from './CopyButton'
import { debounce } from '../debounce'

type CardProps = {
  imagePath: string
  device: string
  childNumber: number
}

export default function Card({ imagePath, device, childNumber }: CardProps) {
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const toggleActive = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobileViewport(window.innerWidth <= 768)
    }, 1000)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isPhone: boolean = device === 'phone'

  const fadeUpAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  return (
    <motion.div
      {...fadeUpAnimation}
      transition={{
        delay: childNumber * 0.1 + 0.1,
        ease: [0.075, 0.82, 0.165, 1],
      }}
      className={`group relative block overflow-hidden rounded-md border-clay bg-steel transition-all duration-[500ms] ease-snap md:flex md:hover:border ${
        isPhone
          ? 'h-[480px] w-[240px] md:h-[520px] md:w-[260px] md:hover:w-[548px]'
          : 'h-[240px] w-[240px] md:w-[200px] md:hover:w-[504px]'
      } `}
      onClick={toggleActive}
    >
      <div className="flex shrink-0 items-center justify-end transition-[padding] md:group-hover:pl-2">
        <div
          className={`pointer-events-none relative select-none overflow-hidden rounded-md transition-all duration-500 ease-snap ${
            isPhone
              ? 'h-[480px] w-[240px] md:h-[520px] md:w-[260px] md:group-hover:h-[504px] md:group-hover:w-[244px]'
              : 'h-[240px] w-[240px] md:w-[200px] md:group-hover:h-[224px] md:group-hover:w-[200px]'
          } `}
        >
          <Image
            src={`/images/${imagePath}`}
            alt="NFT Wallpaper"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={true}
          />
        </div>
      </div>
      <div
        className={`duration-800 absolute left-0 top-0 flex h-full w-full shrink-0 select-none flex-col justify-between bg-steel p-4 transition-opacity ease-snap md:static md:w-[296px] md:p-6 md:opacity-100 ${
          isMobileViewport && isActive
            ? 'opacity-100 duration-200'
            : 'opacity-0'
        }`}
      >
        <div>
          <p className="text-caption-large text-lavender">
            Wallpapers of Unsplash
          </p>
          <h3 className="mt-2 text-body-medium">Human and Machine</h3>
          {isPhone && (
            <p className="mt-2 text-caption-large text-lavender">
              Description for this item, would be a metadata for the collection
              as a fallback
            </p>
          )}
          <div className="mt-6 flex justify-between border-b border-clay pb-2">
            <span className="text-caption-medium text-lavender">
              Total Assets:
            </span>
            <span className="text-caption-medium">4000</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-caption-medium text-lavender">
              Asset Type:
            </span>
            <span className="text-caption-medium">ERC-721</span>
          </div>
        </div>
        <div className="flex justify-between">
          <CopyButton />
          <Button>{isMobileViewport ? 'Save' : 'Download'}</Button>
        </div>
      </div>
    </motion.div>
  )
}
