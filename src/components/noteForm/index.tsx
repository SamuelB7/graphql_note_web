import { useAuthContext } from "@/contexts/AuthContext";
import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";

const CREATE_NOTE = gql`
    mutation CreateNote($createNoteInput: CreateNoteInput!) {
        createNote(createNoteInput: $createNoteInput) {
            id,
            title,
            content
        }
    }
`

const NOTES_BY_USER = gql`
    query NotesByUser {
            notesByUser {
            id,
            title,
            content
        }
    }
`

export default function NoteForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [createNote] = useMutation(CREATE_NOTE)
    const { accessToken } = useAuthContext()

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
    }

    return (
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
    )
}