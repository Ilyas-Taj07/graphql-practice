/src/graphql/schema.js
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const userTypeDefs = require('./user/typeDefs');
const todosTypeDefs = require('./todos/typeDefs');

const userResolvers = require('./user/resolvers');
const todosResolvers = require('./todos/resolvers');

const typeDefs = mergeTypeDefs([userTypeDefs, todosTypeDefs]);
const resolvers = mergeResolvers([userResolvers, todosResolvers]);

module.exports = { typeDefs, resolvers };


-- Roles

query {
  roles{
    id
    name
  }
}


mutation($name: String!){
  addRole(name: $name){
    name
  }
}


--- User

query{
  users{
    id
    name
    email
    role {
      id
      name
    }
    todos{
      id
      todo
      isCompleted
    }
  }
}

query($id:ID!) {
  user(id:$id){
    id
    name
    role{
      id
      name
    }
  }
}


mutation($name:String!, $email:String!,$password:String!,$roleId:String!){
  addUser(name:$name,email:$email,password:$password,roleId:$roleId){
    id
    name
    email
    role{
      id
      name
    }
  }
}




---- TODO


mutation($todo:String!,$userId:String!){
  addTodo(todo:$todo, userId:$userId){
    id
    todo
  }
}



mutation($id: String!, $todo:String!, $isCompeled: Boolean!){
  updateTodo(id:$id,todo:$todo,isCompleted: $isCompeled){
    id
    todo
    isCompleted
  }
}
