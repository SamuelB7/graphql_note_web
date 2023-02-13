import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const LOGIN = gql`
  mutation SignIn($signInInput: SignInInput!) {
      signIn(signInInput: $signInInput) {
      accessToken
    }
  }
`

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn, { data, loading, error }] = useMutation(LOGIN)
  const { accessToken, logIn } = useAuthContext()
  const router = useRouter();

  async function handleLogin(userEmail: string, userPassword: string) {
    const { data, errors } = await signIn({
      variables: {
        "signInInput": {
          "email": userEmail,
          "password": userPassword
        }
      }
    })

    if(data.signIn.accessToken) {
      await logIn(data.signIn.accessToken)
      router.push('profile')
    }
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
              <button className='text-white bg-gray-700 mt-4 rounded-md hover:bg-white hover:text-gray-700 border border-gray-700' type='button' onClick={() => handleLogin(email, password)}>LogIn</button>
            </form>
            <p className='text-sm rounded-md border border-gray-700 mt-3'>
              Create an account
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
