import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import Operation from "../components/Operation"

const ProcessView = (props) =>{
    const {codeBlocks} = props
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

ProcessView.propTypes = {
    codeBlocks: PropTypes.any.isRequired,
}

export default ProcessView