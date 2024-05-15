
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Sketch from '@uiw/react-color-sketch';
import { toast } from 'react-toastify';

const Background = () => {

    const { id } = useParams();
    const [project, setProject] = useState({});
    const [edit, setEdit] = useState(false);
    const colors = ['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0']

    // form data
    const [hex, setHex] = useState('');
    const { handleSubmit } = useForm();


    useEffect(() => {

        const accessToken = sessionStorage.getItem('accessToken');
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch(`http://localhost:8000/projects/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setProject(data)
            setHex(data.background)
        });
    }
    , [id]);

    const onSubmit = () => {

        if(hex === undefined){
            toast.warning('Please enter a color');
            return;
        }
        if(hex === ''){
            toast.warning('Please enter a color');
            return;
        }
        if(hex === project.background){
            toast.error('Color is the same');
            return;
        }

        const accessToken = sessionStorage.getItem('accessToken');
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }
        
        fetch(`http://localhost:8000/projects/${id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({background: hex})
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Color updated');
            setProject(data);
            setEdit(false);
        });

    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-row justify-between gap-2">
                <h1 className="text-lg font-semibold">Color</h1>
                <section onClick={()=> setEdit(!edit)} className="flex items-center select-none justify-center text-center rounded-md bg-neutral-200 h-7 px-2 cursor-pointer hover:bg-neutral-400 group">
                    <div className='group-hover:text-white text-black/50 font-light text-sm'>{!edit ? "Edit" : "Cancel"}</div>
                </section>
            </div>

            {/* Editable and non editable */}
            <div className="flex flex-col gap-2">
                {!edit ? (
                <section className='relative flex justify-start items-start w-full'>
                    <div className='relative outline-none border border-black/30 rounded-sm p-5 w-full flex justify-center'>
                        <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[8px] h-1'><div className='-translate-y-[7px] text-sm h-0'>Color</div></div>
                        <div className=" h-28 w-56 text-white bg-neutral-700 hover:bg-neutral-600 rounded-md overflow-hidden" style={{backgroundColor: project.background}}>
                            <div className=" p-5">
                                <div className="flex flex-col gap-2">
                                <div  className="text-xl font-bold">
                                    {project.background}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <section className='relative flex flex-col justify-center items-center pt-5 rounded-sm bg-inherit bg-neutral-200 outline-none border border-black p-2'>
                        <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[8px] h-1'><div className='-translate-y-[7px] text-sm'>Color</div></div>

                            <div className="h-28 w-56 text-white hover:bg-neutral-600 rounded-md overflow-hidden" style={{backgroundColor: hex}}>
                                <div className="p-5">
                                    <div className="flex flex-col gap-2">
                                    <div  className="text-xl font-bold">
                                        {hex}
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <Sketch
                            type="text" placeholder="background"
                            colors={colors}
                            disableAlpha={true}
                            color={hex}
                            onChange={(color) => {setHex(color.hex);}}
                            style={{backgroundColor: "inherit", width: "100%", height: "100%", boxShadow: "none"}}
                            />
                    </section>
                    <input type='submit' className='w-28 h-9 rounded-sm text-black/50 hover:text-black bg-green-500 hover:bg-green-300 cursor-pointer' />
                </div>
                </form>
                )}
                
            </div>
        </div>
    );
}

export default Background;
