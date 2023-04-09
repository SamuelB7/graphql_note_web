type NoteProps = {
    id: string
    title: string
    content: string
    handleEditForm: (id: string, title: string, content: string) => void
    handleDeleteNote: (id: string) => void
}

export default function Note({ id, title, content, handleDeleteNote, handleEditForm }: NoteProps) {
    return (
        <div className="flex flex-col gap-3 justify-between border border-gray-500 rounded-md p-5">
            <div>
                <h1 className="font-bold">{title}</h1>
                <p>{content}</p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => handleEditForm(id, title, content)} className="text-gray-300 bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
                <button onClick={() => handleDeleteNote(id)} className="bg-red-500 text-white rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
            </div>
        </div>
    )
}