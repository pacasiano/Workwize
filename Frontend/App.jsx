import Sidebar from "./components/general/sidebar"
import Tasks from "./components/task/tasks"
import Settings from "./components/functionalities/settings"
import Dashboard from "./components/dashboard/dashboard"
import { useState } from "react"
import NewTask from "./components/task/newTask"
import Calendar from "./components/calendar/calendar"
import Task from "./components/task/task"
import Project from "./data/Project"

function App() {

  fetch('http://127.0.0.1:8000/api/users/')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => {
      console.error('There was an error ' + err)
    })

  const [Wide, setWide] = useState(true)
  const [Window, setWindow] = useState("")
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [chosenProj, setChosenProj] = useState("")
  
  const [projectInfo, setProjectInfo] = useState(Project[0])

  return (
    <>
      <div className="min-h-screen w-full select-none">
        <div className="flex flex-row min-h-screen">
          <div className={` min-h-screen transition-all will-change-scroll`}>
            <Sidebar Wide={Wide} setWide={setWide} setWindow={setWindow} setAddProj={setAddProj} />
          </div>

          <div className=" w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth ">
            {(() => {
              switch (Window) {
                case "Tasks":
                  return <Tasks setWindow={setWindow} setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo}  />;
                case "Settings":
                  return <Settings />;
                case "Task":
                  return <Task data={chosenProj} />;
                case "Dashboard":
                  return <Dashboard />;
                case "Calendar":
                  return <Calendar setWindow={setWindow} setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo} />;
                default:
                  return <Tasks setWindow={setWindow} setChosenProj={setChosenProj} projectInfo={projectInfo} setAddProj={setAddProj} />;
              }
            })()}
          </div>
        </div>
      </div>
      {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
    </>
  )
}

export default App
