import express from "express"
// help us reach backend routes from frontend
import cors from 'cors'
// create express server
const app = express()
import 'dotenv/config'
import connectDB from "./config.js"
import Todo from './models/todoModel.js'

app.use(cors())

app.use(express.json())

const PORT = 8080
// route for testing
app.get('/test', (req, res) => {
    res.json("Hello from the server")
})

//  route that gets all todos and sends it to client
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()  // use find method to retrieve all docs from todo collection
        res.status(200).json(todos)
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }

})
// route creates and adds a todo document to the database
app.post('/todos', async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = await Todo.create(req.body)
        res.status(201).json(newTodo)
        console.log('POST /todos');

    } catch (e) {
        console.log(e);
        res.status(400).json(e)

    }
})
//route for deleting todo doc from database
app.delete('/todos/:id', async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
        console.log(deleteTodo);
        console.log('DELETE /todos/:id');
        res.status(200).json(deleteTodo);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});
// route for updating a todo doc from the db
app.put('/todos/:id', async (req, res) => {
    try {// importing schema to use the model
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body); // first pass is the id we want to update, second pass is the body of the doc to update
        // find the doc by the id and update it with the req.body
        console.log(updateTodo);
        console.log('PUT /todos/:id');
        res.status(200).json(updateTodo)

    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
})

// setup server to listen on specific port
app.listen(PORT, () => {
    console.log('Listening on PORT: ' + PORT);
    connectDB()
})