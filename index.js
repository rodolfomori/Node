import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json()) // avisando que eu vou usar JSON

mongoose.connect('mongodb+srv://rodolfo:KiIXDZEJCiXQaU8d@cluster0.e0lcgmo.mongodb.net/Usuarios?appName=Cluster0')
    .then(() => console.log("Conectado ao banco de dados Mongo"))
    .catch((error) => console.log(error))


const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idade: { type: Number, required: true }
}, { timestamps: true })

const Usuario = mongoose.model('Usuario', usuarioSchema)

// request -> front end pede
// response -> back responde
// ThunderClient (Simula um FRONT END)
// JSON (JavaScript Object Notation) - Notação de Objeto JavaScript
// JSON - formato de dados
// DB(Banco de Dados) - Lugar onde eu guardo de forma SEGURA minhas informações
// Dados -> Banco de Dados -> Back end -> Banco de Dados e busca suas informações

// Retorna / lista os usuarios
app.get('/usuarios', async (request, response) => {

    const usuariosDoBanco = await Usuario.find()

    // respondendo ao front end com os usuarios
    response.json(usuariosDoBanco)
})


// Criar usuarios
// async / await
app.post('/usuarios', async (request, response) => {

    const usuarioCriado = await Usuario.create(request.body)

    response.json(usuarioCriado)
})


app.listen(3003, () => {
    console.log("Servidor Rodando na Porta 3003")
})

// localhost:3000/usuarios