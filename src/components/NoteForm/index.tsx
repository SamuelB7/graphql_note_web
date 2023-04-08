import { Dispatch, FormEvent, SetStateAction } from "react"

type FormProps = {
    handleForm: (event: FormEvent<Element>) => Promise<void>
    setTitle: Dispatch<SetStateAction<string>>
    setContent: Dispatch<SetStateAction<string>>
    action: 'post' | 'put'
    noteId?: string
    title?: string
    content?: string
}

export default function NoteForm(props: FormProps) {

    return (
        <div className="absolute w-full h-full z-10 bg-gray-500 bg-opacity-50">
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={props.handleForm} className="flex justify-center items-center flex-col gap-3 p-5 border bg-white rounded-md">
                    <span className='text-gray-700'>Title</span>
                    <input
                        type="text"
                        value={props.title}
                        className="mt-1 w-auto rounded-md border-gray-300 shadow-sm"
                        onChange={(e) => props.setTitle(e.target.value)}
                    />

                    <span className='text-gray-700'>Content</span>
                    <textarea className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm" rows={5} value={props.content} onChange={(e) => props.setContent(e.target.value)} />

                    <button className="text-white bg-gray-700 p-3 rounded-md" type="submit">{props.action === 'post' ? 'Add Note' : 'EditNote'}</button>
                </form>
            </div>
        </div>
    )
}