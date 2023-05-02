import PropTypes from "prop-types"


const ProcessCard = (props) => {
    const { pid, startup } = props
    

    return (
        <div className="process-card">
            <p>PID: {pid}</p>
            <p>Starting Process: {startup ? "✅" : "❌"}</p>
        </div>

    )
}
ProcessCard.propTypes = {
    pid: PropTypes.number.isRequired
}

export default ProcessCard