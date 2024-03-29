import Topbar from "./topbar"
import ProjectCard from "./projectCard"
import { useState } from "react"

export default function Projects() {

    const [data, setData] =  useState([
    {
    name: "tae",
    desc: "hays description numero uno",
    },
    {
    name: "tae2",
    desc: "hays description2",
    },
    {
    name: "tae3",
    desc: "hays description3",
    },
    {
    name: "tae4",
    desc: "hays description4",
    },
    {
    name: "tae5",
    desc: "hays description5",
    },
    {
    name: "tae6",
    desc: "hays description6",
    },
    {
    name: "tae7",
    desc: "hays description7",
    }
    ])

    return (
        <div>
            <Topbar setTitle={"Projects"} />
            <div className="w-full h-full p-10">
                <div className="flex flex-wrap gap-5 ">
                    {
                        data.map((item, index) => (
                            <ProjectCard key={index} data={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}