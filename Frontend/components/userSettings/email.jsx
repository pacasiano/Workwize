
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {Edit,Cancel} from "../../assets/icons"

import { toast } from 'react-toastify';

const Email = ({user, setUser}) => {

    Email.propTypes = {
        user: PropTypes.object.isRequired,
        setUser: PropTypes.func.isRequired
    };

    const [edit, setEditable] = useState(false)
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        if(data.email === ""){
            toast.error("Email cannot be empty")
            return
        }
        if(data.email === user.email){
            toast.error("No changes made")
            return
        }
        if(!data.email.includes('@')){
            toast.error("Invalid email")
            return
        }

        const accessToken = sessionStorage.getItem('accessToken');
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch(`http://localhost:8000/users/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            toast.success("Email successfully updated")
            setEditable(false)
        })
        
    }


    return (
        <>

        {!edit ? (
        <div className="flex flex-col gap-1 "> 
            <div className='flex flex-col'>
                <div className='flex flex-row justify-start items-center gap-1'>
                    Email <div onClick={()=> setEditable(true)} className='hover:scale-110 cursor-pointer'><Edit input={"16px"} /></div>
                </div>
                <input disabled defaultValue={user.email} className="disabled min-w-52 p-2 outline-neutral-400 rounded-md bg-neutral-100" />
            </div>
        </div>
        ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 "> 
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-start items-center gap-1'>
                        Email <div onClick={()=> setEditable(false)} className='hover:scale-110 cursor-pointer'><Cancel /></div>
                    </div>
                    <input id='input' type="text" placeholder={user.email} {...register("email", {})} className="min-w-52 p-2 outline-neutral-400 rounded-md bg-neutral-100" />
                </div>
                <button type="submit" className="bg-neutral-700/20 hover:bg-neutral-700/40 rounded-md px-2 p-1 w-1/4">Save</button>
            </div>
            </form>
        )}

        </>
    )
}

export default Email;