import Logo from './Logo'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex h-[80px] items-center justify-center border-b border-clay">
      <Link href="/">
        <Logo />
      </Link>
    </nav>
  )
}
