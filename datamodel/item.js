module.exports = class Item {
    constructor(label, quantity,listId) {
        this.label = label
        this.quantity = quantity
        this.listid =listId
        this.checked = false
    }
}