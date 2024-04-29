
import { useState } from "react"
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Sidebar from "./components/general/sidebar"
import Tasks from "./components/task/tasks"
import Settings from "./components/functionalities/settings"
import Dashboard from "./components/dashboard/dashboard"
import NewTask from "./components/task/newTask"
import Calendar from "./components/calendar/calendar"
import Task from "./components/task/task"
import Project from "./data/Project"

import Landing from './components/general/landing.jsx'
import Home from './components/general/home.jsx'
import SpinnerOfDoom from "./components/general/spinnerOfDoom"
import Error404 from "./components/general/error404.jsx";


function App() {

  const [Wide, setWide] = useState(true)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [chosenProj, setChosenProj] = useState("")

  // get the project where href is /projectID
  const [projectInfo, setProjectInfo] = useState(Project[0])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <div>404</div>,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/project",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Tasks  setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo}  />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/tasks",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Tasks  setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo}  />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/settings",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Settings />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      ),
      errorElement: <div>404</div>,
    },
    {
      path: "/project/tasks/task",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Task data={chosenProj} />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/dashboard",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Dashboard />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/calendar",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Calendar  setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo} />;
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
  ]);
  

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
