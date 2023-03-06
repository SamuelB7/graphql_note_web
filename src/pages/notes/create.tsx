import Header from "@/components/header";
import NoteForm from "@/components/noteForm";


export default function CreateNote() {
    return (
        <>
            <Header />
            <div className="m-3 text-gray-700">
                <h1>Create note</h1>
                <NoteForm />
            </div>
        </>
    )
}