import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import { gql, useMutation } from "@apollo/client";

type LoggedUser = {
    id: string
    name: string
    email: string
    iat: number
    exp: number
}

const PUBLIC_EDIT_USER = gql`
    mutation PublicUpdateUser($updateUserInput: UpdateUserInput!) {
    publicUpdateUser(updateUserInput: $updateUserInput) {
        name,
        email
    }
}
`

export default function Profile() {
    const [cookie] = useCookies(["jwt"]);
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [publicUpdateUser] = useMutation(PUBLIC_EDIT_USER)

    useEffect(() => {
        if (cookie.jwt) {
            setLoggedUser(jwtDecode(cookie.jwt))
        }
    }, [])

    function checkPassword(e: any) {
        if (password != repeatPassword) {
            toast.error("Passwords don't match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            e.preventDefault()
            return
        }
    }

    async function handlePublicUpdateUser(e: any) {
        if (password && repeatPassword) {
            if (password != repeatPassword) {
                toast.error("Passwords don't match", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                e.preventDefault()
                return
            }
        }

        await publicUpdateUser({
            variables: {
                "updateUserInput": {
                    "name": userName,
                    "email": email,
                    "password": password
                }
            },
            context: {
                headers: {
                    Authorization: `Bearer ${cookie.jwt}`
                }
            },
        })
    }

    return (
        <Layout title="Profile">
            <div className='flex flex-col justify-center items-center text-center'>
                <ToastContainer />
                <form className='flex flex-col text-left'>
                    <label>
                        <span className='text-gray-700'>User Name</span>
                        <input
                            type="text"
                            className='mt-1 w-full rounded-md bg-gray-300 shadow-sm'
                            onChange={(e) => setUserName(e.target.value)}
                            value={loggedUser?.name}
                            required
                        />
                    </label>
                    <label>
                        <span className='text-gray-700'>Email address</span>
                        <input
                            type="email"
                            className='mt-1 w-full rounded-md bg-gray-300 shadow-sm'
                            placeholder='john@example.com'
                            onChange={(e) => setEmail(e.target.value)}
                            value={loggedUser?.email}
                            required
                        />
                    </label>
                    <label>
                        <span className='text-gray-700'>Password</span>
                        <input
                            type="password"
                            className='mt-1 w-full rounded-md bg-gray-300 shadow-sm'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span className='text-gray-700'>Repeat password</span>
                        <input
                            type="password"
                            className='mt-1 w-full rounded-md bg-gray-300 shadow-sm'
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button className='text-white bg-gray-700 mt-4 rounded-md hover:bg-gray-300 hover:text-gray-700 border border-gray-700' type='button' onClick={(e) => handlePublicUpdateUser(e)}>Update</button>
                </form>
            </div>
        </Layout>
    )
}