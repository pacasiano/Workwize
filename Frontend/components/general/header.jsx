
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <div className="fixed z-50 top-0 w-full p-3 px-5 bg-black/90">
            <div className="flex flex-row justify-between items-center">
                <h1 className="flex flex-row gap-2 text-white text-2xl font-mono"><FontAwesomeIcon className="text-3xl" icon={faFolder} />Projects</h1>

                <div className='mr-24 flex flex-row gap-5'>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">About</p>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Contact</p>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">FAQ</p>
                </div>

                <div className='flex flex-row justify-center items-center gap-5 '>

                    {loggedIn &&
                    <div className='flex flex-row gap-5'>
                    <Link to="/project" className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Projects</Link>
                    </div>
                    }

                    {!loggedIn ?
                    <button className="transition-all ease-in-out bg-white flex flex-row gap-2 h-10 px-5 justify-center items-center text-black py-2 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <Link to={"/project"} className="" >Login</Link>
                    </button>
                    :
                    <div>
                        <FontAwesomeIcon className="w-10 h-7 pt-1 text-white" icon={faUserCircle} />
                    </div>
                    }
                

                </div>
            </div>
        </div>
    );
    }

export default Header;