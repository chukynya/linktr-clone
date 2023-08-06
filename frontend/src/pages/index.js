import {useEffect} from 'react';
import { Inter } from 'next/font/google'
import { getAllAccount, getSelectedAccount } from '@/api/services';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
useEffect(() => {
  getSelectedAccount()
}, [])

  return (
    <main
      className={`flex min-h-screen max-w-4xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}>
        <div className="flex flex-col items-center gap-2 w-full mb-8">
          <h3 className="text-2xl font-bold">Nama</h3>
          <p className="text-lg">Description</p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="h-full w-full bg-indigo-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-[14px] p-4 hover:scale-105 transition-all cursor-pointer duration-200">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="h-full w-full bg-indigo-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-[14px] p-4 hover:scale-105 transition-all cursor-pointer duration-200">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="h-full w-full bg-indigo-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-[14px] p-4 hover:scale-105 transition-all cursor-pointer duration-200">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="h-full w-full bg-indigo-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-[14px] p-4 hover:scale-105 transition-all cursor-pointer duration-200">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

    </main>
  )
}
