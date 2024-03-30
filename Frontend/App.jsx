import Sidebar from "./components/sidebar"
import Projects from "./components/project/projects"
import Settings from "./components/setting/settings"
import Dashboard from "./components/dashboard/dashboard"
import { useState } from "react"
import NewProject from "./components/project/newProject"


function App() {

  const [Wide, setWide] = useState(true)
  const [Window, setWindow] = useState("")
  const [showAddProj, setAddProj] = useState(false)

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
                case "Projects":
                  return <Projects />;
                case "Settings":
                  return <Settings />;
                case "Dashboard":
                  return <Dashboard />;
                default:
                  return <Dashboard />;
              }
            })()}
          </div>
        </div>
      </div>
      {showAddProj ? <NewProject setAddProj={setAddProj} /> : null}
    </>
  )
}

export default App
