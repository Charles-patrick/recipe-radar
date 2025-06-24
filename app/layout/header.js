import Link from 'next/link'
import { LuRadar } from 'react-icons/lu'

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black text-white">
            <div className="flex justify-between items-center px-5 py-3 max-w-[1200px] mx-auto">
                <Link href='/' className='flex items-center gap-2'>
                    <LuRadar size={24} />
                    <h1 className="text-lg font-bold">Recipe Radar</h1>
                </Link>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link href='#' className="hover:underline">Favorites</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}