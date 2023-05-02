class Line {
    constructor(data, indentationLevel) {
        this.data = data
        this.indentationLevel = indentationLevel
    }

    getLine() {
        let string = ""
        for(let i = 0; i < this.indentationLevel; i++) {
            string += "\t"
        }
        return string + this.data
    }
}

export default Line