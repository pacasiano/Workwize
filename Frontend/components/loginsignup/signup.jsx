
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {

    if(data.password !== data.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    if(data.username === "" || data.password === "" || data.email === "" || data.first_name === "" || data.last_name === "") {
      toast.error("Please fill in all fields");
      return;
    }
    // password must be at least 8 characters long, atleast 1 capital letter, atleast 1 number, atleast 1 special character
    if(data.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if(!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      toast.error("Password must contain atleast 1 capital letter, 1 number, and 1 special character");
      return;
    }
    if(data.username.length < 2) {
      toast.error("Username must be at least 2 characters long");
      return;
    }
    if(data.email.length < 4) {
      toast.error("Email must be at least 4 characters long");
      return;
    }
    if(data.first_name.length < 2) {
      toast.error("First name must be at least 2 characters long");
      return;
    }
    if(data.last_name.length < 2) {
      toast.error("Last name must be at least 2 characters long");
      return;
    }
    if(data.username.length > 20) {
      toast.error("Username must be less than 20 characters long");
      return;
    }
    if(data.email.length > 50) {
      toast.error("Email must be less than 50 characters long");
      return;
    }
    if(data.first_name.length > 20) {
      toast.error("First name must be less than 20 characters long");
      return;
    }
    if(data.last_name.length > 20) {
      toast.error("Last name must be less than 20 characters long");
      return;
    }
    if(!data.email.includes('@')) {
      toast.error("Please enter a valid email");
      return;
    }

    console.log(data)

    try {
      const res = await fetch('http://localhost:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
        }),
      })
  
      if (!res.ok){
        throw new Error(`Error: ${res.status}`)
      }
  
      const resData = await res.json()
      console.log("Sign up successful!")
      toast.success(`Your account ${data.username} has been created successfully!`);
      navigate("/login");
    }
    catch(error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again later.")

      if (error.response && error.response.status === 400) {
        console.error("Bad Request (400):", error.response.data); // Password too short
        //Should prompt that password is too short or smtg
      }
    }

  }

  return (
    <>
    <div className="flex justify-start ">
      <div className="bg-white p-4 rounded-lg flex flex-col gap-1 max-w-96">
        <h2 className="text-center font-bold text-2xl pb-5">Sign-up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>

              <div className="">
                <label className="font-medium" htmlFor="username">Username</label>
                <input className="w-full px-1 py-1 border border-gray-300 rounded"
                  type="text" 
                  {...register("username", {})}
                />
              </div>

              <div className="">
                <label className="font-medium" htmlFor="username">Email</label>
                <input className="w-full px-1 py-1 border border-gray-300 rounded"
                  type="text" 
                  {...register("email", {})}
                />
              </div>

              <div className=" flex flex-row gap-3">
                <div className="w-1/2">
                  <label className="font-medium" htmlFor="firstName">First Name</label>
                  <input className="w-full px-1 py-1 border border-gray-300 rounded"
                    type="text" 
                    {...register("first_name", {})}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="font-medium" htmlFor="lastName">Last Name</label>
                  <input className="w-full px-1 py-1 border border-gray-300 rounded"
                    type="text" 
                    {...register("last_name", {})}
                    required
                  />
                </div>
              </div>
            
              <div className="">
                <label className="font-medium">Password</label>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-light -mb-1'>Password</label>
                  <input className="w-full px-1 py-1 border border-gray-300 rounded"
                    type="password"  
                    {...register("password", {})}
                    required
                  />
                  <label className='text-xs font-light -mb-1'>Confirm Password</label>
                  <input className="w-full px-1 py-1 border border-gray-300 rounded"
                    type="password"
                    {...register("confirm_password", {})}
                    required
                  />
                </div>
              </div>

            </div>

            <div className='flex flex-row justify-end'>
              <button className="px-3 py-1 self-end mb-2 text-center bg-black/10 text-black rounded hover:bg-black/20 border-gray-100" type="submit">Sign-up</button>
            </div>

          </div>
        </form>
        <div className="flex flex-row gap-1 justify-center text-sm font-light">
            Already have an account? Login
            <Link to={"/login"} className="text-blue-600 hover:text-blue-900 font-normal" >here</Link>!
        </div>
      </div>
    </div>
    </>
  );
}

export default SignUpPage;
