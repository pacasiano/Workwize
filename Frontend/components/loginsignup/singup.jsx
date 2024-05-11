// SignUpPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUpPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign up logic
    console.log('Signing up with:', email, password, firstName, lastName, username);
  };

  return (
    <>
    <div className="flex justify-start ">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
        <h2 className="text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="font-bold" htmlFor="username">Username</label>
            <input className="w-full px-1 py-1 border border-gray-300 rounded"
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label className="font-bold" htmlFor="firstName">First Name</label>
              <input className="w-full px-1 py-1 border border-gray-300 rounded"
                type="text" 
                id="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="ml-2 flex-1">
              <label className="font-bold" htmlFor="lastName">Last Name</label>
              <input className="w-full px-1 py-1 border border-gray-300 rounded"
                type="text" 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        
          <div className="mb-4">
            <label className="font-bold">Password</label>
            <input className="w-full px-1 py-1 border border-gray-300 rounded"
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-black/10 text-black rounded hover:bg-black/70 border-gray-100 px-4 py-2 mt-4" type="submit">Sign Up</button>
        </form>
        <Link to={"/login"} className="block mt-2 text-center">Return to Login</Link>
      </div>
    </div>
    </>
  );
}

export default SignUpPage;
