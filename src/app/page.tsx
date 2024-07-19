'use client'
import { useState } from 'react'
import Nav from './components/Nav'
import SegmentedControl from './components/SegmentedControl'
import Carousel from './components/Carousel'
import Card from './components/Card'

export default function Home() {
  const [device, setDevice] = useState<string>('phone')
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const imagePaths: string[] = Array.from(
    { length: 11 },
    (_, index) => `wallpaper-${index + 1}.jpeg`,
  )

  return (
    <>
      <Nav />
      <main className="pb-4 pt-8 md:pb-6 md:pt-14">
        <div className="relative mx-auto max-w-7xl px-2.5">
          <div className="border-funky inline-block bg-midnight px-4 py-2">
            <h2 className="text-body-small">Introducing NFT Wallpapers</h2>
          </div>
          <h1 className="mt-4 max-w-xl text-title-large font-bold md:mt-6 md:text-display-large">
            CC0 NFT Assets as wallpapers
          </h1>
          <p className="mt-4 text-body-small text-smokey md:mt-6 md:text-body-large">
            Grab the NFT you like for your phone wallpaper
          </p>
          <SegmentedControl
            device={device}
            setDevice={setDevice}
            clearActiveCard={() => setActiveCard(null)}
          />
        </div>
        <Carousel device={device} clearActiveCard={() => setActiveCard(null)}>
          {imagePaths.map((imagePath, index) => (
            <Card
              key={index}
              imagePath={imagePath}
              device={device}
              childNumber={index}
              isActive={activeCard === index}
              setActiveCard={() => setActiveCard(index)}
              clearActiveCard={() => setActiveCard(null)}
            />
          ))}
        </Carousel>
      </main>
    </>
  )
}
