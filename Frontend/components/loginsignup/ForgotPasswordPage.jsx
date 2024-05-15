
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function ForgotPasswordPage() {

  const [recentlySent, setRecentlySent] = useState(false);

  const [count , setCount] = useState(60);

  const lowerCount = () => {
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        setCount(prevCount => prevCount - 1);
      }, i * 1000);
    }
  }

  const sent = () => {  
    setCount(60);
    lowerCount()
    setRecentlySent(true);
    setTimeout(() => {
      setRecentlySent(false);
    }, 60000);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {

    if(data.email === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if(data.email.length < 4) {
      toast.error("Email must be at least 4 characters long");
      return;
    }
    if(data.email.length > 50) {
      toast.error("Email must be less than 50 characters long");
      return;
    }
    if(!data.email.includes('@')) {
      toast.error("Invalid email address");
      return;
    }

    sent()
    toast.success("Password reset link sent to your email address");

  }

  return (
    <div className="flex justify-center items-center border-none">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Forgot Password</h2>
        <p className="text-sm text-neutral-600 mb-4">Enter your registered Email Address to reset password.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              id="email"
              {...register("email", {})}
              required
            />
          </div>
          {recentlySent && <p className="text-sm text-neutral-600">Password reset link sent to your email address</p>}
          {recentlySent && <p className="text-sm text-neutral-600">New code in {count} seconds. </p>}
          {recentlySent && 
          <button disabled className="px-3 cursor-not-allowed py-1 self-end mb-2 text-center bg-black/10 text-black/10 rounded border-gray-100" type="submit">Reset Password</button>
          } 
          {!recentlySent &&
          <button className="px-3 py-1 self-end mb-2 text-center bg-black/10 text-black rounded hover:bg-black/20 border-gray-100" type="submit">Reset Password</button>
          }

        </form>
        <Link to="/login" className="block mt-2 text-sm  text-neutral-500 hover:text-neutral-900">Go back</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
