import Sidebar from "./components/general/sidebar"
import Tasks from "./components/task/tasks"
import Settings from "./components/functionalities/settings"
import Dashboard from "./components/dashboard/dashboard"
import { useState } from "react"
import NewTask from "./components/task/newTask"
import Calendar from "./components/calendar/calendar"
import Task from "./components/task/task"
import data from "./data"

function App() {

  const [Wide, setWide] = useState(true)
  const [Window, setWindow] = useState("")
  const [showAddProj, setAddProj] = useState(false)
  const [chosenProj, setChosenProj] = useState("")

  return (
    <>
      <div className="h-screen w-full select-none">
        <div className="flex flex-row h-full">
          <div className={`  h-full transition-all`}>
            <Sidebar Wide={Wide} setWide={setWide} setWindow={setWindow} setAddProj={setAddProj} />
          </div>

          <div className="w-full h-full bg-orange-50">
            {(() => {
              switch (Window) {
                case "Tasks":
                  return <Tasks setWindow={setWindow} setChosenProj={setChosenProj} data={data} />;
                case "Settings":
                  return <Settings />;
                case "Task":
                  return <Task data={chosenProj} />;
                case "Dashboard":
                  return <Dashboard />;
                case "Calendar":
                  return <Calendar data={data} setWindow={setWindow} setChosenProj={setChosenProj} />;
                default:
                  return <Tasks setWindow={setWindow} setChosenProj={setChosenProj} data={data} />;
              }
            })()}
          </div>
        </div>
      </div>
      {showAddProj ? <NewTask data={data} setAddProj={setAddProj} /> : null}
    </>
  )
}

export default App
