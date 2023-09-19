const express = require('express')
const uuid = require('uuid')
const port = 3002
const app = express()
app.use(express.json())

const users = []
//abaixo um middlaware para executar as rotas em uma só função 
const checkUseId = (request, response, next) => {
    const { id } = request.params

    //pegando a posiçao que esta o usuario no array
    const index = users.findIndex(user => user.id === id)

    //se mandar um id que não existe deve fazer uma verificação 

    if (index < 0) {
        return response.status(404).json({ error: 'user not found ' })
    }

    request.userIndex = index
    request.userId = id
    next()
}
// app.use(checkUseId)

app.get('/users', (request, response) => {

    console.log('fui chamdo')
    return response.json({ users });

})
//usuario(montando )
app.post('/users', (request, response) => {

    const { name, age } = request.body

    //    console.log(uuid.v4())
    const user = { id: uuid.v4(), name, age }
    users.push(user)


    return response.status(201).json({ user });

})

app.put('/users/:id',checkUseId, (request, response) => {
    
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }

    //atualizando dados abaixo 

    users[index] = updateUser
    console.log(index)

    return response.json({ updateUser });

})

app.delete('/users/:id',checkUseId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)
    return response.status(204).json({ users });

})

app.listen(port, () => {
    console.log(`Server is running 🚀 ${port}`)
})