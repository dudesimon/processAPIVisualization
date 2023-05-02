import PropTypes from "prop-types"

const Operation = (props) => {
    const { code, current_line } = props 
    return (
        <div className="operation">
            <h1>{ code.description }</h1>
            {
                code.lines.map((line, index) => {
                    return (
                        <div key={`line-${index}`}>
                            <pre><span>{ current_line === index && "➡️" } { index }</span> { line.getLine() }</pre>
                            { current_line === index && line.execute() }
                        </div>
                    )
                })
            }
        </div>
    )
}

Operation.propTypes = {
    code: PropTypes.any.isRequired, // should be of class type Code
    current_line: PropTypes.number.isRequired
}

export default Operation