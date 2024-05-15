
import Topbar from "../components/general/topbar.jsx"
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Error from "../assets/Error.svg"
import TaskList from "../components/task/tasksList.jsx"

// context
import { ReloadContext } from "../context/contexts"
import { useContext } from 'react';

export default function Tasks({setAddSubtask}) {

    Tasks.propTypes = {
        setAddSubtask: PropTypes.func,
    };

    // context
    const { reload } = useContext(ReloadContext);

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
        <div className="h-full overflow-y-scroll scroll-smooth ">
            <Topbar setTitle={project.project_name} />
            <div className="p-10 h-full">
                <div className="flex flex-row gap-5 overflow-x-auto h-full ">

                    {!(uniqueCategoriesData.length === 0) ? ( 

                    <>
                    {uniqueCategoriesData.sort((a, b) => a.order_num - b.order_num).map((task) => (
                        <TaskList key={task.task_id} task={task} subtasks={subtasks} setAddSubtask={setAddSubtask}  />
                    ))}
                    </>

                    ) : (

                    <div className=" w-full flex justify-start items-start bg-[#e4dede]">
                        <div className="flex flex-col backdrop-blur-sm bg-white/60 justify-center text-center items-center font-mono p-10 gap-7 rounded-xl drop-shadow">
                            <object type="image/svg+xml" data={Error} className="w-80">
                                Your browser does not support SVG
                            </object>
                            <div className='flex flex-col justify-center items-center gap-3'>
                                <h1 className="text-1xl font-semibold">There are currently no list&apos;s available</h1>
                                <div onClick={() => setAddSubtask({ show: true, data: "" })} className="flex flex-row group gap-2 justify-start items-center w-min px-3 py-1 rounded-md hover:bg-neutral-300 bg-neutral-300/60 hover:cursor-pointer">
                                <div className="text-md text-neutral-900 font-sans text-nowrap group-hover:text-black">New list</div>
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