import { useCookies } from "react-cookie";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";

type LoggedUser = {
    id: string
    name: string
    email: string
    iat: number
    exp: number
}

export default function Profile() {
    const [cookie] = useCookies(["jwt"]);
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()

    useEffect(() => {
        if(cookie.jwt) {
            setLoggedUser(jwtDecode(cookie.jwt))
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-screen border text-center'>
            <h1>HELLO {loggedUser?.name ? loggedUser?.name : " "}</h1>
        </div>
    )
}