class Line {
    constructor(data, indentationLevel, callback) {
        this.data = data
        this.indentationLevel = indentationLevel
        this.callback = callback
    }

    getLine() {
        let string = ""
        for(let i = 0; i < this.indentationLevel; i++) {
            string += "\t"
        }
        return string + this.data
    }

    execute() {
        this.callback()
    }
}

export default Line