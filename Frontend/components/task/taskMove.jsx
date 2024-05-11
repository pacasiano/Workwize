
import { useEffect, useState } from 'react';
import { useForm  } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

// context
import { ReloadContext } from "../../context/contexts"
import { useContext } from 'react';

export default function TaskMove({task}) {

    TaskMove.propTypes = {
        task: propTypes.object,
    };

    // context
    const { reload, setReload } = useContext(ReloadContext);

    const [changeMove, setChangeMove] = useState(false)

    const { id } = useParams()
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState([])

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
        setChangeMove(false)
        reload ? setReload(false) : setReload(true)
    }

    return (

        <>
        {!changeMove ?
        <div onClick={() => setChangeMove(true)} className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-neutral-200 p-1'>Move List</div>
        :
        (
        <div className='relative flex flex-col bg-neutral-200 rounded-md'>
            <div className='font-medium text-sm px-2    p-1'>Move List</div>
            <div onClick={() => setChangeMove(false)} className='absolute right-3 font-medium hover:font-bold cursor-pointer '>x</div>
            <div className='px-2 pb-2 w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>

                <div className='w-full rounded-md px-3 p-1 text-sm text-neutral-900' >
                    <label className=''>Order</label>
                    <select {...register("order_num")} className='bg-inherit pl-2 font-bold focus:outline-none w-full text-neutral-900'>
                    {data.map((item, index) => (
                        <option key={index} value={index}>{index}</option>
                    ))}
                    </select>
                </div>
                
                <button type='submit' className=' w-full bg-blue-400 rounded-md font-medium text-sm' >Move</button>
                </form>
            </div>
        </div>
        )
        }
        </>

    )
}