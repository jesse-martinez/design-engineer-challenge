import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="h-[32px] w-full rounded-md bg-gradient-to-b from-[#6F4CFF] to-[#432E99] text-center text-caption-large font-medium text-white transition-all duration-200 ease-in-out hover:from-[#7E5FFD] hover:to-[#5B45B3] focus-visible:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:from-[#553EB5] active:to-[#6F4CFF] md:h-[40px] md:w-[200px]">
      {children}
    </button>
  )
}
