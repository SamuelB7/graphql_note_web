import Link from "next/link"

type NoteProps = {
    id: string
    title: string
    content: string
}

export default function Note({ id, title, content}: NoteProps) {
    return (
        <div className="flex flex-col justify-between border border-gray-500 rounded rounded-md w-auto h-auto p-5">
            <div>
                <h1 className="font-bold">{title}</h1>
                <p>{content}</p>
            </div>
            <div className="flex gap-3">
                <Link href={`notes/edit/${id}`} className="bg-gray-500 rounded p-1 text-white">
                    <button >Edit</button>
                </Link>
                <button className="bg-red-500 rounded p-1 text-white">Delete</button>
            </div>
        </div>
    )
}