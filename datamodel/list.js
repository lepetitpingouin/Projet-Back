module.exports = class List {
    constructor(shop) {
        this.shop = shop
        this.archived = false
        this.items = []
        this.date = new Date()
    }
    newItem(item, quantity) {
        this.items.push(new Item(item, quantity))
    }
    removeItem(index) {
        this.items.splice(index, 1)
    }
    checkItem(index) {
        this.items[index].checked = ! this.items[index].checked
    }
}