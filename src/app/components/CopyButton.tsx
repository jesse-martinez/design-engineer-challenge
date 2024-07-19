import React from 'react'

type CopyButtonProps = {
  setInFocus?: (inFocus: boolean) => void
}

export default function CopyButton({ setInFocus = () => {} }: CopyButtonProps) {
  return (
    <button
      className="hidden h-10 w-10 items-center justify-center rounded border border-smokey bg-transparent transition-colors duration-200 ease-in-out hover:border-smokey hover:bg-smokey focus-visible:border focus-visible:border-white focus-visible:bg-smokey active:border-clay active:bg-clay md:flex"
      tabIndex={0}
      onFocus={() => setInFocus(true)}
      onBlur={() => setInFocus(false)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.10016 0.833252C3.60669 0.833252 2.85995 0.833252 2.28952 1.1239C1.78776 1.37956 1.37981 1.78751 1.12415 2.28928C0.833496 2.85971 0.833496 3.60644 0.833496 5.09992V6.89992C0.833496 8.39339 0.833496 9.14013 1.12415 9.71056C1.37981 10.2123 1.78776 10.6203 2.28952 10.8759C2.85995 11.1666 3.60669 11.1666 5.10016 11.1666H6.90016C8.39364 11.1666 9.14037 11.1666 9.7108 10.8759C10.2126 10.6203 10.6205 10.2123 10.8762 9.71056C11.1668 9.14013 11.1668 8.39339 11.1668 6.89992V5.09992C11.1668 3.60645 11.1668 2.85971 10.8762 2.28928C10.6205 1.78751 10.2126 1.37956 9.7108 1.1239C9.14037 0.833252 8.39364 0.833252 6.90016 0.833252H5.10016Z"
          fill="white"
        />
        <path
          d="M12.0001 4.83325V6.66659C12.0001 8.53343 12.0001 9.46685 11.6368 10.1799C11.3172 10.8071 10.8073 11.317 10.18 11.6366C9.46701 11.9999 8.53359 11.9999 6.66675 11.9999H4.8335C4.8335 12.4644 4.8335 12.6966 4.86236 12.8912C5.03471 14.0531 5.947 14.9654 7.10888 15.1377C7.30346 15.1666 7.53569 15.1666 8.00016 15.1666H10.9002C12.3936 15.1666 13.1404 15.1666 13.7108 14.8759C14.2126 14.6203 14.6205 14.2123 14.8762 13.7106C15.1668 13.1401 15.1668 12.3934 15.1668 10.8999V8C15.1668 7.53545 15.1668 7.30318 15.138 7.10857C14.9656 5.94674 14.0533 5.03449 12.8915 4.86212C12.6969 4.83325 12.4646 4.83325 12.0001 4.83325Z"
          fill="white"
        />
      </svg>
    </button>
  )
}
