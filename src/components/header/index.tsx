import Link from "next/link";

export default function Header() {
    return (
        <div>
            <Link href="/">
                <h3>Notes</h3>
            </Link>
            <Link href="/">
                <h3>Profile</h3>
            </Link>
            <Link href="/">
                <h3>Logout</h3>
            </Link>
        </div>
    )
}