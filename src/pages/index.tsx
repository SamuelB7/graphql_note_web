import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

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
  const [signIn] = useMutation(LOGIN)
  const { logIn } = useAuthContext()
  const router = useRouter();

  async function handleLogin(userEmail: string, userPassword: string) {
    try {
      const { data } = await signIn({
        variables: {
          "signInInput": {
            "email": userEmail,
            "password": userPassword
          }
        }
      })

      if (data.signIn.accessToken) {
        await logIn(data.signIn.accessToken)
        router.push('notes')
      }
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <>
      <main>
        <div className='flex flex-col justify-center items-center h-screen border text-center bg-gray-300'>
          <div className='p-7 border border-gray-500 rounded-md border-solid'>
            <h1 className="text-3xl font-bold">
              Note App
            </h1>
            <h2 className='text-2xl'>
              LogIn
            </h2>
            <ToastContainer />
            <form className='flex flex-col text-left'>
              <label>
                <span className='text-gray-700'>Email address</span>
                <input
                  type="email"
                  className='mt-1 w-full rounded-md bg-gray-300 shadow-sm'
                  placeholder='john@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </label>
              <label>
                <span className='text-gray-700'>Password</span>
                <input
                  type="password"
                  className='mt-1 w-full rounded-md bg-gray-300 shadow-sm'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </label>
              <button className='text-white bg-gray-700 mt-4 rounded-md hover:bg-gray-300 hover:text-gray-700 border border-gray-700' type='button' onClick={() => handleLogin(email, password)}>LogIn</button>
            </form>
            <Link href='signup'>
              <button className='text-sm rounded-md border border-gray-700 mt-3 w-full'>
                Create an account
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
