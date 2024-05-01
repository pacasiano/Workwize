import Topbar from "../components/general/topbar.jsx"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import task from Task inside data folder
// import Task from "../../data/Task";
// import Subtask from "../../data/Subtask";
import TaskCard from "../components/task/taskCard.jsx";
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import Error from "../assets/Error.svg"

export default function Tasks({setAddProj}) {

    Tasks.propTypes = {
        setAddProj: PropTypes.func,
    };

    const { id } = useParams()
    const [tasks, setTasks] = useState([])
    const [subtasks, setSubtasks] = useState([])
    const [project, setProject] = useState({})


    useEffect(() => {
        fetch(`http://localhost:8000/api/tasks/`)
        .then(res => res.json())
        .then(data => {
            // get all tasks where project_id = id
            const tasks = data.filter(task => task.project_id === parseInt(id));
            setTasks(tasks)
        })
    }, [id]) 

    useEffect(() => {
        fetch('http://localhost:8000/api/subtasks/')
        .then(res => res.json())
        .then(data => setSubtasks(data))

        fetch(`http://localhost:8000/api/projects/${id}/`)
        .then(res => res.json())
        .then(data => setProject(data))
    }, [id])

    // get all Task where project_id is 1
    const uniqueCategoriesData = tasks.filter((task) => task.project_id === parseInt(id))

    return (
        <div className="max-h-screen overflow-y-scroll scroll-smooth ">
            <Topbar setTitle={project.project_name} />
            <div className="p-10">
                <div className="flex flex-row gap-5 overflow-x-auto ">
                    {!(uniqueCategoriesData.length === 0) ? ( 
                    
                    <>
                    {uniqueCategoriesData.map((task, index) => (
                    <div key={index} className="flex flex-row gap-2 p-4 rounded-xl h-full bg-[#fbf9f7] ">
                        <div className="flex flex-col gap-3 ">
                            <div className="flex flex-row justify-between">
                                <div className="rounded-md font-bold text-xl text-black" >{task.task_name}</div>
                                <Link to={`${task.task_id}/edit`} relative="path" className="hover:font-bold">...</Link>
                            </div>
                            <div className="flex flex-col p-[3px] gap-1 rounded-md" style={{ background: task.color }}>
                                {(subtasks.filter((subtask) => subtask.task_id === task.task_id).length === 0) &&
                                    <div className="flex justify-center items-center text-center font-thin h-20 w-52 text-md bg-white/70 rounded-sm px-2 whitespace-break-spaces">
                                        There are currently no Tasks in {task.task_name}
                                    </div>}
                                {subtasks.filter((subtask) => subtask.task_id === task.task_id).map((data, index) => (
                                    <div key={index} draggable="true" className="rounded-md">
                                    <TaskCard subtask_data={data} />
                                    </div>
                                ))}
                            </div>
                            <div onClick={() => setAddProj({ show: true, data: { name: task.task_name, color: task.color } })} className="flex flex-row group gap-2 justify-start items-center w-min px-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer">
                                <FontAwesomeIcon className="text-md text-black/20 group-hover:text-black" icon={faPlus} />
                                <div className="text-md text-black/20 font-medium text-nowrap group-hover:text-black">Add Task</div>
                            </div>
                        </div>
                    </div>
                    ))}
                    </>

                    ) : (

                    <div className="h-full w-full flex justify-center items-center bg-[#EBDFD7]">
                        <div className="flex flex-col bg-white justify-center text-center items-center font-mono p-10 gap-7 rounded-xl drop-shadow-xl">
                            <object type="image/svg+xml" data={Error} className="w-80">
                                Your browser does not support SVG
                            </object>
                            <div className='flex flex-col justify-center items-center gap-3'>
                                <h1 className="text-1xl font-semibold">There are currently no list&apos;s available</h1>
                                <div onClick={() => setAddProj({ show: true, data: "" })} className="flex flex-row group gap-2 justify-start items-center w-min px-3 py-1 rounded-md hover:bg-neutral-300 bg-neutral-200 hover:cursor-pointer">
                                <div className="text-md text-black/90 font-medium text-nowrap group-hover:text-black">New list!</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    )}
                </div>
            </div>
        </div>
    )
}