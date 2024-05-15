
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Login() {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        if(data.username === "" || data.password === "") {
            toast.error("Please fill in all fields");
            return;
        }
        
        fetch('http://localhost:8000/api/users/')
        .then(res => res.json())
        .then(users => {
            console.log(users)
            let userss = users.find(user => user.username === data.username && user.password === data.password);
            if(userss) {
                setUser(userss);
                console.log(user);
                toast.success("Welcome! " + data.username);
                navigate("/")
            } else {
                toast.error("Invalid email or password");
            }
        });
    }

    return (
    <div className="flex justify-start "> 
        <div className="flex flex-col gap-5 bg-white p-4 rounded-lg shadow-md relative z-10 w-96">
        <h2 className="text-center font-bold text-2xl">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex flex-col">
            <label className="font-medium">Email</label>
            <input className="w-full px-2 py-1 border border-gray-300 rounded"
                type="text" 
                id="email" 
                {...register("username", {})}
            />
            </div>
            <div className="mb-4 flex flex-col">
            <label className="font-medium">Password</label>
            <input className="w-full px-2 py-1 border border-gray-300 rounded"
                type="password" 
                id="password" 
                {...register("password", {})}
            />
            </div>
            <div className="flex flex-row items-center justify-between mb-2">
                <Link to={"/forgotpassword"} className="bg-transparent rounded border-none text-sm text-neutral-500 hover:text-neutral-700">Forgot Password?</Link>
                <button className="px-3 py-1 mb-2 text-center bg-black/10 text-black rounded hover:bg-black/20 border-gray-100" type="submit">Login</button>
            </div>
            <div className="flex flex-row gap-1 justify-center text-sm font-light">
                No account yet? sign up
                <Link to={"/signup"} className="text-blue-600 hover:text-blue-900 font-normal" >here</Link>!
            </div>
        </form>
        </div>
    </div>
    )
}