
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
        <div className="fixed z-50 top-0 w-full p-3 px-5 bg-neutral-900">
            <div className="flex flex-row justify-between items-center">
                <Link to={"/"} className="flex flex-row gap-2 text-white text-2xl font-mono"><FontAwesomeIcon className="text-3xl" icon={faFolder} />Projects</Link>

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