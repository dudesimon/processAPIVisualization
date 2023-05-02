import Operation from "./components/Operation"
import "./App.css"
import Code from "./structures/Code.class"
import Line from "./structures/Line.class"
import { useEffect, useState } from "react"

const App = () => {
  const codeBlocks = [
    new Code([
      new Line("printf('hello')", 0),
      new Line("printf('exiting')", 0)
    ], "Print"),
    new Code([
      new Line("if(x === 4) {", 0),
      new Line("printf('hi')", 1),
      new Line("}", 0)
    ], "Show Multi-line"),
    new Code([
      new Line("printf('hello')", 0),
      new Line("printf('exiting')", 0)
    ], "Print"),
  ]
  const [currentBlock, setCurrentBlock] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if(currentBlock >= 0) {
        if(currentLine + 1 < codeBlocks[currentBlock].lines.length) {
          setCurrentLine(prevCurrentLine => prevCurrentLine + 1)
        } else {
          setCurrentLine(0)
          if(currentBlock + 1 < codeBlocks.length) {
            setCurrentBlock(prevCurrentBlock => prevCurrentBlock + 1)
          } else {
            setCurrentBlock(-1)
            clearInterval(id)
          }
        }
      }
      
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [codeBlocks, currentBlock, currentLine])

  return (
    <>
      { codeBlocks.map((codeBlock, index) => {
        return (
          <Operation 
            key={index} 
            code={codeBlock} 
            current_line={currentBlock === index ? currentLine : -1} 
          />
        )
      })}
    </>
  )
}

export default App
