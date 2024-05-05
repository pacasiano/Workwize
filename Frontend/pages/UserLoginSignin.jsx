
import SignUpPage from '../components/loginsignup/singup';
import ForgotPasswordPage from '../components/loginsignup/ForgotPasswordPage';
import Project from "../assets/homepic.svg";
import Login from "../components/loginsignup/login";
import { useLocation } from 'react-router-dom';

function UserLoginSignin() {

  const { pathname } = useLocation();

  return (
    <div className='flex flex-col h-ful'>

        <div className='relative '>
          <div className="shrink-0"><object type="image/svg+xml" data={Project} className="object-cover w-full" alt="HomeBodyPic">Your browser does not support SVG</object></div>
        </div>

        <div className='absolute flex justify-start pl-40 h-full items-center'>
        {pathname === "/signup" &&
        <div className=" flex justify-start items-center z-20  ">
          <SignUpPage />
        </div>
        }
        {pathname === "/login" &&
        <div className="relative flex justify-start gap-5 items-center z-20 h-full">
          <Login />
        </div>
        }
        {pathname === "/forgotpassword" &&
        <div className="flex justify-start items-center h-full z-20 left-96 ">
          <div className="bg-white rounded-lg">
            <ForgotPasswordPage />
          </div>
        </div>
        }
        </div>

      
    </div>
  );
}

export default UserLoginSignin;
