
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Starred = () => {

    const { id } = useParams();
    const [project, setProject] = useState({});
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit } = useForm();


    useEffect(() => {
        fetch(`http://localhost:8000/api/projects/${id}/`)
        .then(res => res.json())
        .then(data => setProject(data));
    }
    , [id]);

    const onSubmit = (data) => {
            
            if (data.starred === undefined) return;
            if (data.starred.length < 1) return;
            if (data.starred.length > 25) return;
    
            fetch(`http://localhost:8000/api/projects/${id}/`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setEdit(false);
            });
    
        }

    return (
        <div>
            <div className="flex flex-row justify-between gap-2">
                <h1 className="text-lg font-semibold">Starred</h1>
                <section onClick={()=> setEdit(!edit)} className="flex items-center select-none justify-center text-center rounded-md bg-neutral-200 h-7 px-2 cursor-pointer hover:bg-neutral-400 group">
                    <div className='group-hover:text-white text-black/50 font-light text-sm'>{!edit ? "Edit" : "Cancel"}</div>
                </section>
            </div>

            {/* Editable and non editable */}
            <div className="flex flex-col gap-2">
                {!edit ? (
                <div className="relative ">
                <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Starred</div></div>
                <input defaultValue={project.starred} readOnly className='w-full h-12 rounded-sm bg-inherit outline-none border border-black/30 px-3' />
                </div>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <div className="relative ">
                    <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Starred</div></div>
                    <input {...register('starred')} defaultValue={project.starred} className='w-full h-12 rounded-sm bg-inherit outline-none border border-black/30 px-3' />
                    </div>
                    <button type='submit' className='w-28 h-9 rounded-sm text-white bg-black hover:bg-black/90'>Save</button>
                </div>
                </form>
                )}
            </div>
        </div>
    )
}

export default Starred;
