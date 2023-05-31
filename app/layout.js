import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RankR',
  description: 'Rank Your Friends and Yourself in Your Groups',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>
          <main className='app'>
            <Nav/>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
