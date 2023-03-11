import Link from "next/link";

export default function Header() {
    return (
        <div className="flex items-center gap-5 justify-end text-gray-700">
            <Link href="/notes">
                <h3>My Notes</h3>
            </Link>
            {/* <Link href="/">
                <h3>Profile</h3>
            </Link> */}
            <Link href="/">
                <h3>Logout</h3>
            </Link>
        </div>
    )
}