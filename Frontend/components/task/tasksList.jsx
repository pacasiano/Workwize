
import propTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./taskCard.jsx";
import { useEffect, useState, useRef } from 'react';
import { Cancel, Confirm } from "../../assets/icons.jsx"

import TaskChangeName from './taskChangeName.jsx';
import TaskColor from './taskColor.jsx';
import TaskMove from './taskMove.jsx';

//context imports
import { ReloadContext } from "../../context/contexts.jsx"
import { useContext } from 'react';

import { toast } from 'react-toastify';

const TasksList = ({ task, subtasks }) => {

    TasksList.propTypes = {
        task: propTypes.object,
        subtasks: propTypes.array,
        setAddSubtask: propTypes.func,
        reload: propTypes.bool,
        setReload: propTypes.func,
    };

    // context
    const { reload, setReload } = useContext(ReloadContext);

    const [show, setShow] = useState(false)
    const [addSubtask, setAddSubtask] = useState(false)
    const [subtaskName, setSubtaskName] = useState('')

    const onClick = () => {

        if (subtaskName === '') {
            toast.warning('Task name is empty');
            return;
        }
        if (subtaskName.length > 50) {
            toast.warning('Task name is too long');
            return;
        }
        if (subtaskName.length < 3) {
            toast.warning('Task name is too short');
            return;
        }

        fetch(`http://localhost:8000/subtasks/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                task_id: task.task_id,
                subtask_name: subtaskName,
                start_date: new Date().toISOString(),
                end_date: new Date().toISOString(),
            }),
        })
        .then(res => res.json())
        .then(data => {
            toast.success(`Task ${subtaskName} has been created successfully!`);
            console.log(data)
            setReload(!reload)
            setAddSubtask(false)
        })

    }


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

    const deleteThis = () => {
        fetch(`http://localhost:8000/tasks/${task.task_id}/`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
            if (res.ok) {
                toast.success(`List ${task.task_name} has been deleted successfully!`);
                setReload(!reload);
            } else {
                throw new Error('Failed to delete task');
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="relative h-fit  select-none">
            <div className="relative flex flex-col gap-3 p-4 rounded-xl backdrop-blur-sm drop-shadow bg-white/50">
                <div className="flex flex-row justify-between items-center">
                    <div className="rounded-md font-bold text-xl text-black text-wrap w-48" >{task.task_name}</div>
                    <div className="hover:bg-neutral-300 active:bg-neutral-200 h-6 flex flexrow justify-center items-center text-center rounded-md">
                        <button onClick={()=> setShow(!show)} className="hover:font-bold px-2 -translate-y-1">...</button>
                    </div>
                </div> 

                <div className="flex flex-col p-[3px] gap-1 rounded-md" style={{ background: task.color }}>
                    {(subtasks.filter((subtask) => subtask.task_id === task.task_id).length === 0) &&
                        <div className="flex justify-center items-center text-center font-thin h-20 w-56 text-md bg-white/70 rounded-md px-2 whitespace-break-spaces">
                            There are currently no Tasks in {task.task_name}
                        </div>}
                    {subtasks.filter((subtask) => subtask.task_id === task.task_id).map((data, index) => (
                        <div key={index} draggable="true" className="rounded-md">
                        <TaskCard task_id={task.task_id} subtask_data={data} />
                        </div>
                    ))}
                    {addSubtask &&
                    <div className="relative flex flex-col gap-2 bg-white/70 shadow-md rounded-md w-56 p-5">
                        <div onClick={() => setAddSubtask(false)} className='absolute top-1 right-1 hover:scale-110 cursor-pointer'><Cancel /> </div>
                        <input onChange={(e)=> setSubtaskName(e.target.value)} type='text' placeholder='task name' className="bg-white/0 outline-none text-md font-normal" />
                    </div>
                    }
                </div>
                
                {!addSubtask ? (
                <div onClick={() => setAddSubtask(true)} className=" flex flex-row group gap-2 justify-start items-center w-min px-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer">
                    <FontAwesomeIcon className="text-md text-black/20 group-hover:text-black" icon={faPlus} />
                    <div className="text-md text-black/20 font-medium text-nowrap group-hover:text-black">Add Task</div>
                </div>
                ) : (
                    <>
                    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-1 flex flex-row justify-center items-center text-md">Add task <Confirm fill={"#ffffff"} /></button>
                    </>
                )}
                
            </div>

            <div hidden={!show} ref={dropdownRef} className="absolute z-50 top-4 -right-48 select-none w-60 pb-2 bg-white rounded-xl drop-shadow-xl">
                <div className='relative flex flex-col gap-5 pt-6 pb-4 px-4'>
                    <button className='absolute right-2 top-2 hover:scale-110 font-extrabold' onClick={()=> setShow(false)}><Cancel /></button>
                    <div className='font-bold text-xl text-center'>List Actions</div>
                    <div className='flex flex-col gap-2'>
                        <div className='relative flex gap-1 flex-col border-b pb-2'>
                            <div onClick={() => {setAddSubtask(true), setShow(false)}} className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-neutral-200 p-1'>Add Task</div>
                            <TaskMove task={task} />
                        </div>
                        <div className='flex flex-col border-b gap-1 pb-2'>
                            <TaskChangeName task={task} />
                            <TaskColor task={task} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div onClick={deleteThis} className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-red-200 p-1'>Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TasksList;