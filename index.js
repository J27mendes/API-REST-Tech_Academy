import express, { response } from "express";
import { StatusCodes} from "http-status-codes";

const app = express()
const PORT = process.env.PORT || 3000

let users = [
    {id: 1, name: "Carla Lima", age: 27},
    {id: 2, name: "Ericka Carla", age: 32},
    {id: 3, name: "Karina Figueroa", age: 40},
    {id: 4, name: "Cristiane Melo", age: 25},
    {id: 5, name: "Silvia Souza", age: 35},
    {id: 6, name: "Josy Campos", age: 20},
    {id: 7, name: "Chiara Campelo", age: 28},
    {id: 8, name: "Josélia Marçal", age: 34},
    {id: 9, name: "Renata Borba", age: 32},
    {id: 10,name: "Miriam Santos", age: 42},
    {id: 11,name: "Marilia Barreto", age: 48}
]

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express.</h1>')
})

app.get('/users', (request, response) => {
    return response.send(users)
})

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user)
})

app.post('/users', (request, response) => {
    const newUser = request.body
    users.push(newUser)

    return response.status(StatusCodes.CREATED).send(newUser)
})

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId
    const updateUser = request.body

    users = users.map(user => {
        if(Number(userId) === user.id){
            return updateUser
        }
        return user
    })
    return response.send(updateUser)
})

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId

    users = users.filter((user) => user.id !== Number(userId))

    return response.status(StatusCodes.NO_CONTENT).send()
})

//Construindo uma REST API seguindo as boas práticas