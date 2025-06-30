const Todo = require('../../model/Todo')
const User = require('../../model/User')

const todoResovler = {

    Query: {

        todos: async (_, { userId }) => {

            let user = await User.findById(userId)

            return user

        }

    },
    User: {
        todos: async (parent) => {
            return await Todo.find({ user: parent.id }).select('_id todo isCompleted')
        }
    }
    ,
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