import "./App.css"
import Code from "./structures/Code.class"
import Line from "./structures/Line.class"
import ProcessView from "./components/ProcessView"
import { useState } from "react"

const App = () => {
  const [view, setView] = useState("process")
  console.log("RENDERED APP!")
  if(view === "process") {
    return(
      <div>
        <ProcessView codeBlocks={[
          new Code([
            new Line(
              "printf('1', getRandomNumber())",
              0,
              () => console.log('1', Math.random())
            ),
            new Line(
              "printf('2')",
              0,
              () => console.log('2', Math.random())
            ),
            new Line(
              "printf('3')",
              0,
              () => console.log('3', Math.random())
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
