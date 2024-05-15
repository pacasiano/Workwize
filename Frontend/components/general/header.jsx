
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Activity from '../../assets/activity.svg';

const Header = ({loggedIn, disableMiddleLinks}) => {

    Header.propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        disableMiddleLinks: PropTypes.bool
    };

    return (
        <div className="fixed z-50 top-0 w-full h-[60px] p-3 px-5 bg-neutral-800">
            <div className="flex flex-row gap-10 justify-between items-center">

                <Link to={"/"} className="flex flex-row justify-start items-center gap-2 ">
                    <img src={Activity } alt="logo" className='h-8 ' />
                    <div className='bg-clip-text text-transparent bg-gradient-to-r from-[#e4dede] to-[#e4dede] text-3xl font-black'>Workwize</div>
                </Link>
                
                {!disableMiddleLinks ? (
                <div className=' flex flex-row gap-5 justify-center'>
                    <Link to="/#about" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">About</Link>
                    <Link to="/#contact" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Contact</Link>
                    <Link to="/#faq" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">FAQ</Link>
                </div>
                ) : null}

                <div className='flex flex-row justify-end items-center gap-5 '>

                    {loggedIn &&
                    <div className='flex flex-row gap-5'>
                    <Link to="/project" className="text-[#e6e4dd] text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Projects</Link>
                    </div>
                    }

                    {!loggedIn ?
                    <Link to={"/login"} >
                    <button className="transition-all ease-in-out bg-white flex flex-row gap-2 px-3 justify-center items-center text-black py-1 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <div className="" >Login</div>
                    </button>
                    </Link>
                    :
                    <div>
                        <Link to={"/user/settings"} >
                            <FontAwesomeIcon className="w-10 h-7 pt-1 text-[#e6e4dd]" icon={faUserCircle} />
                        </Link>
                    </div>
                    }

                </div>
            </div>
        </div>
    );
    }

export default Header;