import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Header() {
    const { logOut } = useAuthContext()

    return (
        <div className="flex items-center gap-5 justify-end text-gray-700">
            <Link href="/notes">
                <h3>My Notes</h3>
            </Link>
            {/* <Link href="/">
                <h3>Profile</h3>
            </Link> */}
            <button onClick={() => logOut()}>Logout</button>
        </div>
    )
}