import { gql } from '@apollo/client'


export const GET_TODOS = gql`
    query($userId: String!){
        todos(userId: $userId){
            id
            name
            todos{
                id
                todo
                isCompleted
            }
        }
    }
`


export const ADD_TODO = gql`
    mutation($todo:String!, $userId:String!){
        addTodo(todo:$todo, userId: $userId){
            id
            todo
        }
    }
`

export const DELETE_TODO = gql`
    mutation($id: String!){
        deleteTodo(id:$id){
            id
        }
    }
`