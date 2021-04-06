const BaseDAO = require('./basedao')

module.exports = class ListDAO extends BaseDAO{
    constructor(db) {
        super(db, "list")
    }
    insert(list) {
        return this.db.query("INSERT INTO list(label,date,archived) VALUES ($1,$2,$3)",
            [list.label,list.date,list.archived])
    }
    getById(id) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM list WHERE id=$1`, [id])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list ORDER BY label")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    update(list) {
        return this.db.query("UPDATE list SET label=$2,archived=$3,date=$4 WHERE id=$1",
            [list.id, list.label, list.archived,list.date])
    }

}