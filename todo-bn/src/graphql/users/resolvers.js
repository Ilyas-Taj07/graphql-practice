const User = require('../../model/User')
const Role = require('../../model/Role')
const Todo = require('../../model/Todo')

const userResolver = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id)
    },
    Mutation: {
        addUser: async (_, { name, email, password, roleId }) => {
            const user = new User({ name, email, password, role: roleId })
            return await user.save()
        }
    },
    User: { // this we need to write as we are taking role in the typeDefs
        role: async (parent) => {
            return await Role.findById(parent.role)
        },
        todos: async (parent) => {
            return await Todo.find({ user: parent._id })
        }
    }
}

module.exports = userResolver