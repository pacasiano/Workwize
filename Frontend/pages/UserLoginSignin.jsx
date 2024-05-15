
import SignUpPage from '../components/loginsignup/singup';
import ForgotPasswordPage from '../components/loginsignup/ForgotPasswordPage';
import Project from "../assets/homepic.svg";
import Login from "../components/loginsignup/login";
import { useLocation } from 'react-router-dom';

function UserLoginSignin() {

  const { pathname } = useLocation();

  return (
    <div className='flex flex-col min-h-screen relative'>

          <div className="w-full min-h-screen overflow-hidden resize-none shrink-0 border-2">
            <img
              src={Project}
              className="object-cover w-full min-h-screen resize-none shrink-0"
              alt="HomeBodyPic"
            ></img>
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
