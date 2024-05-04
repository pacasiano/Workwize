
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function Description() {

    Description.propTypes = {
        desc: PropTypes.string
    }

    const { subtask_id } = useParams();
    const [desc, setDesc] = useState();
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    useEffect(() => {
    fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`)
    .then(res => res.json())
    .then(data => setDesc(data.description));
    }, [subtask_id]);

    const onSubmit = (data) => {
            
        if (desc === undefined) return;
        if (desc.length === 0) return;
        console.log(errors)
        console.log(data)

        fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setDesc(data.description);
            setEdit(false);
        });
        
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-row justify-between gap-2">
                <h1 className="text-lg font-semibold">Description</h1>
                <section onClick={()=> setEdit(!edit)} className="flex items-center select-none justify-center text-center rounded-md bg-neutral-200 h-7 px-2 cursor-pointer hover:bg-neutral-400 group">
                    <div className='group-hover:text-white text-black/50 font-light text-sm'>{!edit ? "Edit" : "Cancel"}</div>
                </section>
            </div>

            {/* Editable and non editable */}
            <div className="flex flex-col gap-2">
                {!edit ? (
                <div className="relative ">
                    <div className='absolute -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Description</div></div>
                    <textarea disabled={true} value={desc} className='w-full p-5 h-60 resize-none rounded-sm bg-inherit outline-none border border-black/30' />
                </div>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col'>
                <div className="relative ">
                    <div className='absolute -top-3 z-50 left-3 bg-[#fbf9f7] translate-y-[9px] h-1'><div className='-translate-y-[7px] text-sm'>Description</div></div>
                    <textarea type="text" placeholder="description" {...register("description", {})} className='w-full p-5 h-60 resize-none rounded-sm bg-neutral-200 outline-none border border-black' />
                </div>
                <input type='submit' className='w-28 h-9 rounded-sm text-black/50 hover:text-black bg-green-500 hover:bg-green-300 cursor-pointer' />
                </div>
                </form>
                )}
                
            </div>

        </div>
    )
}