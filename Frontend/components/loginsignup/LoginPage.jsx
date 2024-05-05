import { useState } from 'react';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import Project from "../../assets/homepic.svg";

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleReturn = () => {
    setShowSignUp(false);
    setShowForgotPassword(false);
  };

  return (
    <>
      {/* Background Container */}
      <div className="background-container">
        <img src={Project} className="absolute inset-0 object-cover w-full h-full" alt="Background" />
      </div>

      {/* Form Container */}
      <div className="bg-[#EBDFD7] flex justify-start items-center h-screen pl-20"> 
        <div className="form-container bg-white p-4 rounded-lg shadow-md relative z-10">
          <h2 className="text-center font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
              <label className="font-bold" htmlFor="email">Email</label>
              <input className="w-72 px-2 py-1 border border-gray-300 rounded"
                type="text" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="font-bold" htmlFor="password">Password</label>
              <input className="w-72 px-2 py-1 border border-gray-300 rounded"
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between mb-2">
              <button className="bg-transparent rounded border-none" onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
              <button className="px-1 py-1 mb-2 text-center bg-black/10 text-black rounded hover:bg-black/70 border-gray-100" type="submit">Login</button>
              
            </div>
            <div className="flex justify-center">
              <button className="px-1 py-1 mb-2 bg-black/10 text-black rounded hover:bg-black/70 border-gray-100" onClick={() => setShowSignUp(true)}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      {/* Conditionally Rendered Modals */}
      {showSignUp && (
        <div className="fixed flex justify-start items-center inset-0 z-20 pl-20">
          <div className="bg-white rounded-lg">
            <SignUpPage onReturn={handleReturn} />
          </div>
        </div>
      )}
      {showForgotPassword && (
        <div className="fixed flex justify-start items-center inset-0 z-20 pl-12 ">
          <div className="bg-white rounded-lg">
            <ForgotPasswordPage onReturn={handleReturn} />
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
