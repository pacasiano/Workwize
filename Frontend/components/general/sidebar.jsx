import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faListCheck } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faBorderAll } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
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
        <div className={` ${Wide ? ("w-60") : ("w-20")} h-full bg-black/90 transition-all ease-in-out`}>

            {Wide ? (
            <div className="relative flex flex-col h-full items-start justify-start pl-5 p-4 pt-8">

                {/* change this back to the may folder Icon + Projects */}
                <Link to={"/project"} className="transition-all flex px-1 flex-row justify-start flex-nowrap text-white font-thin text-md group rounded-xl bg-white/0 hover:cursor-pointer hover:bg-white hover:text-black">
                    <FontAwesomeIcon className="text-white group-hover:text-black p-1 text-3xl" icon={faFolder} />
                    <h1 className="flex flex-row gap-2 text-xl font-mono px-2 p-1 ">Projects</h1>
                </Link>

                <button className="absolute transform-gpu transition-all rounded-full translate-x-40 translate-y-80" onClick={()=> setWide(false)}>
                        <FontAwesomeIcon className=" bg-black  ease-in-out hover:scale-110 text-3xl translate-x-3 rounded-full text-white " icon={faCircleChevronLeft} />
                </button>
        
                <div className="flex flex-col items-start justify-start gap-10 pt-10">

                    <div onClick={()=> setAddProj({show: true, data: "" })} className="transition-all ease-in-out bg-white flex flex-row gap-2 h-9 px-2 pr-4 justify-center items-center text-black py-2 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <FontAwesomeIcon className="text-3xl text-green-600/90" icon={faCirclePlus} />
                        <p className="" >New&nbsp;List</p>
                    </div>

                    <div className="flex flex-col text-xl gap-3">
                        <Link to={`/project/${id}/dashboard`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faBorderAll} /><p>Dashboard</p>
                        </Link>
                        <Link to={`/project/${id}/tasks`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faListCheck} />Tasks
                        </Link>
                        <Link to={`/project/${id}/calendar`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faCalendar} />Calendar
                        </Link>
                        <Link to={`/project/${id}/settings`} className="flex flex-row gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faGear} />Settings
                        </Link>
                    </div>

                </div>

            </div>
            ):(
            <div className="flex flex-col items-start h-full justify-start pt-8 px-4 pl-5 transition-transform ease-in-out">

                <Link to={"/project"} relative="path" className="flex flex-row group transition-all gap-2 text-white font-bold text-3xl rounded-md bg-white/0 text-white/70 hover:cursor-pointer hover:bg-white hover:text-black">
                    <FontAwesomeIcon className="text-white group-hover:text-black p-1 text-3xl" icon={faFolder} />
                </Link>
                
                <button className="absolute transform-gpu transition-all rounded-full translate-x-10 translate-y-80" onClick={()=> setWide(true)}>
                    <FontAwesomeIcon className=" bg-black  hover:scale-110 text-3xl rounded-full text-white " icon={faCircleChevronRight} />
                </button>

                <div className="flex flex-col items-start justify-start gap-10 pt-10">

                    <div onClick={()=> setAddProj({show: true, data: "" })} className="transition-all ease-in-out bg-white flex flex-row gap-2 h-9 px-1 justify-center items-center text-black text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <FontAwesomeIcon className="text-3xl text-green-600/90" icon={faCirclePlus} />
                    </div>

                    <div className="flex flex-col gap-4 text-xl">
                        <Link to={`/project/${id}/dashboard`} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faBorderAll} />
                        </Link>
                        <Link to={`/project/${id}/tasks`} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faListCheck} />
                        </Link>
                        <Link to={`/project/${id}/calendar`} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                            <FontAwesomeIcon className="text-2xl" icon={faCalendar} />
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
