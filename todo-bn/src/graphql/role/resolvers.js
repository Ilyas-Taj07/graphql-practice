const Role = require('../../model/Role')


const roleResolvers = {
    Query: {
        roles: async () => await Role.find({})
    },
    Mutation: {
        addRole: async (_, { name }) => {
            const role = new Role({ name })
            return await role.save()
        }
    }
}

module.exports = roleResolvers;