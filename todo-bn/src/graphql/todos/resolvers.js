const Todo = require('../../model/Todo')


const todoResovler = {

    Mutation: {

        addTodo: async (_, { todo, userId }) => {

            const newTodo = new Todo({ todo, user: userId })
            return await newTodo.save()

        },
        updateTodo: async (_, { id, todo, isCompleted }) => {
            const updatetodo = await Todo.findByIdAndUpdate(id, { todo, isCompleted }, { new: true })
            return updatetodo
        },
        deleteTodo: async (_, { id }) => {
            const deletetodo = await Todo.findByIdAndDelete(id)
            return deletetodo
        }

    }

}

module.exports = todoResovler