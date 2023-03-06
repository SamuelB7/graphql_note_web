import Header from "@/components/header"
import Note from "@/components/note"
import { client } from "@/lib/apolloClient"
import { gql } from "@apollo/client"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

type NoteType = {
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
    const [notes, setNotes] = useState<NoteType[]>() 

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
                    setNotes(value.data.notesByUser)
                }
            )
        }
    }, [])
    return (
        <>
            <Header />
            <div className="m-3">
                <h1>My Notes</h1>
                <div className="h-screen grid grid-cols-3 gap-5">
                    {notes?.map((note, index) => {
                        return (
                            <Note id={note.id} title={note.title} content={note.content} key={index} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}