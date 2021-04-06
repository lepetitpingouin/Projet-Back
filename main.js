const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const itemService = require("./services/item")
const listService = require("./services/list")


const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur


const connectionString = "postgres://postgres:Eyeshield21@localhost/TPJSNODE"
const db = new pg.Pool({ connectionString: connectionString })
const ItemService = new itemService(db)
const ListService = new listService(db)

require('./api/list')(app, ListService)
require('./api/item')(app, ItemService)
require('./datamodel/seeder')(ListService,ItemService)
    .then(app.listen(3333))


