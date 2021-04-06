module.exports = (app, listService) => {

    app.get("/list", async (req, res) => {
        /*dao.getAll()
            .then(lists => { res.json(lists) })*/
        res.json(await listService.dao.getAll())
    })

    app.get("/list/:id", async (req, res) => {
        try {
            const list = await listService.dao.getById(req.params.id)
            if (list === undefined || list == null || list.length === 0) {
                return res.status(404).end()
            }
            return res.json(list)
        } catch (e) {
            res.status(400).end()
        }
    })

    app.post("/list", (req, res) => {
        const list = req.body
        if (!listService.isValid(list)) {
            return res.status(400).end()
        }
        listService.dao.insert(list)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/list/:id", async (req, res) => {
        const list = await listService.dao.getById(req.params.id)
        if (list === undefined) {
            return res.status(404).end()
        }
        listService.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/list", async (req, res) => {
        const list = req.body
        console.log(req.body)
        console.log(list)
        if ((list.id === undefined) || (list.id == null) || (!listService.isValid(list))) {
            return res.status(400).end()
        }
        if (await listService.dao.getById(list.id) === undefined) {
            return res.status(404).end()
        }
        listService.dao.update(list)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
