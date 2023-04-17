import Layout from "@/components/Layout"
import Note from "@/components/Note"
import NoteForm from "@/components/NoteForm"
import { useAuthContext } from "@/contexts/AuthContext"
import { gql, useMutation, useQuery } from "@apollo/client"
import { FormEvent, useState } from "react"
import { useCookies } from "react-cookie"

type NoteType = {
    id: string
    title: string
    content: string
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

    function closeCreateForm() {
        setNoteId('')
        setTitle('')
        setContent('')
        setIsCreateFormOpen(false)
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
        <Layout title="My Notes">
            <div>
                <div className="mb-5">
                    {isEditFormOpen ?
                        <button type="button" className="block text-gray-300 bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => closeEditForm()}>{isEditFormOpen && 'Close'}</button> :
                        <button type="button" className="block text-gray-300 bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => setIsCreateFormOpen(!isCreateFormOpen)}>{isCreateFormOpen ? 'Close' : 'Add Note'}</button>
                    }
                </div>
                {isCreateFormOpen &&
                    <NoteForm handleForm={handleCreateNote} setTitle={setTitle} setContent={setContent} title={title} content={content} action="post" closeForm={closeCreateForm} />
                }

                {isEditFormOpen &&
                    <NoteForm handleForm={handleEditNote} setTitle={setTitle} setContent={setContent} title={title} content={content} action="put" closeForm={closeEditForm} />
                }

                <div className="grid grid-cols-4 gap-5 max-[420px]:grid-cols-1">
                    {data?.notesByUser?.map((note: NoteType, index: number) => {
                        return (
                            <Note id={note.id} title={note.title} content={note.content} handleEditForm={handleEditForm} handleDeleteNote={handleDeleteNote} key={index} />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}