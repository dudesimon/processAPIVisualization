import "./App.css"
import Code from "./structures/Code.class"
import Line from "./structures/Line.class"
import ProcessView from "./components/ProcessView"
import { useState } from "react"
import callingFork from "./blocks/callingFork"

const App = () => {
  const [view, setView] = useState("process")
  console.log("RENDERED APP!")
  if(view === "process") {
    return(
      <div>
        <ProcessView codeBlocks={[callingFork]} />
        <button onClick={() => setView("view")}>Change View!</button>
      </div>
    )
  } else {
    return (
      <>
        <p>Viewing something else!</p>
        <button onClick={() => setView("process")}>Change View!</button>
      </>
    )
  }
}

export default App
