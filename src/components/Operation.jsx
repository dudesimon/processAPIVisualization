import PropTypes from "prop-types"

const Operation = (props) => {
    const { code, is_split, parent_current_line, child_current_line } = props 
    return (
        <div className="operation">
            <h1>{ code.description }</h1>
            {
                code.lines.map((line, index) => {
                    return (
                        <div key={`line-${index}`}>
                            <pre><span>{ parent_current_line === index && is_split && "P ➡️" } { child_current_line === index && is_split && "C ➡️"} { parent_current_line === index && !is_split && "➡️"} { index }</span> { line.getLine() }</pre>
                        </div>
                    )
                })
            }
        </div>
    )
}

Operation.propTypes = {
    code: PropTypes.any.isRequired, // should be of class type Code
    parent_current_line: PropTypes.number.isRequired,
    child_current_line: PropTypes.number.isRequired,
}

export default Operation