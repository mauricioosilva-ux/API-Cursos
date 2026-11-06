const express = require("express")
const my sql = require("mysql2/promise")
const app = express()

app.use(express.json())

//db = DATABASE
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307
    database: "escola"
})

// Professores
app.get("/professores", async (req, res) => {
    const [professores] = await db.execute("SELECT * FROM professores")
    return res.json(professores)
})

app.post("/professores", async (req, res) => {
    const { nome } = req.body

    if(!nome) {
        return res.status(400).json("Nome não informado")
    }

    if(nome.leght <= 2){
        return res.status(400).json("Nome muito curto")
    }

    const resultado = await db.execute("INSERT INTO professores(nome) VALUES (?)", [nome])

    return res.status(201).json({id: resultado.insertId, nome})
})

app.listen(3000, () => console.log("APi no ar :D"))