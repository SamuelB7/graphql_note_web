import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

type HeaderProps = {
    title: string 
}

export default function Header(props: HeaderProps) {
    const { logOut } = useAuthContext()

    return (
        <div className="flex">
            <h1 className="font-black text-3xl text-gray-900 dark:text-gray-100">
                {props.title}
            </h1>
        </div>
    )
}