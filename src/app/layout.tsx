import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './app.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Design Engineer Challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://storage.googleapis.com/graph-web/favicon.png"
        />
      </head>
      <body className={`${inter.className} bg-midnight text-white`}>
        {children}
      </body>
    </html>
  )
}
