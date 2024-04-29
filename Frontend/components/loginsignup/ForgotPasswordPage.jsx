
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {

  ForgotPasswordPage.propTypes = {
    onReturn: PropTypes.string,
  }; 

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate forgot password logic
    console.log('Sending password reset email to:', email);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Forgot Password</h2>
        <p>Please enter your email address to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <Link to={"/login"} >Return to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
