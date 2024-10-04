// bring in mongoose for structuring data and validation
import mongoose from "mongoose";
// create a schema to validate our data and determine what it looks like
const todoSchema = mongoose.Schema({
    text: { type: String }, // field must be a string (data validation)
    completed: { type: Boolean, default: false } // field must be a boolean value for our chekcbox, checked true, unchecked false
})

// Create our model with the schema, first parameter is collection name (todos)
const Todo = mongoose.model('todos', todoSchema)


// exporting to  use model in server to interact with todo documents
export default Todo