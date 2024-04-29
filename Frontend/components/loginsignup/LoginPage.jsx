
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
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <div className="ForgotnSign">
          <button className="forgot" onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
          <button className="signup" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
        <button className="login" type="submit">Login</button>
      </div>
      
      {showSignUp && (
        <div className="overlay">
          <div className="overlay-content">
            <SignUpPage onReturn={handleReturn} />

          </div>
        </div>
      )}
      {showForgotPassword && (
        <div className="overlay">
          <div className="overlay-content">
            <ForgotPasswordPage onReturn={handleReturn} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
