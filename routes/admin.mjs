import express from 'express'
const router = express.Router()


import isAdmin from "../helpers/isAdmin.mjs";

router.get('/', isAdmin, (req, res) => {
    res.send("HI")
})

export {router as routerAdmin}