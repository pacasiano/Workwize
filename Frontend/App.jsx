import Sidebar from "./components/sidebar"
import Projects from "./components/projects"
import Settings from "./components/settings"
import Dashboard from "./components/dashboard"
import { useState } from "react"


function App() {

  const [Wide, setWide] = useState(true)
  const [Window, setWindow] = useState("")


  return (
    <>
      <div className="h-screen w-full">
        <div className="flex flex-row h-full">
          <div className={`  h-full transition-all`}>
            <Sidebar Wide={Wide} setWide={setWide} setWindow={setWindow} />
          </div>

          <div className="w-full h-full bg-green-100">
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
    </>
  )
}

export default App
