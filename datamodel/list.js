module.exports = class List {
    constructor(label) {
        this.label = label
        this.archived = false
        this.items = []
        this.date = new Date()
    }

}