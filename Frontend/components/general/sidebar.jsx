import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import { Link, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Users, Settings, Task, Calendar, Dashboard } from "../../assets/icons.jsx"

export default function Sidebar({Wide, setWide, setAddTask}) {

    Sidebar.propTypes = {
        Wide: PropTypes.bool.isRequired,
        setWide: PropTypes.func,
        setAddTask: PropTypes.func,
    };

    const { id } = useParams();
    const { pathname } = useLocation();
    // remove /project/:id/ from pathname
    const pathAfterId = pathname.match(/^\/project\/[^/]+\/(.*)$/) || ["tasks", "tasks"];
    console.log(pathAfterId[1])

    

    const handleAddTask = () => {
        console.log("add task Clicked")
        setAddTask({show: true, data: "" })
    }

    return (
        <div className={` ${Wide ? ("w-52") : ("w-20")} max-w-52 h-full bg-[#27303B] transition-all ease-in-out`}>

            {Wide ? (
            <div className="relative flex flex-col h-full items-start justify-start pr-7 pl-4 p-4 pt-8">

                <button className="absolute transform-gpu transition-all rounded-full -right-4 bottom-1/2" onClick={()=> setWide(false)}>
                        <FontAwesomeIcon className=" bg-black  ease-in-out hover:scale-110 text-3xl rounded-full text-white " icon={faCircleChevronLeft} />
                </button>
        
                <div className="flex flex-col items-start justify-start gap-6">

                    <div onClick={handleAddTask} className="transition-all ease-in-out w-full bg-white flex flex-row gap-2 h-9 px-1 pr-4 justify-start items-center text-black py-2 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <FontAwesomeIcon className="text-3xl text-green-600/80" icon={faCirclePlus} />
                        <p className="" >New&nbsp;List</p>
                    </div>

                    <div className="flex flex-col text-xl">
                        {/* <Link to={`/project/${id}/dashboard`} className={`flex flex-row h-10  gap-2 ${pathAfterId[1] === "dashboard" && "bg-neutral-100/10"} transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md`}>
                            <Dashboard /><p>Dashboard</p>
                        </Link> */}
                        <Link to={`/project/${id}/tasks`} className={`flex flex-row h-10  ${((pathAfterId[1] === "tasks")) && "bg-neutral-100/10"} gap-2 transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md`}>
                            <Task/>Tasks
                        </Link>
                        <Link to={`/project/${id}/calendar`} className={`flex flex-row gap-2 h-10  ${pathAfterId[1] === "calendar" && "bg-neutral-100/10"} transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md`}>
                            <Calendar  />Calendar
                        </Link>
                        <Link to={`/project/${id}/users`} className={`flex flex-row gap-2 h-10  ${pathAfterId[1] === "users" && "bg-neutral-100/10"} transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md`}>
                            {/* <FontAwesomeIcon className="text-2xl" icon={faUsers} /> */}
                            <Users />Users
                        </Link>
                        <Link to={`/project/${id}/settings`} className={`flex flex-row gap-2 h-10  ${pathAfterId[1] === "settings" && "bg-neutral-100/10"} transition-all hover:-translate-y-[2px] hover:cursor-pointer items-center text-white py-1 px-2 rounded-md`}>
                            <Settings />Settings
                        </Link>
                    </div>

                </div>

            </div>
            ):(
            <div className="relative flex flex-col items-start h-full justify-start pt-8 px-4 pl-4 transition-transform ease-in-out">
                
                <button className="absolute transform-gpu transition-all rounded-full -right-4 bottom-1/2" onClick={()=> setWide(true)}>
                    <FontAwesomeIcon className=" bg-black  hover:scale-110 text-3xl rounded-full text-white " icon={faCircleChevronRight} />
                </button>

                <div className="flex flex-col items-start justify-start gap-6">

                    <div onClick={handleAddTask} className="transition-all ease-in-out self-center bg-white flex flex-row gap-2 h-9 px-1 justify-center items-center text-black text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                        <FontAwesomeIcon className="text-3xl text-green-600/80" icon={faCirclePlus} />
                    </div>

                    <div className="flex flex-col justify-start items-start text-xl">
                        {/* <Link to={`/project/${id}/dashboard`} className={`flex flex-row gap-2 h-10  ${pathAfterId[1] === "dashboard" && "bg-neutral-100/10"} transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-2 px-2 rounded-md`}>
                            <Dashboard />   
                        </Link> */}
                        <Link to={`/project/${id}/tasks`} className={`flex flex-row  h-10  gap-2 ${((pathAfterId[1] === "tasks")) && "bg-neutral-100/10"} transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-2 px-2 rounded-md`}>
                            <Task />
                        </Link>
                        <Link to={`/project/${id}/calendar`} className={`flex flex-row h-10  gap-2 ${pathAfterId[1] === "calendar" && "bg-neutral-100/10"} transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-2 px-2 rounded-md`}>
                            <Calendar />
                        </Link>
                        <Link to={`/project/${id}/users`} className={`flex flex-row h-10  gap-2 ${pathAfterId[1] === "users" && "bg-neutral-100/10"} transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-2 px-2 rounded-md`}>
                            <Users />
                        </Link>
                        <Link to={`/project/${id}/settings`} className={`flex flex-row h-10  gap-2 ${pathAfterId[1] === "settings" && "bg-neutral-100/10"} tansform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-2 px-2 rounded-md`}>
                            <Settings />
                        </Link>
                    </div>
                </div>
                
            </div>
            )}
            
        </div>
    )
}
