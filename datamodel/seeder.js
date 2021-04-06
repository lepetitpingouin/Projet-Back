const List = require('./list')
const Item = require('./item')

module.exports = (listservice,itemservice) => {
    return new Promise(async (resolve, reject) => {
        try {
            await listservice.dao.db.query("CREATE TABLE list(id SERIAL PRIMARY KEY, label TEXT, date DATE, archived BOOLEAN )")
            await itemservice.dao.db.query("CREATE TABLE item(id SERIAL PRIMARY KEY, quantity NUMERIC NOT NULL, label TEXT NOT NULL, isChecked BOOLEAN, listId INTEGER, FOREIGN KEY (listId) REFERENCES list(id) ON DELETE CASCADE)")


            for (let i = 0; i < 5; i++) {
                await listservice.dao.insert(new List("List: " + i, new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),false
                ))
            }

            for (let i = 1; i < 6; i++) {
                await itemservice.dao.insert(new Item("Label" + i, 2*i, 1))
            }
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
    })
}

