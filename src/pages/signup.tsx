import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

const SIGN_UP= gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      accessToken
    }
  }
`

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp] = useMutation(SIGN_UP)
  const { logIn } = useAuthContext()
  const router = useRouter();

  async function handleSignUp(userName: string, userEmail: string, userPassword: string) {
    try {
      const { data } = await signUp({
        variables: {
          "signUpInput": {
            "name": userName,
            "email": userEmail,
            "password": userPassword
          }
        }
      })
  
      if(data.signUp.accessToken) {
        await logIn(data.signUp.accessToken)
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
        <div className='flex flex-col justify-center items-center h-screen border text-center'>
          <div className='p-7 border border-gray-500 rounded-md border-solid'>
            <h1 className="text-3xl font-bold">
              Note App
            </h1>
            <h2 className='text-2xl'>
              SignUp
            </h2>
            <form className='flex flex-col text-left'>
            <label>
                <span className='text-gray-700'>Name</span>
                <input
                  type="text"
                  className='mt-1 w-full rounded-md border-gray-300 shadow-sm'
                  placeholder='John'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
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
              <button className='text-white bg-gray-700 mt-4 rounded-md hover:bg-white hover:text-gray-700 border border-gray-700' type='button' onClick={() => handleSignUp(name, email, password)}>SignUp</button>
            </form>
            <Link href='/'>
              <button className='text-sm rounded-md border border-gray-700 mt-3 w-full'>
                Already have an account?
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
