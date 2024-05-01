import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Selectable from "../components/general/selectable"
import ProjectCard from "../components/general/projectCard"
import Header from "../components/general/header"
import PropTypes from 'prop-types';

export default function Home({loggedIn}) {

    Home.propTypes = {
        loggedIn: PropTypes.bool.isRequired
    };

    // di ito normal, dapat kunin ang user_id somewhere
    const [user_id, setUser_id] = useState(1)

    const [project_ids, setProject] = useState([])
    const [data, setData] = useState([])

    const [selected, setSelected] = useState("projects")
    
    // dapat get all projects where user_id = user_id
    useEffect(() => {
        fetch(`http://localhost:8000/api/user-projects/`)
        .then(res => res.json())
        .then(data => {
            // get all projects where user_id = user_id
            let projects = data.filter(project => project.user_id === user_id)
            setProject(projects)
        });
      }, [user_id])

    // gets all projects where project_id = projects_ids.project_id
    useEffect(() => {
        fetch(`http://localhost:8000/api/projects/`)
        .then(res => res.json())
        .then(data => {
            // get all projects where project_id = projects_ids.project_id (array of objects)
            let projects = data.filter(project2 => project_ids.some(project_id => project_id.project_id === project2.project_id))
            setData(projects)
        });
    }, [project_ids])

    return (
        <div className="flex flex-col min-h-screen bg-[#EBDFD7]">
            <div className="flex flex-row gap-2 pt-32 px-20">
                <div className="flex flex-col gap-5 w-56 h-full drop-shadow-sm">
                    <div className="flex flex-col items-center justify-center gap-5 pr-2 py-5">
                        <button className="transition-all ease-in-out bg-green-500/90 py-3 flex flex-row gap-2 w-10/12 justify-center items-center text-black text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-md">
                            {/* change to create new Project page or modal */}
                            <Link to={"/project"} className="flex flex-row gap-1 text-nowrap" ><div className="-mt-[0.5px]">+</div>New Project</Link>
                        </button>
                        <div className="flex flex-col w-full border-t-2 border-black/40">
                            <div className="pt-2"></div>
                            <Selectable input={"projects"} child={"Projects"} selected={selected} setSelected={setSelected} />
                            <Selectable input={"recents"} child={"Recents"} selected={selected} setSelected={setSelected} />
                            <Selectable input={"starred"} child={"Starred"} selected={selected} setSelected={setSelected} />
                        </div>
                    </div>
                </div>
                <div className="border-l-2 h-11/12 border-black/40 pr-5 "></div>
                <div className="flex flex-row flex-wrap gap-5 py-5">
                    {data.map((data, index) => (
                        <ProjectCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </div>
    )

}