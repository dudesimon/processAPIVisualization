import "./App.css"
import Code from "./structures/Code.class"
import Line from "./structures/Line.class"
import ProcessView from "./components/ProcessView"
import { useState } from "react"

const App = () => {
  const [view, setView] = useState("process")
  
  if(view === "process") {
    return(
      <div>
        <ProcessView codeBlocks={[
          new Code([
            new Line(
              "printf('hi')",
              0
            ),
            new Line(
              "printf('hi')",
              0
            ),
            new Line(
              "printf('hi')",
              0
            )
          ],
          "Code Block Description Here...")
        ]} />
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
