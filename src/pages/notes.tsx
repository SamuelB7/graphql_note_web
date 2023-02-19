import { client } from "@/lib/apolloClient"
import { gql } from "@apollo/client"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

type Note = {
    id: string
    title: string
    content: string
}

type LoggedUser = {
    id: string
    name: string
    email: string
    iat: number
    exp: number
}

const NOTES_BY_USER = gql`
    query NotesByUser {
            notesByUser {
            id,
            title,
            content
        }
    }
`

export default function Notes() {
    const [cookie] = useCookies(["jwt"]);
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()
    const [notes, setNotes] = useState() 

    useEffect(() => {
        if(cookie.jwt) {
            setLoggedUser(jwtDecode(cookie.jwt))

            client.query({
                query: NOTES_BY_USER,
                context: {
                    headers : {
                        Authorization: `Bearer ${cookie.jwt}`
                    }
                }
            }).then(
                function(value) {
                    setNotes(value.data)
                }
            )
        }
    }, [])

    return (
        <h1>NOTES PAGE</h1>
    )
}