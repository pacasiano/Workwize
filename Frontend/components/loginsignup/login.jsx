
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Login({setShowForgotPassword}) {

    Login.propTypes = {
        setShowForgotPassword: PropTypes.func.isRequired
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    

    return (
    <div className="flex justify-start "> 
        <div className="form-container bg-white p-4 rounded-lg shadow-md relative z-10">
        <h2 className="text-center font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
            <label className="font-bold">Email</label>
            <input className="w-72 px-2 py-1 border border-gray-300 rounded"
                type="text" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="px-1 py-1 mb-2 text-center bg-black/10 text-black rounded hover:bg-black/70 border-gray-100" type="submit">Login</button>
            
            </div>
            <div className="flex justify-center">
            <Link to={"/signup"} className="px-1 py-1 mb-2 bg-black/10 text-black rounded hover:bg-black/70 border-gray-100" >Sign Up</Link>
            </div>
        </form>
        </div>
    </div>
    )
}