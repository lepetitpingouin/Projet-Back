const BaseDAO = require('./basedao')

module.exports = class ItemDAO extends BaseDAO {
    constructor(db) {
        super(db, 'item')
    }

    insert(item) {
        return this.db.query("INSERT INTO item(quantity, label, ischecked, listid) VALUES ($1,$2,$3,$4)",
            [item.quantity, item.label, item.checked, item.listid])
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT item.id, quantity, item.label, ischecked, listid FROM item INNER JOIN list ON listid = list.id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    update(item) {
        return this.db.query("UPDATE item SET quantity=$2, label=$3, isChecked=$4, listid=$5 WHERE id=$1",
            [item.id, item.quantite, item.label, item.ischecked, item.listid])
    }

    getById(id){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT id, quantity, label, ischecked, listid FROM item WHERE id = ${id}`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

}