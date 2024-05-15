
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Login() {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        if (data.username === "" || data.password === "") {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const loginRes = await fetch('http://localhost:8000/login/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: data.username, password: data.password})
            });
            const loginData = await loginRes.json();

            if (loginData.message === 'Login successful') {
                console.log(loginData.user);
            
                const jwtRes = await fetch('http://localhost:8000/auth/jwt/create', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username: data.username, password: data.password})
                })

                const jwtResData = await jwtRes.json();
                const {access, refresh} = jwtResData;

                if (access) {
                    sessionStorage.setItem('accessToken', access);
                }
                console.log(jwtResData)
                setUser(loginData.user)
                console.log(user)
                toast.success("Welcome! " + data.username);
                navigate("/");
                // window.location.href = "http://localhost:5173"
            } 
            else {
                toast.error("Invalid username or password");
            }
        } 
        catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
    <div className="flex justify-start "> 
        <div className="flex flex-col gap-5 bg-white p-4 rounded-lg shadow-md relative z-10 w-96">
        <h2 className="text-center font-bold text-2xl">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex flex-col">
            <label className="font-medium">Username</label>
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