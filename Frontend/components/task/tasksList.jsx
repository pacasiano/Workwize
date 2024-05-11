
import propTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./taskCard.jsx";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import TaskChangeName from './taskChangeName.jsx';
import TaskColor from './taskColor.jsx';
import TaskMove from './taskMove.jsx';

const TasksList = ({ task, subtasks, setAddSubtask}) => {

    TasksList.propTypes = {
        task: propTypes.object,
        subtasks: propTypes.array,
        setAddSubtask: propTypes.func,
        reload: propTypes.bool,
        setReload: propTypes.func,
    };

    const { id } = useParams()
    const [show, setShow] = useState(false)

    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {setShow(false);}
        }
            document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-row gap-2 p-4 rounded-xl h-full bg-[#fbf9f7] select-none">
            <div className="relative flex flex-col gap-3 ">
                <div className="flex flex-row justify-between items-center">
                    <div className="rounded-md font-bold text-xl text-black" >{task.task_name}</div>
                    <div className="hover:bg-neutral-300 active:bg-neutral-200 h-6 flex flexrow justify-center items-center text-center rounded-md">
                        <button onClick={()=> setShow(!show)} className="hover:font-bold px-2 -translate-y-1">...</button>
                    </div>
                </div> 

                <div hidden={!show} ref={dropdownRef} className="absolute z-50 select-none -right-52 w-60 pb-2 bg-white rounded-xl drop-shadow-xl">
                    <div className='relative flex flex-col gap-5 pt-6 pb-4 px-4'>
                        <button className='absolute right-4 top-2 hover:scale-125 font-extrabold' onClick={()=> setShow(false)}>x</button>
                        <div className='font-bold text-xl text-center'>List Actions</div>

                            <div className='flex flex-col gap-2'>

                                <div className='relative flex gap-1 flex-col border-b pb-2'>
                                    <div onClick={() => setAddSubtask({ show: true, data: { name: task.task_name, color: task.color } })} className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-neutral-200 p-1'>Add Task</div>
                                    <TaskMove task={task} />
                                </div>

                                <div className='flex flex-col border-b gap-1 pb-2'>
                                    <TaskChangeName task={task} />
                                    <TaskColor task={task} />
                                </div>
                                
                                <div className='flex flex-col gap-1'>
                                    <div className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-red-200 p-1'>Delete</div>
                                </div>
                                
                                
                            </div>
                    </div>
                </div>

                <div className="flex flex-col p-[3px] gap-1 rounded-md" style={{ background: task.color }}>
                    {(subtasks.filter((subtask) => subtask.task_id === task.task_id).length === 0) &&
                        <div className="flex justify-center items-center text-center font-thin h-20 w-52 text-md bg-white/70 rounded-sm px-2 whitespace-break-spaces">
                            There are currently no Tasks in {task.task_name}
                        </div>}
                    {subtasks.filter((subtask) => subtask.task_id === task.task_id).map((data, index) => (
                        <div key={index} draggable="true" className="rounded-md">
                        <TaskCard task_id={task.task_id} subtask_data={data} />
                        </div>
                    ))}
                </div>
                <div onClick={() => setAddSubtask({ show: true, data: { name: task.task_name, color: task.color } })} className="flex flex-row group gap-2 justify-start items-center w-min px-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer">
                    <FontAwesomeIcon className="text-md text-black/20 group-hover:text-black" icon={faPlus} />
                    <div className="text-md text-black/20 font-medium text-nowrap group-hover:text-black">Add Task</div>
                </div>
            </div>
        </div>
    )
}

export default TasksList;