
import { useState } from 'react';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';

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
    <div class="flex justify-center items-center h-screen">
      <div class="bg-orange-200 p-4 rounded-lg shadow-md">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label class="font-bold" htmlFor="email">Email</label>
            <input class="w-72 px-2 py-1 border border-gray-300 rounded"
              type="text" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="mb-4">
            <label class="font-bold" htmlFor="password">Password</label>
            <input class="w-72 px-2 py-1 border border-gray-300 rounded"
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <div class="flex justify-between mb-2">
          <button class="bg-transparent rounded hover:bg-orange-100 border-none" onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
          <button class="px-1 py-1 mb-2 bg-orange-100 rounded hover:bg-orange-50 border-gray-100" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
        <button class="px-1 py-1 mb-2 text-center bg-orange-100 rounded hover:bg-orange-50 border-gray-100" type="submit">Login</button>
      </div>
      
      {showSignUp && (
        <div class="fixed justify-center items-center bg-black bg-opacity-50">
          <div class="bg-orange-200 top-0 rounded-lg shadow-md">
            <SignUpPage onReturn={handleReturn} />

          </div>
        </div>
      )}
      {showForgotPassword && (
        <div class="fixed justify-center items-center bg-black bg-opacity-50">
          <div class="bg-orange-200 top-0 rounded-lg shadow-md">
            <ForgotPasswordPage onReturn={handleReturn} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
