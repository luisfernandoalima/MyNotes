import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index", {titulo: 'Login', css: "login.css"})
})

export default router