import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EditPro Studio - Professional Video Editing Services',
  description: 'Transform your raw footage into compelling visual stories with our professional video editing services. Expert editors, latest software, stunning results.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden bg-white`}>
        {children}
      </body>
    </html>
  )
}