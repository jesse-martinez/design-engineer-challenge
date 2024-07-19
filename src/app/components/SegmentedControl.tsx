type SegmentedControlProps = {
  device: string
  setDevice: (device: string) => void
  clearActiveCard: () => void
}

export default function SegmentedControl({
  device,
  setDevice,
  clearActiveCard,
}: SegmentedControlProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevice(event.target.value)
    clearActiveCard()
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLLabelElement>,
    value: string,
  ) => {
    if (event.key === 'Enter') {
      setDevice(value)
    }
  }

  return (
    <div className="relative mt-4 flex h-[40px] items-center rounded-full border border-clay bg-steel py-px md:mt-6 md:max-w-[148px]">
      <span
        className={`ease-snape absolute h-full w-1/2 transform rounded-full bg-white transition-transform ${
          device === 'phone' ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></span>
      <div className="relative z-10 flex-1">
        <input
          className="absolute h-0 w-0 overflow-hidden whitespace-nowrap opacity-0"
          type="radio"
          id="phone"
          value="phone"
          checked={device === 'phone'}
          onChange={handleChange}
          tabIndex={-1}
        />
        <label
          className={`block cursor-pointer select-none px-4 py-2 text-center text-caption-medium transition-colors ease-snap ${
            device === 'phone'
              ? 'text-midnight'
              : 'text-[#A6A3C8] hover:text-white'
          }`}
          htmlFor="phone"
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(e, 'phone')}
        >
          Phone
        </label>
      </div>
      <div className="relative z-10 flex-1">
        <input
          className="absolute h-0 w-0 overflow-hidden whitespace-nowrap opacity-0"
          type="radio"
          id="watch"
          value="watch"
          checked={device === 'watch'}
          onChange={handleChange}
          tabIndex={-1}
        />
        <label
          className={`block cursor-pointer select-none px-4 py-2 text-center text-caption-medium transition-colors ease-snap ${
            device === 'watch'
              ? 'text-midnight'
              : 'text-[#A6A3C8] hover:text-white'
          }`}
          htmlFor="watch"
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(e, 'watch')}
        >
          Watch
        </label>
      </div>
    </div>
  )
}
