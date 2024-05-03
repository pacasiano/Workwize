import Topbar from "../components/general/topbar.jsx"
import PropTypes from 'prop-types';
// import task from Task inside data folder
// import Task from "../../data/Task";
// import Subtask from "../../data/Subtask";
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Error from "../assets/Error.svg"
import TaskList from "../components/task/tasksList.jsx"

export default function Tasks({setAddProj}) {

    Tasks.propTypes = {
        setAddProj: PropTypes.func,
    };

    const { id } = useParams()
    const [tasks, setTasks] = useState([])
    const [subtasks, setSubtasks] = useState([])
    const [project, setProject] = useState({})
    const [reload, setReload] = useState(true)
    
    useEffect(() => {
        fetch(`http://localhost:8000/api/tasks/`)
        .then(res => res.json())
        .then(data => {
            // get all tasks where project_id = id
            const tasks = data.filter(task => task.project_id === parseInt(id));
            setTasks(tasks)
        })
    }, [id, reload]) 

    useEffect(() => {
        fetch('http://localhost:8000/api/subtasks/')
        .then(res => res.json())
        .then(data => setSubtasks(data))

        fetch(`http://localhost:8000/api/projects/${id}/`)
        .then(res => res.json())
        .then(data => setProject(data))
    }, [id, reload])

    // get all Task where project_id is 1
    const uniqueCategoriesData = tasks.filter((task) => task.project_id === parseInt(id))

    return (
        <div className="max-h-screen overflow-y-scroll scroll-smooth ">
            <Topbar setTitle={project.project_name} />
            <div className="p-10">
                <div className="flex flex-row gap-5 overflow-x-auto ">
                    {!(uniqueCategoriesData.length === 0) ? ( 
                    <>
                    {uniqueCategoriesData.sort((a, b) => a.order_num - b.order_num).map((task) => (
                        <TaskList key={task.task_id} task={task} subtasks={subtasks} setAddProj={setAddProj} reload={reload} setReload={setReload}  />
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