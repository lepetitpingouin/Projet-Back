module.exports = (app, svc) => {
    app.get("/item", async (req, res) => {
        res.json(await svc.dao.getAll())
    })
    app.get("/item/:id", async (req, res) => {
        try {

            const item = await svc.dao.getById(req.params.id)
            if (item === undefined || item == null || item.length === 0) {
                return res.status(404).end()
            }
            return res.json(item)
        } catch (e) { res.status(400).end() }
    })
    app.post("/item", (req, res) => {
        const item = req.body
        if (!svc.isValid(item))  {
            return res.status(400).end()
        }
        svc.dao.insert(item)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/item/:id", async (req, res) => {
        const item = await svc.dao.getById(req.params.id)
        if (item === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/item", async (req, res) => {
        const item = req.body
        if ((item.id === undefined) || (item.id == null) || (!svc.isValid(item))) {
            return res.status(400).end()
        }
        if (await svc.dao.getById(item.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.update(item)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
