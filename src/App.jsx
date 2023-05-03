import "./App.css"
import ProcessView from "./components/ProcessView"
import callingFork from "./blocks/callingFork"
import ProcessCard from "./components/ProcessCard"
import { useState } from "react"

const App = () => {
  const [terminalOut, setTerminalOut] = useState([])
  const [processes, setProcesses] = useState([
    { 
      pid: 1,
      startup: true,
      scriptName: "testingFork",
      fileName: "p1.c",
      returnFromFork: "N/A",
    }
  ])
  return(
    <>
      <div className="split">
      <div className="left">
        <ProcessView codeBlocks={[callingFork(setTerminalOut, setProcesses)]} />
      </div>
      <div className="right">
        {
          processes.map((process, index) => {
            return <ProcessCard
              key={`process-${index}`}
              pid={process.pid} 
              startup={process.startup} 
              scriptName={process.scriptName} 
              fileName={process.fileName} 
              returnResultFromFork={process.returnFromFork}
            />
          })
        }
      </div>
    </div>
    <div className="terminal">
        {
          terminalOut.map((value, index) => {
            <p key={`terminal-${index}`}>{ value }</p>
          })
        }
    </div>
    </>
    
  )
}

export default App
