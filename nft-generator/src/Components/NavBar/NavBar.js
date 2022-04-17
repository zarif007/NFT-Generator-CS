import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../Contexts/LoginContext';

const NavBar = () => {

    const {user, setUser} = useContext(LoginContext);

    return (
        <>
            <header className="text-gray-600 body-font sticky top-0 z-50 bg-black">
                <div className="container mx-auto flex flex-wrap p-2 pt-0 pb-0 flex-col md:flex-row items-center">
                    <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-1 md:mb-0">
                    <span className="ml-3 text-xl text-blue-500">NFT Ganerator</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {
                            user.name ? <div className='flex flex-row'>
                                <Link to={``} className='text-4xl p-4 mt-6 text-blue-500'><img className='h-12 rounded-full' src={user.img} /></Link>
                                <button className="border-2 mt-8 border-blue-500 font-semibold leading-none text-blue-500 py-1 px-2 hover:border-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none rounded-md">Log Out
                                    <i class="fas fa-sign-out-alt text-xl p-2 text-blue-500"></i>
                                </button>
                            </div> : 
                            <Link to='/login' className="border-2 mt-8 border-blue-500 font-semibold leading-none text-blue-500 py-1 px-2 hover:border-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none rounded-md">Log In
                                <i class="fas fa-sign-in-alt text-xl p-2 text-blue-500"></i>
                            </Link>
                        }
                    </nav>
                </div>
                <hr style={{borderTop: '2px solid black'}}/>
            </header>
        </>
  )
}

export default NavBar
