const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const db = require("./db/users")
const port = process.env.PORT || 8080

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, resp) => {
    resp.render('index.ejs')
})

app.get('/register', (req, resp) => {
    resp.render('register.ejs')
})

app.post('/register', async (req, resp) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        let usuario = req.body
        usuario.password = hashedPass
        let results = await db.createUser(usuario)
        console.log(usuario)
        //resp.status(201).json({ id: results[0], message: "Se registró correctamente"})
        resp.redirect('/login')
    } catch {
        
    }
    
})

app.get('/login', (req, resp) => {
    resp.render('login.ejs')
})

app.post('/login', async (req, resp) => {
    try {
        let usuario = req.body
        let results = await db.getUser(usuario.name)
        let flag = false
        if(usuario.name === results[0].name && await bcrypt.compare(usuario.password, results[0].password))
            flag = true;
        if (flag)
            resp.redirect('/exito')
        else
            resp.redirect('/error')
    } catch {
        
    }
})

app.get('/error', (req, resp) =>{
    resp.render('error.ejs')
})

app.get('/exito', (req, resp) =>{
    resp.render('exito.ejs')
})

app.listen(port, () => {
    console.log('Escuchando en puerto 8080');
})