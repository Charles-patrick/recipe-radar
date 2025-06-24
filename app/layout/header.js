import Link from 'next/link'
import { LuRadar } from'react-icons/lu'
export const Header = () => {
    return(
        <>
         <section className="flex justify-between align-center px-5 py-3 bg-black text-white fixed top-0 w-full z-50 max-w-[1200px]">
            <div >
                <Link href='/' className='flex justify-between items-center gap-1'>
                    <LuRadar /> <h1>Recipe Radar</h1>
                </Link>
            </div>
            <div>
                <ul> <li> <Link href='#'>Favorites</Link> </li> </ul>
            </div>
         </section>
        </>
        
    )
}