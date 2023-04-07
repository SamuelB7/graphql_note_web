import { useAuthContext } from "@/contexts/AuthContext"
import { gql, useMutation } from "@apollo/client"

type NoteProps = {
    id: string
    title: string
    content: string
}

const DELETE_NOTE = gql`
    mutation Mutation($removeNoteId: String!) {
        removeNote(id: $removeNoteId) {
            id
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

export default function Note({ id, title, content}: NoteProps) {
    const [deleteNote] = useMutation(DELETE_NOTE)
    const { accessToken } = useAuthContext()

    async function handleDeleteNote(noteId: string) {
        await deleteNote({
            variables: {
                "removeNoteId": noteId
            },
            context: {
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            },
            refetchQueries: [NOTES_BY_USER]
        })
    }

    return (
        <div className="flex flex-col justify-between border border-gray-500 rounded rounded-md w-auto h-auto p-5">
            <div>
                <h1 className="font-bold">{title}</h1>
                <p>{content}</p>
            </div>
            <div className="flex gap-3">
                <button>Edit</button>
                <button onClick={() => handleDeleteNote(id)} className="bg-red-500 rounded p-1 text-white">Delete</button>
            </div>
        </div>
    )
}