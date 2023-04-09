import Content from "../Content"
import Header from "../Header"
import SideMenu from "../SideMenu"


interface LayoutProps {
    title: string
    children?: any
}

export default function Layout(props: LayoutProps) {

    return (
        <div className='flex h-screen w-screen'>
            <SideMenu />
            <div className="flex flex-col w-full p-7 bg-gray-300">
                <Header title={props.title} />
                <Content>
                    {props.children}
                </Content>
            </div>
        </div>
    )
}