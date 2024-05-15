
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {Edit,Cancel} from "../../assets/icons"

import { toast } from 'react-toastify';

const Password = ({user, setUser}) => {

    Password.propTypes = {
        user: PropTypes.object.isRequired,
        setUser: PropTypes.func.isRequired
    };

    const [edit, setEditable] = useState(false)
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        // password strenth check
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(data.password)){
            toast.info("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters")
            return
        }
        if(data.password === ""){
            toast.error("Password cannot be empty")
            return
        }
        if(data.password === user.password){
            toast.error("No changes made")
            return
        }
        if (data.password.length < 8){
            toast.error("Password must be at least 8 characters")
            return
        }
        if (data.password === user.username){
            toast.error("Password cannot be the same as username")
            return
        }
        if (data.password !== data.confirm_password){
            toast.error("Passwords do not match")
            return
        }

        const accessToken = sessionStorage.getItem('accessToken');
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch(`http://localhost:8000/users/${parseInt(user.user_id)}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: data.password
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            toast.success("Password successfully updated")
            setEditable(false)
        })
        
    }


    return (
        <>

        {!edit ? (
        <div className="flex flex-col gap-1 "> 
            <div className='flex flex-col'>
                <div className='flex flex-row justify-start items-center gap-1'>
                    Password <div onClick={()=> setEditable(true)} className='hover:scale-110 cursor-pointer'><Edit input={"16px"} /></div>
                </div>
                <input disabled defaultValue={"******"} className="disabled min-w-52 p-2 outline-neutral-400 rounded-md bg-neutral-100" />
            </div>
        </div>
        ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 "> 
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-start items-center gap-1'>
                        Password <div onClick={()=> setEditable(false)} className='hover:scale-110 cursor-pointer'><Cancel /></div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <input type="password" placeholder={"password"} {...register("password", {})} className="min-w-52 p-2 outline-neutral-400 rounded-md bg-neutral-100" />
                        <input type="password" placeholder={"confirm password"} {...register("confirm_password", {})} className="min-w-52 p-2 outline-neutral-400 rounded-md bg-neutral-100" />
                    </div>
                </div>
                <button type="submit" className="bg-neutral-700/20 hover:bg-neutral-700/40 rounded-md px-2 p-1 w-1/4">Save</button>
            </div>
            </form>
        )}

        </>
    )
}

export default Password;