import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

// Subtask Components
import Label from '../components/subtask/subtaskLabel';
import Topbar from '../components/general/topbar'
import UserIcon from '../components/subtask/userIcon';
import Description from '../components/subtask/description';
import Date from '../components/subtask/date';
import Order from '../components/subtask/order';
import Actions from '../components/subtask/actions';

import { toast } from 'react-toastify';

export default function Subtask() {

    const { subtask_id } = useParams();
    const [subtasks, setSubtasks] = useState({});

    const [reloadHere, setReloadHere] = useState(false);
    const [editTitle, setEditTitle] = useState(false);
    const { register, handleSubmit } = useForm();


    useEffect(() => {
        const fetchSubtask = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/subtasks/${subtask_id}/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching subtask with ID of ${subtask_id} inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            setSubtasks(data)
          } catch (error) {
            console.error(`Error fetching subtask with ID of ${subtask_id} in catch block: `, error);
          }
        };
      
        fetchSubtask();
      }, [subtask_id, reloadHere]);


    const divRef = useRef(null);

    const onSubmit = data => {

        console.log(data)
        
        if (data.subtask_name === "") {
            return
        }
        if (data.subtask_name === subtasks.subtask_name) {
            return
        }

        const accessToken = sessionStorage.getItem('accessToken');
      
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        // change the title of the subtask
        fetch(`http://localhost:8000/subtasks/${subtask_id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Subtask title changed")
            toast.success('Task title has been changed successfully!');
            setReloadHere(!reloadHere);
            console.log(data)
        }
        );
        
        setEditTitle(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {setEditTitle(false);}
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); 

    return (
        <div className=" h-full">
            <Topbar setTitle={"Task"} search={false} />
            <div className="p-8 overflow-auto ">
                <div className='bg-[#fbf9f7] rounded-xl h-fit overflow-auto'>
                    <div className="p-10 flex flex-row justify-between">
                        <section className="flex flex-col justify-start gap-5 pr-20 w-full">
                            <div className="flex flex-col gap-3 w-full">
                                <div className='flex flex-row gap-4 w-full select-none'>
                                    <div className=" whitespace-nowrap flex flex-row gap-2 justify-start items-center" >
                                    <FontAwesomeIcon icon={faBarsProgress} className='text-black' />
                                    {editTitle === false ?
                                    <div onDoubleClick={()=>setEditTitle(true)} className="text-2xl font-semibold select-none hover:cursor-pointer">{subtasks.subtask_name}</div>
                                    :
                                    <div  ref={divRef} className='flex flex-row gap-1'>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <input type="text" {...register("subtask_name", {required: true, max: 25})} className='text-2xl font-semibold border-0]' placeholder={subtasks.subtask_name} />
                                            <button type='submit' className='text-black/50 hover:cursor-pointer hover:text-black'>Save</button>
                                        </form>
                                    </div>
                                    }
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-3 pl-6">
                                    <div className='flex flex-col gap-1'><div className='text-sm font-bold text-black/70'>Assigned Users</div>
                                        <UserIcon />
                                    </div>
                                    <div className='flex flex-col gap-0'><div className='text-sm font-bold text-black/70'>Labels</div>
                                    <Label />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <Description />
                            </div>
                        </section>
                        <section className="flex flex-col p-5 w-[400px]">
                            <div className='flex flex-col gap-6'>
                                <Date />
                                <Order />
                                <Actions />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}