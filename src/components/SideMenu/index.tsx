import { useAuthContext } from "@/contexts/AuthContext"
import { BiLogOut, BiNote, BiUser } from 'react-icons/bi'
import Link from "next/link"


export default function SideMenu() {

    const { logOut } = useAuthContext()

    return (
        <aside className="flex flex-col text-white bg-gray-900 p-2">
            <div className="flex flex-col items-center justify-center h-20 w-20">
                <h1>Note App</h1>
            </div>
            <ul className="flex-grow">
                <li className="hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-center items-center h-10 w-20 text-white hover:text-gray-900">
                        <Link href='/notes'>
                            <div className="flex justify-center items-center gap-2">
                                <BiNote />
                                Notes
                            </div>
                        </Link>
                    </div>
                </li>

                <li className="hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-center items-center h-10 w-20 text-white hover:text-gray-900">
                        <Link href='/profile'>
                            <div className="flex justify-center items-center gap-2">
                                <BiUser />
                                Profile
                            </div>
                        </Link>
                    </div>
                </li>
            </ul>
            <ul>
                <li className="hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-center items-center h-10 w-20 text-gray-600 text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white dark:hover:text-white">
                        <div onClick={logOut}>
                            <div className="flex justify-center items-center gap-2">
                                <BiLogOut />
                                <p >Logout</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </aside>
    )
}