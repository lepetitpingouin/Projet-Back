const ListDAO = require("../datamodel/listdao")

module.exports = class ListService {
    constructor(db) {
        this.dao = new ListDAO(db)
    }
    isValid(list) {
        if (list.label !== undefined) {
            list.label = list.label.trim()
            if (list.label === "") return false
            if (list.date != null) {
                if (list.date instanceof String) {
                    list.date = new Date(list.date)
                }
                if (list.date >= new Date()) return false
            }
            return true
        }
        return false
    }
}