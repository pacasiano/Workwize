
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import Compact from '@uiw/react-color-compact';
import { useState } from 'react';
import Sketch from '@uiw/react-color-sketch';

//context imports
import { ReloadContext } from '../../context/contexts';
import { useContext } from 'react';

import { toast } from 'react-toastify';

export default function NewProject({setAddProj}) {

    NewProject.propTypes = {
        setAddProj: PropTypes.func,
    };

    // context
    const { reload, setReload } = useContext(ReloadContext);

    // form
    const { register, handleSubmit } = useForm();
    const [hex, setHex] = useState('');

    // data
    const [user_id] = useState(1)
    const colors = ['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0']
    const [name, setName] = useState('')

    // Create a new project
    const onSubmit = (data) => {
        if (data.project_name === undefined){toast.warning('Project name is empty');return;}
        if (data.project_name.length < 1){toast.warning('Project name is empty'); return;}
        if (data.project_name.length > 25) {toast.warning('Project name is too long'); return;}
        if (hex === undefined){toast.warning('Color is empty'); return;}
        if (hex.length < 1){toast.warning('Color is empty, please select a color'); return;}
        if (hex.length > 7){toast.warning('Color is too long'); return;}
        if (hex === ""){toast.warning('Color is invalid'); return;}

        fetch('http://localhost:8000/api/projects/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                project_name: data.project_name,
                background: hex,
                isStarred: false
            })
        })
        .then(res => res.json())
        .then(newProj => {
            setAddProj({ show: false, data: {} });
            linkUser(newProj.project_id);
            console.log("This is the data from project creation" + newProj)
            toast.success(`Project ${newProj.project_name} has been created successfully!`);
        })
        .catch(err => console.error(err));
    }

    // Link the user to the project
    const linkUser = (project_id) => {
        
        if (project_id === '') return;

        fetch(`http://localhost:8000/api/user-projects/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: parseInt(user_id),
                project_id: parseInt(project_id),
                role: "owner"
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("This is the data linking the acc to the project" + data)
            setReload(!reload);
        })
        .catch(err => console.error(err));
        
    }

    return (
    <div className="justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-90 focus:outline-none select-none">
        <div className="relative bg-white rounded-xl w-96 px-10 py-6 flex flex-col gap-1">
            <h1 className="text-xl font-bold pb-5">New Project</h1>
            <section className='flex flex-col w-full'>
                <div onClick={()=> setAddProj({ show: false, data: {} })} className="absolute top-4 right-4 hover:cursor-pointer">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-black/60 text-xl" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3 w-full'>
                        <section className="relative ">
                            <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm h-0'>Project Name</div></div>
                            <input type="text" id='name' {...register("project_name", {})} onChange={(e) => {setName(e.target.value)}} className='w-full h-11 rounded-sm bg-inherit outline-none border border-black/30 px-3' />
                        </section>
                        <section className='relative rounded-sm bg-inherit outline-none border border-black/30 p-2'>
                        <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Color</div></div>
                            <Sketch
                            type="text" placeholder="background"
                            colors={colors}
                            disableAlpha={true}
                            color={hex}
                            onChange={(color) => {setHex(color.hex);}}
                            style={{backgroundColor: "inherit", width: "100%", height: "100%", boxShadow: "none"}}
                            />
                        </section>
                        <section className='relative flex justify-start items-start w-full'>
                            <div className='relative outline-none border border-black/30 rounded-sm p-5 w-full flex justify-center'>
                                <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm h-0'>Sample Project Card</div></div>
                                <div className=" h-28 w-56 text-white bg-neutral-700 hover:bg-neutral-600 rounded-md overflow-hidden" style={{backgroundColor: hex}}>
                                    <div className=" p-5">
                                        <div className="flex flex-col gap-2">
                                        <div  className="text-xl font-bold">
                                            {name}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <input type='submit' defaultValue={"Add Project"} className='w-28 text-center h-9 rounded-sm text-black/50 hover:text-neutral-200 bg-green-500 hover:bg-green-700 cursor-pointer' />
                    </div>
                </form>
            </section>
        </div>
    </div>
    )
}