import Topbar from "../general/topbar.jsx"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import task from Task inside data folder
import Task from "../../data/Task";
import Subtask from "../../data/Subtask";
import TaskCard from "./taskCard.jsx";

export default function Tasks({projectInfo, setChosenProj, setAddProj}) {

    Tasks.propTypes = {
        setChosenProj: PropTypes.func,
        projectInfo: PropTypes.object.isRequired,
        setAddProj: PropTypes.func,
    };

    // get all Task where project_id is 1
    const uniqueCategoriesData = Task.filter((task) => task.project_id === projectInfo.project_id)

    return (
        <div className=" max-h-screen overflow-y-scroll scroll-smooth ">
            <Topbar setTitle={"Tasks"} />
            <div>
                <div className="flex flex-row gap-5 overflow-x-auto p-10 ">
                    {uniqueCategoriesData.map((task, index) => (
                    <div key={index} className="flex flex-row gap-2 p-4 rounded-xl h-full bg-white/80 shadow-xl">
                        <div className="flex flex-col gap-3 ">
                            <div className="rounded-md font-bold text-xl text-black" >{task.name}</div>
                            <div className="flex flex-col p-[3px] gap-1 rounded-md" style={{ background: task.color }}>
                                {Subtask.filter((subtask) => subtask.task_id === task.task_id).map((data, index) => (
                                    <div key={index} draggable="true" className="rounded-md">
                                    <TaskCard data={data} setChosenProj={setChosenProj} />
                                    </div>
                                ))}
                            </div>
                            <div onClick={() => setAddProj({ show: true, data: { name: task.name, color: task.color } })} className="flex flex-row group gap-2 justify-start items-center w-min px-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer">
                                <FontAwesomeIcon className="text-md text-black/20 group-hover:text-black" icon={faPlus} />
                                <div className="text-md text-black/20 font-medium text-nowrap group-hover:text-black">Add Task</div>
                            </div>
                        </div>
                    </div>
                    ))} 
                </div>
            </div>
        </div>
    )
}