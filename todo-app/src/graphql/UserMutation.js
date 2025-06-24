import { gql } from '@apollo/client'


export const ADD_USER = gql`

    mutation($name:String!, $email:String!, $password:String!, $roleId: String!){
        addUser(name:$name, email:$email, password:$password, roleId: $roleId){
            id
            name
            email
            role {
                name
            }
        }
    }

`


export const Token = gql`

    mutation($email:String!, $password:String!){
        token(email:$email, password:$password){
            user {
                id
                name
                email
                role {
                    id
                    name
                }
            }
            accessToken
        }
    }

`