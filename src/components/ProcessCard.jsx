import PropTypes from "prop-types"


const ProcessCard = (props) => {
    const { pid, startup, scriptName, fileName, returnResultFromFork } = props
    

    return (
        <div className="process-card">
            <p>PID: {pid}</p>
            <p>Starting Process: {startup ? "✅" : "❌"}</p>
            <p>Running Script: { scriptName }</p>
            <p>Filename: { fileName }</p>
            <p>Return result from fork(): { returnResultFromFork }</p>
        </div>

    )
}
ProcessCard.propTypes = {
    pid: PropTypes.number.isRequired,
    startup: PropTypes.bool.isRequired,
    scriptName: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    returnResultFromFork: PropTypes.any.isRequired,
}

export default ProcessCard