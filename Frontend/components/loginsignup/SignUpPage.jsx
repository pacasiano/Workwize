// SignUpPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUpPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userData, setUserData] = useState({
    email: "pacasiano@addu.edu.ph",
    username: "pits",
    password: "1022",
    first_name: "Peter Andre",
    last_name: "Casiano",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign up logic
    console.log('Signing up with:', email, password);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
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
          <button type="submit">Sign Up</button>
        </form>
        <Link to={"/login"}>Return to Login</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
