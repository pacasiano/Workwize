import Topbar from "../general/topbar.jsx"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import task from Task inside data folder
// import Task from "../../data/Task";
// import Subtask from "../../data/Subtask";
import TaskCard from "./taskCard.jsx";
import {useState, useEffect} from 'react'

export default function Tasks({projectInfo, setWindow, setChosenProj, setAddProj}) {

    Tasks.propTypes = {
        setWindow: PropTypes.func,
        setChosenProj: PropTypes.func,
        projectInfo: PropTypes.object.isRequired,
        setAddProj: PropTypes.func,
    };

    const [tasks, setTasks] = useState([])
    const [subtasks, setSubtasks] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/tasks/')
        .then(res => res.json())
        .then(data => setTasks(data))

        // console.log(tasks)
    }, []) //i dont want to include 'tasks' in the dependency array bc for some reason, react keeps re-rendering the component

    useEffect(() => {
        fetch('http://localhost:8000/api/subtasks/')
        .then(res => res.json())
        .then(data => setSubtasks(data))

        // console.log(tasks)
    }, []) 

    // get all Task where project_id is 1
    const uniqueCategoriesData = tasks.filter((task) => task.project_id === projectInfo.project_id)

    return (
        <div className=" max-h-screen overflow-y-scroll scroll-smooth ">
            <Topbar setTitle={"Tasks"} />
            <div>
                <div className="flex flex-row gap-5 overflow-x-auto p-10 ">
                    {uniqueCategoriesData.map((task, index) => (
                    <div key={index} className="flex flex-row gap-2 p-4 rounded-xl h-full bg-white/80 shadow-xl">
                        <div className="flex flex-col gap-3 ">
                            <div className="rounded-md font-bold text-xl text-black" >{task.task_name}</div>
                            <div className="flex flex-col p-2 gap-2 rounded-xl" style={{ background: task.color }}>
                                {subtasks.filter((subtask) => subtask.task_id === task.task_id).map((data, index) => (
                                    <div key={index} draggable="true" className="rounded-md">
                                    <TaskCard data={data} setWindow={setWindow} setChosenProj={setChosenProj} />
                                    </div>
                                ))}
                            </div>
                            <div onClick={() => setAddProj({show: true, data: {name: task.task_name, color: task.color } })} className="flex flex-row gap-2 justify-start items-center w-min px-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer">
                                <FontAwesomeIcon className="text-md text-black/20 hover:cursor-pointer" icon={faPlus} />
                                <div className="text-md text-black/20 font-medium text-nowrap">Add Task</div>
                            </div>
                        </div>
                    </div>
                    ))} 
                </div>
            </div>
        </div>
    )
}