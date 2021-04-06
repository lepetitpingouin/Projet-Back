
const ItemDAO = require("../datamodel/itemdao")
module.exports = class ItemService {
    constructor(db) {
        this.dao = new ItemDAO(db)
    }
    isValid(items){
        if (items.label === "") return false
        if ((items.quantity === 0) || (items.quantity === null) ) return false
        if (items.checked === null) return false
        if (items.listid === null) return false

        return true
    }
}