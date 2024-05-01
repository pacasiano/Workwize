
// import Projects svg file from assets
import Projects from "../assets/homepic.svg"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Landing() {

  return (
    <div className="flex flex-col bg-#FAFBFC">
        <div className="relative top-0  border-b translate-y-[60px]">
            <div className="shrink-0"><object type="image/svg+xml" data={Projects} className="object-cover w-full" alt="HomeBodyPic">Your browser does not support SVG</object></div>
            <div className="absolute flex flex-col justify-start items-start text-left bottom-1/3 ml-44 w-80 -translate-x-5">
              <div className="flex justify-center text-center text-md flex-nowrap">Welcome to <div className="font-mono pl-2">Projects.</div></div>
              <div className="lg:text-5xl/tight md:text-3xl/tight sm:text-2xl/tight text-xl font-bold">Streamline Your Workflow, Simplify Your Life</div>
              <Link to={"/project"} className="bg-black transition-transform opacity-80 mt-2 text-white px-3 py-1 px1 text-md hover:scale-105 rounded-md">Projects <FontAwesomeIcon className="font-thin text-sm" icon={faArrowRight} style={{color: "#fffff",}} /></Link>
            </div>
        </div>

        <div className="px-14">
          
          <div className="flex flex-col z-10 pt-14 pb-14 px-14 bg-white rounded-t-3xl drop-shadow-2xl">
            <div className="flex flex-row justify-around items-center ">
              <div className="flex flex-col gap-5 text-center w-1/2 border-r-[2px]">
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

            <div>
              
            </div>

          </div>
        </div>
      </div>
  )

} 