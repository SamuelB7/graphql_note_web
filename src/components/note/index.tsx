type NoteProps = {
    id: string
    title: string
    content: string
}

export default function Note({ id, title, content}: NoteProps) {
    return (
        <div className="border border-gray-500 rounded rounded-md w-auto h-96 p-5">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}