import Topbar from "../topbar"
import ProjectCard from "./projectCard"
import { useState } from "react"

export default function Projects() {

    const [data, setData] =  useState([
    {
    name: "FullStack",
    desc: "Gawa ng mga very important na bagay",
    created: "2024-01-8",
    states: [{word: "complete",color: "#10B981"},{word: "trashed",color: "#EF4444"},{word: "doing",color: "#3B82F6"}],
    deadline: "2024-05-05",

    },
    {
    name: "tae mo mabaho",
    desc: "hays Ito nanaman tayo",
    created: "2021-10-10",
    states: [{word: "complete",color: "#10B981"}],
    deadline: "2025-12-22",
    },
    ])

    return (
        <div>
            <Topbar setTitle={"Projects"} />
            <div className="w-full h-full p-10">
                <div className="flex flex-wrap gap-5 ">
                    {
                        data.map((project, index) => (
                            <ProjectCard key={index} data={project} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}