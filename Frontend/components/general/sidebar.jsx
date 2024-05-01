import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faListCheck } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faBorderAll } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

export default function Sidebar({Wide, setWide, setAddProj}) {

    Sidebar.propTypes = {
        Wide: PropTypes.bool.isRequired,
        setWide: PropTypes.func,
        setAddProj: PropTypes.func,
    };

    const { id } = useParams();

    return (
        <div className={` ${Wide ? ("w-52") : ("w-20")} max-w-52 h-full bg-neutral-800 transition-all ease-in-out`}>

            {Wide ? (
            <div className="relative flex flex-col h-full items-start justify-start pl-5 p-4 pt-8">

                <button className="absolute transform-gpu transition-all rounded-full -right-4 bottom-1/2" onClick={()=> setWide(false)}>
                        <FontAwesomeIcon className=" bg-black  ease-in-out hover:scale-110 text-3xl rounded-full text-white " icon={faCircleChevronLeft} />
                </button>
        
                <div className="flex flex-col items-start justify-start gap-6">

                    <div onClick={()=> setAddProj({show: true, data: "" })} className="transition-all ease-in-out w-full bg-white flex flex-row gap-2 h-9 px-1 pr-4 justify-start items-center text-black py-2 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <FontAwesomeIcon className="text-3xl text-green-600/90" icon={faCirclePlus} />
                        <p className="" >New&nbsp;List</p>
                    </div>

                    <div className="flex flex-col text-xl gap-3">
                        <Link to={`/project/${id}/dashboard`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faBorderAll} /><p>Dashboard</p>
                        </Link>
                        <Link to={`/project/${id}/tasks`} className="flex flex-row -ml-[1px] gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faListCheck} />Tasks
                        </Link>
                        <Link to={`/project/${id}/calendar`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faCalendar} />Calendar
                        </Link>
                        <Link to={`/project/${id}/users`} className="flex flex-row -ml-1 gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faUsers} />Users
                        </Link>
                        <Link to={`/project/${id}/settings`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faGear} />Settings
                        </Link>
                    </div>

                </div>

            </div>
            ):(
            <div className="relative flex flex-col items-start h-full justify-start pt-8 px-4 pl-5 transition-transform ease-in-out">
                
                <button className="absolute transform-gpu transition-all rounded-full -right-4 bottom-1/2" onClick={()=> setWide(true)}>
                    <FontAwesomeIcon className=" bg-black  hover:scale-110 text-3xl rounded-full text-white " icon={faCircleChevronRight} />
                </button>

                <div className="flex flex-col items-start justify-start gap-6">

                    <div onClick={()=> setAddProj({show: true, data: "" })} className="transition-all ease-in-out bg-white flex flex-row gap-2 h-9 px-1 justify-center items-center text-black text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <FontAwesomeIcon className="text-3xl text-green-600/90" icon={faCirclePlus} />
                    </div>

                    <div className="flex flex-col gap-4 pt-[2px] text-xl">
                        <Link to={`/project/${id}/dashboard`} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faBorderAll} />
                        </Link>
                        <Link to={`/project/${id}/tasks`} className="flex flex-row -ml-[1px] gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faListCheck} />
                        </Link>
                        <Link to={`/project/${id}/calendar`} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faCalendar} />
                        </Link>
                        <Link to={`/project/${id}/users`} className="flex flex-row -ml-1 gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faUsers} />
                        </Link>
                        <Link to={`/project/${id}/settings`} className="flex flex-row gap-2 tansform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faGear} />
                        </Link>
                    </div>
                </div>
                
            </div>
            )}
            
        </div>
    )
}
