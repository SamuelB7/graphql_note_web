import { useAuthContext } from "@/contexts/AuthContext";
import { client } from "@/lib/apolloClient";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
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

export default function NoteForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [createNote, { data, loading, error}] = useMutation(CREATE_NOTE)
    const router = useRouter()
    const { accessToken } = useAuthContext()

    async function handleCreateNote(event: FormEvent) {
        /* await createNote({
            variables: {
                "createNoteInput": {
                    "title": title,
                    "content": content
                }
            }
        }) */
        await client.mutate({
            mutation: CREATE_NOTE,
            variables: {
                "createNoteInput": {
                    "title": title,
                    "content": content
                }
            },
            context: {
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        })
        event.preventDefault()
        router.push('/notes')
    }

    return (
       <div className="h-screen">
            <form onSubmit={handleCreateNote} className="flex flex-col gap-3">
                <span className='text-gray-700'>Title</span>
                <input
                    type="text"
                    value={title}
                    className="mt-1 w-auto rounded-md border-gray-300 shadow-sm"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <span className='text-gray-700'>Content</span>
                <textarea className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm" rows={5} value={content} onChange={(e) => setContent(e.target.value)}/>

                <button className="text-white bg-gray-700 p-3 rounded-md" type="submit">Add Note</button>
            </form>
       </div>
    )
}