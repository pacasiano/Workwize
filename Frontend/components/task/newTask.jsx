import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Sketch from '@uiw/react-color-sketch';

//context imports
import { ReloadContext } from '../../context/contexts';
import { useContext } from 'react';

import { toast } from 'react-toastify';

export default function NewTask({setAddTask}) {

    NewTask.propTypes = {
        setAddTask: PropTypes.func,
    };

    const { id } = useParams();

    // context
    const { reload, setReload } = useContext(ReloadContext);

    // form
    const { register, handleSubmit } = useForm();
    const [hex, setHex] = useState('');
    const colors = ['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0']

    const onSubmit = (data) => {

        if (data.task_name === undefined) {toast.warning("List name is undefined"); return;}
        if (data.task_name.length < 1) {toast.warning("List name is too short"); return;}
        if (data.task_name.length > 25) {toast.warning("List name is too long"); return;}
        if (hex === undefined) {toast.warning("Color is undefined"); return;}
        if (hex.length < 1) {toast.warning("Please select a color"); return;}
        if (hex.length > 7) {toast.warning("Please select a color"); return;}

        const accessToken = sessionStorage.getItem('accessToken');
      
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch('http://localhost:8000/tasks/', {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                project_id: parseInt(id),
                task_name: data.task_name,
                color: hex
            })
        }).then(res => res.json())
        .then(newTask => {
            toast.success(`List ${newTask.task_name} has been created successfully!`);
            setAddTask({ show: false, data: {} });
            setReload(!reload);
            console.log("This is the data from task creation" + newTask)
        })

    };

    return (    
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-90 focus:outline-none select-none">
        <div className="relative bg-white rounded-xl w-96 px-10 py-6 flex flex-col gap-1">
            <h1 className="text-xl font-bold pb-2">New Task</h1>
            <section className='flex flex-col w-full'>
                <div onClick={()=> setAddTask({ show: false, data: {} })} className="absolute top-4 right-4 hover:cursor-pointer">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-black/60 text-xl" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3 w-full'>
                        <section className="relative ">
                            <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm h-0'>Task Name</div></div>
                            <input type="text" placeholder='task name' id='name' {...register("task_name", {required: true, max: 25, min: 1})} className='w-full h-11 rounded-sm bg-inherit outline-none border border-black/30 px-3' />
                        </section>
                        <section className='relative rounded-sm bg-inherit outline-none border border-black/30 p-2'>
                        <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Color</div></div>
                            <Sketch
                            type="text" placeholder="color"
                            colors={colors}
                            disableAlpha={true}
                            color={hex}
                            onChange={(color) => {setHex(color.hex);}}
                            style={{backgroundColor: "inherit", width: "100%", height: "100%", boxShadow: "none"}}
                            />
                        </section>
                        <input type='submit' defaultValue={"Add Project"} className='w-28 text-center h-9 rounded-sm text-black/50 hover:text-neutral-200 bg-green-500 hover:bg-green-700 cursor-pointer' />
                    </div>
                </form>
            </section>
        </div>
    </div>
    )
}