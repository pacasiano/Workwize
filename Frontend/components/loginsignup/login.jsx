
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Login({setShowForgotPassword}) {

    Login.propTypes = {
        setShowForgotPassword: PropTypes.func.isRequired
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        }

        fetch('http://localhost:8000/auth/jwt/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => {
            setUsername('')
            setPassword('')
        })
        .catch(err => console.error(err.message))
    };

    

    return (
    <div className="flex justify-start "> 
        <div className="form-container bg-white p-4 rounded-lg shadow-md relative z-10">
        <h2 className="text-center font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
            <label className="font-bold">Username</label>
            <input className="w-72 px-2 py-1 border border-gray-300 rounded"
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div className="mb-4 flex flex-col">
            <label className="font-bold">Password</label>
            <input className="w-72 px-2 py-1 border border-gray-300 rounded"
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div className="flex justify-between mb-2">
            <Link to={"/forgotpassword"} className="bg-transparent rounded border-none">Forgot Password?</Link>
            <button className="px-3 py-2 mb-2 text-center bg-green-500 text-zinc-50 hover:bg-green-500/90 rounded border-gray-100 font-bold" type="submit">Login</button>

            </div>
            <div className="flex justify-center">
            <Link to={"/signup"} className="px-3 py-2 mb-2 bg-green-500 text-zinc-50 hover:bg-green-500/90 rounded border-green-100 font-bold" >SIGN UP</Link>
            </div>
        </form>
        </div>
    </div>
    )
}