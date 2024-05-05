
import propTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./taskCard.jsx";
import { useEffect, useState, useRef } from 'react';
import { useForm  } from 'react-hook-form';
import { useParams } from 'react-router-dom';


const TasksList = ({ task, subtasks, setAddSubtask, reload, setReload }) => {

    TasksList.propTypes = {
        task: propTypes.object,
        subtasks: propTypes.array,
        setAddSubtask: propTypes.func,
        reload: propTypes.bool,
        setReload: propTypes.func,
    };

    const { id } = useParams()
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/tasks/`)
        .then(res => res.json())
        .then(data => {
            //filter data where project_id = id
            const filteredData = data.filter(task => task.project_id === parseInt(id));
            setData(filteredData)
        });
    }, [id])

    const onSubmit = (data) => {
        console.log(task.task_id)
        console.log(data.order_num)
        fetch(`http://localhost:8000/tasks/${task.task_id}/`,{
            method: 'PATCH',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({order_num: parseInt(data.order_num)})
        })
        .then(res => {res.json()})
        .catch(error => {console.error(error)})
        reload ? setReload(false) : setReload(true)
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

    return (
        <div className="flex flex-row gap-2 p-4 rounded-xl h-full bg-[#fbf9f7] select-none">
            <div className="relative flex flex-col gap-3 ">
                <div className="flex flex-row justify-between items-center">
                    <div className="rounded-md font-bold text-xl text-black" >{task.task_name}</div>
                    <div className="hover:bg-neutral-300 active:bg-neutral-200 h-6 flex flexrow justify-center items-center text-center rounded-md">
                        <button onClick={()=> setShow(!show)} className="hover:font-bold px-2 -translate-y-1">...</button>
                    </div>
                </div>
                <div hidden={!show} ref={dropdownRef} className="absolute z-50 select-none -right-36 w-44 pb-2 bg-white rounded-xl drop-shadow-xl">
                    <div className="p-4 flex flex-col gap-2">
                        <div className='relative text-center'>
                            <div className='font-bold'>Move List</div>
                            <button className='absolute right-0 -top-0.5 hover:scale-125 font-extrabold' onClick={()=> setShow(false)}>x</button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-1'>
                            <div className='bg-neutral-400 w-full rounded-md px-3 p-1 text-sm text-neutral-200' >
                                <label className=''>Order</label>
                                <select {...register("order_num")} className='bg-inherit pl-2 font-bold focus:outline-none w-full text-neutral-100'>
                                {data.map((item, index) => (
                                    <option key={index} value={index}>{index}</option>
                                ))}
                                </select>
                            </div>
                            <div className='bg-blue-600/80 w-full hover:scale-105 group hover:cursor-pointer text-center rounded-md text-sm text-neutral-200' >
                                <input type="submit" className='group-hover:cursor-pointer px-3 p-1' value={"Move"} />
                            </div>
                        </div>
                        </form>
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