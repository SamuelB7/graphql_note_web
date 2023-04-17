import { Dispatch, FormEvent, SetStateAction } from "react"

type FormProps = {
    handleForm: (event: FormEvent<Element>) => Promise<void>
    setTitle: Dispatch<SetStateAction<string>>
    setContent: Dispatch<SetStateAction<string>>
    closeForm: any
    action: 'post' | 'put'
    noteId?: string
    title?: string
    content?: string
}

export default function NoteForm(props: FormProps) {

    return (
        <div className="fixed z-50 top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto">
            <div className="flex items-center justify-center">
                <form onSubmit={props.handleForm} className="flex justify-center items-center flex-col gap-3 p-5 border bg-white rounded-md">
                    <button onClick={() => props.closeForm()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <span className='text-gray-700'>Title</span>
                    <input
                        type="text"
                        value={props.title}
                        className="mt-1 w-auto rounded-md border-gray-300 shadow-sm"
                        onChange={(e) => props.setTitle(e.target.value)}
                    />

                    <span className='text-gray-700'>Content</span>
                    <textarea className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm" rows={5} value={props.content} onChange={(e) => props.setContent(e.target.value)} />

                    <button className="text-white bg-gray-700 p-3 rounded-md" type="submit">{props.action === 'post' ? 'Add Note' : 'Edit Note'}</button>
                </form>
            </div>
        </div>
    )
}