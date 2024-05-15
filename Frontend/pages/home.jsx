
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Selectable from "../components/project/selectable"
import ProjectCard from "../components/project/projectCard"

// Context Imports
import { ReloadContext } from "../context/contexts"
import { useContext } from 'react';
import { UserContext } from "../context/userContext";

export default function Home({setAddProj}) {

    Home.propTypes = {
        setAddProj: PropTypes.func,
    };

    // context
    const { reload } = useContext(ReloadContext);
    const { user } = useContext(UserContext);

    // di ito normal, dapat kunin ang user_id somewhere
    const [user_id] = useState(user.user_id)

    const [project_ids, setProjectIds] = useState([])
    const [projects, setProjects] = useState([])

    const [selected, setSelected] = useState("projects")
    
    // dapat get all projects where user_id = user_id
    useEffect(() => {
        const fetchUserProjs = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/user-projects/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching user-projects inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            // get all projects where user_id = user_id
            let projects = data.filter(project => project.user_id === user_id)
            console.log('i am proojects')
            console.log(projects)
            setProjectIds(projects)
          } catch (error) {
            console.error('Error fetching user-projects in catch block: ', error);
          }
        };
      
        fetchUserProjs();
      }, [user_id, reload]);

    // gets all projects where project_id = projects_ids.project_id
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/projects/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
            
            if (!response.ok) {
              throw new Error(`Error fetching projects inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            // get all projects where project_id = projects_ids.project_id (array of objects)
            const filteredProjects = data.filter(project2 =>
              project_ids.some(project_id => project_id.project_id === project2.project_id)
            );
            setProjects(filteredProjects);
          } catch (error) {
            console.error('Error fetching projects in catch block: ', error);
          }
        };
        fetchProjects();
    }, [project_ids, reload]);

    const addProject = () => {
        console.log("clicked Add Project")
        setAddProj({show: true, data: {}})
    }

    return (
        <div className="py-28 px-16 min-h-screen bg-[#e4dede]">
            <div className="flex flex-row gap-2 p-5 min-h-96 backdrop-blur-sm drop-shadow bg-white/50 rounded-xl min-w-[800px] ">
                <div className="flex flex-col gap-5 min-w-56 h-full drop-shadow-sm ">
                    <div className="flex flex-col items-center justify-center gap-5 pr-2 py-5">
                        <button className="transition-all ease-in-out bg-green-500/90 py-3 flex flex-row gap-2 w-10/12 justify-center items-center text-black text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-md">
                            {/* change to create new Project page or modal */}
                            <div onClick={addProject} className="flex flex-row gap-1 text-nowrap" ><div className="-mt-[0.5px]">+</div>New Project</div>
                        </button>
                        <div className="flex flex-col w-full border-t-2 border-black/10">
                            <div className="pt-2"></div>
                            <Selectable input={"projects"} child={"Projects"} selected={selected} setSelected={setSelected} />
                            {/* <Selectable input={"recents"} child={"Recents"} selected={selected} setSelected={setSelected} /> */}
                            <Selectable input={"starred"} child={"Starred"} selected={selected} setSelected={setSelected} />
                        </div>
                    </div>
                </div>
                <div className="border-l-2 h-11/12 border-black/10 pr-5 "></div>
                <div className="flex flex-row flex-wrap gap-5 py-5">
                    {selected === "projects" && ( <>
                    {projects.sort((a, b) => a.project_id - b.project_id).map((item, index) => (
                        <ProjectCard key={index} data={item} />
                    ))}
                    </>)}
                    {selected === "recents" && ( <>
                    {projects.sort((a, b) => a.project_id - b.project_id).map((item, index) => (
                        <ProjectCard key={index} data={item} />
                    ))}
                    </>)}
                    {selected === "starred" && ( <>
                    {projects.sort((a, b) => a.project_id - b.project_id).filter(item => item.isStarred).map((item) => (
                    <ProjectCard key={item.project_id} data={item} />
                    ))}
                    </>)}
                    <div onClick={addProject} >
                        <ProjectCard data={{isStarred: false}} type={1} />
                    </div>
                </div>
            </div>
        </div>
    )

}