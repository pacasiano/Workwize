
// import Projects svg file from assets
import Projects from "../assets/homepic.svg"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Wave from "../assets/wave.svg"

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Landing() {

  const location = useLocation();
  const lastHash = useRef('');


  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [location]);
  
  return (
    // bg-[#e4dede]
    <div className="flex flex-col justify-start bg-[#e4dede]"> 
        <div className="relative top-0 translate-y-[60px]">
            <div className="shrink-0 -translate-y-11"><object type="image/svg+xml" data={Projects} className="object-cover w-full" alt="HomeBodyPic">Your browser does not support SVG</object></div>
            <div className="absolute flex flex-col -translate-y-20 text-black/80 justify-start items-start text-left bottom-1/3 ml-44 w-80 -translate-x-5">
              <div className="flex justify-center text-center text-md flex-nowrap">Welcome to <div className="font-mono pl-2">Workwize.</div></div>
              <div className="lg:text-5xl/tight md:text-3xl/tight sm:text-2xl/tight text-xl font-bold w-96 ">Streamline Your Workflow, Simplify Your Life</div>
              <Link to={"/project"} className="bg-black transition-transform opacity-80 mt-2 text-white px-3 py-1 px1 text-md hover:scale-105 rounded-md">Projects <FontAwesomeIcon className="font-thin text-sm" icon={faArrowRight} style={{color: "#fffff",}} /></Link>
            </div>
        </div>

        <div className="relative">
          <div className="absolute w-full min-w-screen -top-16 sm:-top-32 md:-top-36 lg:-top-44 xl:-top-60 left-0 overflow-hiddenresize-none shrink-0 z-20">
            <img src={Wave} alt="wave" draggable={true} />
          </div>
          <div className="flex flex-col z-10 pt-20 pb-14 px-14  drop-shadow-2xl">
            <div className="flex flex-row justify-around items-center ">
              <div className="flex flex-col gap-5 text-center w-1/2 border-r-[2px] border-black/20">
                <div className="p-10">
                  <div className="text-3xl font-bold">Create Projects</div>
                  <div className="text-md">Create projects and organize your work with ease. Keep track of your projects and tasks with our intuitive dashboard.</div>
                </div>
              </div>
              <div className="flex flex-col gap-5 text-center w-1/2">
                <div className="p-10">
                  <div className="text-3xl font-bold">Task Management</div>
                  <div className="text-md">Create tasks, assign them to team members, and track their progress. Keep your team on track with our task management system.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">

              {/* about */}
              <div className="flex flex-col gap-5 text-center">
                <div className="p-10">
                  <div id="about" className="text-3xl font-bold">About Us</div>
                  <div className="text-md">We are a team of developers who are passionate about creating tools that help people work more efficiently. Our goal is to create software that is intuitive and easy to use.</div>
                </div>
              </div>
              {/* contact */}
              <div className="flex flex-col gap-5 text-center">
                <div className="p-10">
                  <div id="contact" className="text-3xl font-bold">Contact Us</div>
                  <div className="text-md">If you have any questions or feedback, please feel free to contact us. We would love to hear from you!</div>
                </div>
              </div>
              {/* faq */}
              <div className="flex flex-col gap-5 text-center">
                <div className="p-10">
                  <div id="faq" className="text-3xl font-bold">FAQ</div>
                  <div className="text-md">Have a question? Check out our FAQ page for answers to common questions.</div>
                </div>
              </div>
              
            </div>

          </div>
        </div>
      </div>
  )

} 