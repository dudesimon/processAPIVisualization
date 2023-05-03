import PropTypes from "prop-types"
import Operation from "../components/Operation"

const ProcessView = (props) => {
    const { codeBlock, isSplit, parentCurrentLine, childCurrentLine, setParentCurrentLine, setChildCurrentLine, parentIsWaiting, isDone } = props

    const next = () => {
        if (!parentIsWaiting) {
            if (parentCurrentLine + 1 < codeBlock.lines.length) {
                codeBlock.lines[parentCurrentLine + 1].execute()
                setParentCurrentLine(prevCurrentLine => prevCurrentLine + 1)
            } else {
                setParentCurrentLine(-1)
            }
        }

        if (isSplit) {
            if (childCurrentLine + 1 < codeBlock.lines.length) {
                codeBlock.lines[childCurrentLine + 1].execute()
                setChildCurrentLine(prevCurrentLine => prevCurrentLine + 1)
            } else {
                setChildCurrentLine(-1)
            }
        }
    }

    return (
        <>
            <Operation
                code={codeBlock}
                parent_current_line={parentCurrentLine}
                child_current_line={childCurrentLine}
                is_split={isSplit}
            />
            <button onClick={() => next()} disabled={isDone}>Next Step</button>
        </>
    )
}

ProcessView.propTypes = {
    codeBlock: PropTypes.any.isRequired,
}

export default ProcessView