
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Header = ({loggedIn}) => {

    Header.propTypes = {
        loggedIn: PropTypes.bool.isRequired
    }; 

    return (
        <div className="fixed z-50 top-0 w-full p-3 px-5 bg-neutral-800">
            <div className="flex flex-row gap-10 justify-between items-center">

                <Link to={"/"} className="flex flex-row justify-start items-center gap-2 ">
                    <FontAwesomeIcon className="text-3xl text-[#e4dede]" icon={faFolder} />
                    <div className='bg-clip-text text-transparent bg-gradient-to-r from-[#e4dede] to-[#e4dede] text-3xl font-black'>Projects</div>
                </Link>
                
                <div className=' flex flex-row gap-5 justify-center'>
                    <Link to="/#about" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">About</Link>
                    <Link to="/#contact" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Contact</Link>
                    <Link to="/#faq" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">FAQ</Link>
                </div>

                <div className='flex flex-row justify-end items-center gap-5 '>

                    {loggedIn &&
                    <div className='flex flex-row gap-5'>
                    <Link to="/project" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Projects</Link>
                    </div>
                    }

                    {!loggedIn ?
                    <button className="transition-all ease-in-out bg-white flex flex-row gap-2 h-10 px-5 justify-center items-center text-black py-2 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <Link to={"/project"} className="" >Login</Link>
                    </button>
                    :
                    <div>
                        <FontAwesomeIcon className="w-10 h-7 pt-1 text-[#e6e4dd]" icon={faUserCircle} />
                    </div>
                    }

                </div>
            </div>
        </div>
    );
    }

export default Header;