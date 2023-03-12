import Header from "@/components/header"
import Note from "@/components/note"
import NoteForm from "@/components/noteForm"
import { useAuthContext } from "@/contexts/AuthContext"
import { client } from "@/lib/apolloClient"
import { gql, useMutation, useQuery } from "@apollo/client"
import jwtDecode from "jwt-decode"
import { FormEvent, useEffect, useState } from "react"
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

const CREATE_NOTE = gql`
    mutation CreateNote($createNoteInput: CreateNoteInput!) {
        createNote(createNoteInput: $createNoteInput) {
            id,
            title,
            content
        }
    }
`

const EDIT_NOTE = gql`
    mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {
        updateNote(updateNoteInput: $updateNoteInput) {
            id,
            title,
            content
        }
    }
`

const DELETE_NOTE = gql`
    mutation Mutation($removeNoteId: String!) {
        removeNote(id: $removeNoteId) {
            id
        }
    }
`

export default function Notes() {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
    const [isEditFormOpen, setIsEditFormOpen] = useState(false)
    const [noteId, setNoteId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [cookie] = useCookies(["jwt"]);
    const { accessToken } = useAuthContext()
    const [createNote] = useMutation(CREATE_NOTE)
    const [editNote] = useMutation(EDIT_NOTE)
    const [deleteNote] = useMutation(DELETE_NOTE)

    const { data } = useQuery(NOTES_BY_USER, {
        context: {
            headers: {
                Authorization: `Bearer ${cookie.jwt}`
            }
        }
    })

    async function handleCreateNote(event: FormEvent) {
        event.preventDefault()
        await createNote({
            variables: {
                "createNoteInput": {
                    "title": title,
                    "content": content
                }
            },
            context: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            },
            refetchQueries: [NOTES_BY_USER]
        })

        setTitle('')
        setContent('')
        setIsCreateFormOpen(false)
    }

    async function handleEditNote(event: FormEvent) {
        event.preventDefault()
        await editNote({
            variables: {
                "updateNoteInput": {
                    "id": noteId,
                    "title": title,
                    "content": content
                }
            },
            context: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            },
            refetchQueries: [NOTES_BY_USER]
        })

        setNoteId('')
        setTitle('')
        setContent('')
        setIsEditFormOpen(false)
    }

    function handleEditForm(noteId: string, title: string, content: string) {
        setIsEditFormOpen(true)
        setNoteId(noteId)
        setTitle(title)
        setContent(content)
    }

    function closeEditForm() {
        setNoteId('')
        setTitle('')
        setContent('')
        setIsEditFormOpen(false)
    }

    async function handleDeleteNote(noteId: string) {
        await deleteNote({
            variables: {
                "removeNoteId": noteId
            },
            context: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            },
            refetchQueries: [NOTES_BY_USER]
        })
    }

    return (
        <>
            <Header />
            <div>
                <div className="flex gap-3">
                    {isEditFormOpen ?
                        <button onClick={() => closeEditForm()}>{isEditFormOpen && 'Close'}</button> :
                        <button onClick={() => setIsCreateFormOpen(!isCreateFormOpen)}>{isCreateFormOpen ? 'Close' : 'Add Note'}</button>
                    }
                </div>
                {isCreateFormOpen &&
                    <div className="absolute w-full h-full z-10 bg-gray-500 bg-opacity-50">
                        <div className="flex justify-center items-center h-screen">
                            <form onSubmit={handleCreateNote} className="flex justify-center items-center flex-col gap-3 p-5 border bg-white rounded-md">
                                <span className='text-gray-700'>Title</span>
                                <input
                                    type="text"
                                    value={title}
                                    className="mt-1 w-auto rounded-md border-gray-300 shadow-sm"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <span className='text-gray-700'>Content</span>
                                <textarea className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />

                                <button className="text-white bg-gray-700 p-3 rounded-md" type="submit">Add Note</button>
                            </form>
                        </div>
                    </div>
                }

                {isEditFormOpen &&
                    <div className="absolute w-full h-full z-10 bg-gray-500 bg-opacity-50">
                        <div className="flex justify-center items-center h-screen">
                            <form onSubmit={handleEditNote} className="flex justify-center items-center flex-col gap-3 p-5 border bg-white rounded-md">
                                <span className='text-gray-700'>Title</span>
                                <input
                                    type="text"
                                    value={title}
                                    className="mt-1 w-auto rounded-md border-gray-300 shadow-sm"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <span className='text-gray-700'>Content</span>
                                <textarea className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />

                                <button className="text-white bg-gray-700 p-3 rounded-md" type="submit">Update Note</button>
                            </form>
                        </div>
                    </div>
                }

                <div className="h-screen grid grid-cols-3 gap-5">
                    {data?.notesByUser?.map((note: NoteType, index: number) => {
                        return (
                            <div className="flex flex-col justify-between border border-gray-500 rounded-md w-auto max-h-80 h-auto p-5" key={index}>
                                <div>
                                    <h1 className="font-bold">{note.title}</h1>
                                    <p>{note.content}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEditForm(note.id, note.title, note.content)}>Edit</button>
                                    <button onClick={() => handleDeleteNote(note.id)} className="bg-red-500 rounded p-1 text-white">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}