
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const ProjectName = () => {

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
        
        if (data.project_name === undefined){
            toast.warning('Please enter a name');
        }
        if (data.project_name.length < 1){
            toast.warning('Name too short');
            return;
        }
        if (data.project_name.length > 25){
            toast.warning('Name too long');
            return;
        }

        fetch(`http://localhost:8000/api/projects/${id}/`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Project name updated');
            setProject(data);
            setEdit(false);
        });

    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-row justify-between gap-2">
                <h1 className="text-lg font-semibold">Project Name</h1>
                <section onClick={()=> setEdit(!edit)} className="flex items-center select-none justify-center text-center rounded-md bg-neutral-200 h-7 px-2 cursor-pointer hover:bg-neutral-400 group">
                    <div className='group-hover:text-white text-black/50 font-light text-sm'>{!edit ? "Edit" : "Cancel"}</div>
                </section>
            </div>

            {/* Editable and non editable */}
            <div className="flex flex-col gap-2">
                {!edit ? (
                <div className="relative ">
                <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Name</div></div>
                <input defaultValue={project.project_name} readOnly className='w-full h-12 rounded-sm bg-inherit outline-none border border-black/30 px-3' />
                </div>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <div className="relative ">
                        <div className='absolute -top-3 z-50 left-3 bg-[#fbf9f7] translate-y-[9px] h-1'><div className='-translate-y-[7px] text-sm'>Name</div></div>
                        <input type="text" placeholder={project.project_name} {...register("project_name", {})} className='w-full px-3 h-12 resize-none rounded-sm bg-neutral-200 outline-none border border-black' />
                    </div>
                    <input type='submit' className='w-28 h-9 rounded-sm text-black/50 hover:text-black bg-green-500 hover:bg-green-300 cursor-pointer' />
                </div>
                </form>
                )}
                
            </div>
        </div>
    );
}

export default ProjectName;
