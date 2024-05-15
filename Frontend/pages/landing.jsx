
// import Projects svg file from assets
import Projects from "../assets/homepic.svg"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Wave from "../assets/wave.svg"
import { Mail, Location, Phone } from "../assets/icons";
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import pit from "../assets/pit.jpg";
import mizkhalifa from "../assets/mizkhalifa.jpg";
import horus from "../assets/horus.jpg";
import { useState } from 'react';


export default function Landing() {

  const location = useLocation();
  const lastHash = useRef('');
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);


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
            <img src={Wave} alt="wave" draggable={false} />
          </div>
          <div className="flex flex-col z-10 pt-20 pb-14 px-14 gap-20 drop-shadow-2xl">

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

            <div className="flex flex-col gap-20">
            {/* About */}
              <div className="flex flex-row gap-0 relative h-48 justify-start">
                  <div id="about" className="text-3xl/[11] font-bold text-center h-48 w-48 border-black/20 border-0 border-b-[2px] -rotate-90 ">About Us</div>
                  <div className="relative text-md text-justify w-80 p-10 h-full flex items-center before:content-[''] before:absolute before:right-0 before:top-0 before:h-full before:w-[2px] before:bg-black/20">We are PitFafall, Mizkhalifa, & WHorus a team of developers who are passionate about creating tools that help people work more efficiently. Our goal is to create software that is intuitive and easy to use.</div>
                  <div className="border-black/20 h-full w-96 text-center flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <img src={pit} alt="Person 1" className="w-24 h-24 object-cover rounded-full mb-2"/>
                        <span>PitFafall</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={mizkhalifa} alt="Person 2" className="w-24 h-24 object-cover rounded-full mb-2"/>
                        <span>Mizkhalifa</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={horus} alt="Person 3" className="w-24 h-24 object-cover rounded-full mb-2"/>
                        <span>WHorus</span>
                      </div>
                    </div>
                  </div>
              </div>
  
            {/* FAQ */}
              <div className="flex flex-row gap-0 relative h-48 justify-end">
                  <div className= "items-justify">
                    <div className="text-center grid grid-col item-center justify-center gap-1 pr-32 pt-10">
                      <button onClick={() => setDropdown1(!dropdown1)} className="font-bold text-md">
                        What is the reason behind the making of this website?
                      </button>
                      {dropdown1 && (
                        <div className="text-sm text-justify">
                          <p>The reason behind the making of this website is solely because it is an elective project.</p>
                          <p>It is also made so that students or even other programmers can organize their tasks properly using this website</p>
                        </div>
                      )}

                      <button onClick={() => setDropdown2(!dropdown2)} className="font-bold text-md">
                        Who made this website?
                      </button>
                      {dropdown2 && (
                        <div className="text-sm w-96 text-justify">
                          <p>Frontend was made by Peter Casiano aka PitFafall with his apprentice Julian Remoreras aka WHorus.</p>
                          <p>Backend was handled by Anthony Yap.</p>
                        </div>
                      )}

                      <button onClick={() => setDropdown3(!dropdown3)} className="font-bold text-md">
                        What is the purpose of this system?
                      </button>
                      {dropdown3 && (
                        <div className="text-sm">
                          <p>To help users to organize their tasks or work properly</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="relative text-md text-justify w-80 p-10 h-full flex items-center before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-black/20">Have a question? Check out our FAQ page for answers to common questions.</div>
                  <div id="faq" className="text-3xl/[11] font-bold text-center h-48 w-48 border-black/20 border-0 border-b-[2px] rotate-90 ">FAQ</div>
            </div>
  
            {/* Contact */}
            <div className="flex flex-row gap-0 relative h-48 justify-start">
              <div id="contact" className="text-3xl/[11] font-bold text-center h-48 w-48 border-black/20 border-0 border-b-[2px] -rotate-90">Contact Us</div>
              <div className="relative text-md text-justify w-80 p-10 pt-5 h-full flex items-center before:content-[''] before:absolute before:right-0 before:top-0 before:h-full before:w-[2px] before:bg-black/20">If you have any questions or feedback, please feel free to contact us. We would love to hear from you!</div>
              <div className="border-black/20 h-full w-96 text-center flex flex-col items-justify space-y-4 p-4 pl-20">
                <div className="flex items-center space-x-2">
                  <Location />
                  <span>1234 Street Name, City, State</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail />
                  <span>email@example.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone />
                  <span>(123) 456-7890</span>
                </div>
              </div>
            <div></div> 
            </div>

          </div>
          </div>
        </div>
      </div>
  )

} 