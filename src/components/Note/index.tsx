import { useAuthContext } from "@/contexts/AuthContext"
import { gql, useMutation } from "@apollo/client"

type NoteProps = {
    id: string
    title: string
    content: string
    handleEditForm: (id: string, title: string, content: string) => void
    handleDeleteNote: (id: string) => void
}

export default function Note({ id, title, content, handleDeleteNote, handleEditForm }: NoteProps) {
    return (
        <div className="flex flex-col justify-between border border-gray-500 rounded-md w-auto max-h-80 p-5">
            <div>
                <h1 className="font-bold">{title}</h1>
                <p>{content}</p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => handleEditForm(id, title, content)}>Edit</button>
                <button onClick={() => handleDeleteNote(id)} className="bg-red-500 rounded p-1 text-white">Delete</button>
            </div>
        </div>
    )
}