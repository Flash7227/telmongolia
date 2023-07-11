import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navbar from './navbar'
import Topbar from './topbar'
import Footer from './footer'
import { Toaster } from "@/components/ui/toaster"

const font = Montserrat({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: process.env.BASEURL,
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <Topbar />
        <Navbar />
        <main className='container grow'>
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}