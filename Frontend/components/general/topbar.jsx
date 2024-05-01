import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons"
//import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
//import { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

export default function Topbar({setTitle, search}) {

    //const [searchData, setSearchData] = useState([])

    Topbar.propTypes = {
        setTitle: PropTypes.string.isRequired,
        search: PropTypes.bool,
    };

    return (
        <div className="flex flex-row gap-5 justify-start items-center w-full h-14 border-b shadow-md border-[#EBDFD7] px-5">
            <div className="flex flex-row justify-between items-center w-full ">
                <div className="flex flex-row justify-center items-center h-full gap-3 font-bold text-xl">
                    <div className="flex flex-row gap-1">
                        <Link to={-1}  relative='path' className=" text-2xl">
                            <FontAwesomeIcon icon={faChevronCircleLeft} className=" text-black/30 hover:text-black/70 hover:cursor-pointer hover:drop-shadow-md" />
                        </Link>
                        <Link to={+1}  relative='path' className=" text-2xl">
                            <FontAwesomeIcon icon={faChevronCircleRight} className=" text-black/30 hover:text-black/70 hover:cursor-pointer hover:drop-shadow-md" />
                        </Link>
                    </div>
                    <div>
                    
                        {setTitle}
                    </div>
                </div>
                <div className="flex flex-row gap-5 justify-between items-center">
                    {search===true && (
                    <div className={` ${search===false && "hidden"} group flex flex-nowrap relative border-b-2 border-black/20 hover:-translate-y-[1px] focus-within:border-black/50 transition-transform duration-300`}>
                        <button>
                            <FontAwesomeIcon className="pr-1 text-black/20 group-focus-within:text-black/50" icon={faMagnifyingGlass} />
                        </button>
                        <input type="search" className="bg-inherit outline-none pointer-events-auto" placeholder="Search..." />
                    </div>)}
                    
                </div>
            </div>
        </div>
    )
}