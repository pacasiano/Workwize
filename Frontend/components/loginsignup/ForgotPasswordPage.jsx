import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  ForgotPasswordPage.propTypes = {
    onReturn: PropTypes.string,
  };

  const [email, setEmail] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate forgot password logic
    console.log('Sending password reset email to:', email);
    // Once email is submitted, show the overlay form
    setShowOverlay(true);
  };

  const handleOverlaySubmit = (e) => {
    e.preventDefault();
    // Simulate password reset logic
    console.log('Resetting password to:', newPassword);
    // Reset form and hide overlay
    setEmail('');
    setNewPassword('');
    setShowOverlay(false);
  };

  return (
    <div className="flex justify-center items-center border-none">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Forgot Password</h2>
        <p className="text-sm mb-4">Please enter your email address to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="bg-black/10 text-black rounded hover:bg-black/70 border-gray-100 px-4 py-2" type="submit">
            Reset Password
          </button>
        </form>
        <Link to="/login" className="block mt-2 text-sm text-black">Return to Login</Link>
      </div>
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Enter New Password</h2>
            <form onSubmit={handleOverlaySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button className="bg-black/10 text-black rounded hover:bg-black/70 border-gray-100 px-4 py-2" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
