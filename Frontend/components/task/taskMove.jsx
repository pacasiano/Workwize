
import { useEffect, useState } from 'react';
import { useForm  } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { Edit, Cancel, Confirm } from "../../assets/icons.jsx"

// context
import { ReloadContext } from "../../context/contexts"
import { useContext } from 'react';

import { toast } from 'react-toastify';

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
        const fetchTasks = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/tasks/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching tasks inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            //filter data where project_id = id
            const filteredData = data.filter(task => task.project_id === parseInt(id));
            setData(filteredData)
          } catch (error) {
            console.error('Error fetching tasks in catch block: ', error);
          }
        };
      
        fetchTasks();
      }, [id]);

    

    const onSubmit = (data) => {
        console.log(task.task_id)
        console.log(data.order_num)
        const accessToken = sessionStorage.getItem('accessToken');
      
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch(`http://localhost:8000/tasks/${task.task_id}/`,{
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order_num: parseInt(data.order_num)})
        })
        .then(res => {res.json()})
        .catch(error => {console.error(error)})
        toast.success("Task has been moved successfully!")
        setChangeMove(false)
        reload ? setReload(false) : setReload(true)
    }

    return (

        <>
        {!changeMove ?
        <div onClick={() => setChangeMove(true)} className='font-medium group flex flex-row justify-between text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-neutral-200 p-1'>
            Move List
            <div className='hidden group-hover:block'>
                <Edit />
            </div>
        </div>
        :
        (
        <div className='relative flex flex-col bg-neutral-200 rounded-md'>
            <div className='font-medium text-sm px-2    p-1'>Move List</div>
            <div onClick={() => setChangeMove(false)} className='absolute right-1 top-1 font-medium hover:scale-110 cursor-pointer '><Cancel/></div>
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
                
                <button type='submit' className=' w-full bg-blue-400 rounded-md flex flex-row justify-center font-normal hover:scale-[101%] text-sm' >Move<Confirm /></button>
                </form>
            </div>
        </div>
        )
        }
        </>

    )
}