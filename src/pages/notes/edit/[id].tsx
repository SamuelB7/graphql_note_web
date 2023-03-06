import { useRouter } from "next/router"

export default function EditNote() {
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    return (
        <>
            <h1>Edit note {id}</h1>
        </>
    )
}