import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(userEmail: string, userPassword: string) {
    console.log(userEmail, userPassword)
  }

  return (
    <>
      <Head>
        <title>Note App</title>
        <meta name="description" content="Note app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col justify-center items-center h-screen border text-center'>
          <div className='p-7 border border-gray-500 rounded-md border-solid'>
            <h1 className="text-3xl font-bold">
              Note App
            </h1>
            <h2 className='text-2xl'>
              LogIn
            </h2>
            <form className='flex flex-col text-left'>
              <label>
                <span className='text-gray-700'>Email address</span>
                <input
                  type="email"
                  className='mt-1 w-full rounded-md border-gray-300 shadow-sm'
                  placeholder='john@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
              <label>
                <span className='text-gray-700'>Password</span>
                <input
                type="password"
                className='mt-1 w-full rounded-md border-gray-300 shadow-sm'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              </label>
              <button type='button' onClick={() => handleSubmit(email, password)}>LogIn</button>
            </form>
            <p className='text-sm'>
              Create an account
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
