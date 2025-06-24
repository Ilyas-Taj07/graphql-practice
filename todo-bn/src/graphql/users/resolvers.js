const User = require('../../model/User')
const Role = require('../../model/Role')
const Todo = require('../../model/Todo')
const joi = require('joi')
const jwt = require('jsonwebtoken')

const addUserSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')).required(),
    roleId: joi.string().required()
})

const tokenSchema = joi.object({
    email: joi.string().required()
})

const userResolver = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id)
    },
    Mutation: {
        addUser: async (_, { name, email, password, roleId }) => {

            try {
                const { error } = addUserSchema.validate({ name, email, password, roleId })

                if (error) {
                    console.error('Error in Add User', error.details[0].message);
                    throw new Error('Validation Error: Please check the provided data')
                }

                const user = new User({ name, email, password, role: roleId })
                return await user.save()
            }
            catch (error) {
                console.error('Error in Add User', error.message);
                throw new Error("Something went wrong")
            }
        },
        token: async (_, { email, password }) => {
            try {

                const { error } = tokenSchema.validate({ email })

                if (error) {
                    console.error('Error in Add User', error.details[0].message);
                    throw new Error('Validation Error: Please check the provided data')
                }

                let data = await User.find({ email: email.toString().toLowerCase() }).populate('role')

                if (data.length === 0) {
                    console.error('No User Found')
                    throw new Error("Please check the provided data")
                }

                data = data[0]

                if (data?.password === password) {
                    const token = jwt.sign({
                        name: data.name,
                        email: data.email,
                        role: data.role.name
                    },
                        process.env.SECRET,
                        {
                            expiresIn: '1h',
                            algorithm: process.env.ALGORITHM
                        }
                    )
                    return {
                        accessToken: token,
                        user: data
                    }
                }
                else {
                    console.error('Wrong Password')
                    throw new Error("Please check the provided data")
                }

            }
            catch (error) {
                console.error("Error in Token", error.message)
                throw new Error('Something went wrong')
            }
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

module.exports = userResolver;