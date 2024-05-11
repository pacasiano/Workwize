
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import propTypes from 'prop-types';

// Context Imports
import { ReloadContext } from "../../context/contexts"
import { useContext } from 'react';

const TaskChangeName = ({task}) => {

    TaskChangeName.propTypes = {
        task: propTypes.object,
    };

    // context
    const { reload, setReload } = useContext(ReloadContext);

    const [changeName, setChangeName] = useState(false)
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        // console.log(data)

        if(data.task_name === '') {
            return
        }
        if(data.task_name === task.task_name) {
            return
        }

        fetch(`http://localhost:8000/api/tasks/${task.task_id}/`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                task_name: data.task_name,
            })
        })
        .then(res => res.json())
        .then(() => {
            setChangeName(false)
            setReload(!reload)
        })

    }

    return (
        <>
        {!changeName ?
        <div onClick={() => setChangeName(true)} className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-neutral-200 p-1'>Change Name</div>
        :
        (
        <div className='relative flex flex-col bg-neutral-200 rounded-md'>
            <div className='font-medium text-sm px-2    p-1'>Change Name</div>
            <div onClick={() => setChangeName(false)} className='absolute right-3 font-medium hover:font-bold cursor-pointer '>x</div>
            <div className='px-2 pb-2 w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("task_name", {required: true, min: 1})} className='w-full p-1 rounded-md bg-inherit outline-none' placeholder={task.task_name} />
                
                <button type='submit' className=' w-full bg-blue-400 rounded-md font-medium text-sm' >Change</button>
                </form>
            </div>
        </div>
        )
        }
        </>
    )
}

export default TaskChangeName;