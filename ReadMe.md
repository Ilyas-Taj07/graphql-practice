# GraphQL

- GraphQL is a query language for APIs — created by Facebook — that allows the client (like your React app) to ask for exactly the data it needs from the server.

- Unlike REST (which has fixed endpoints like /books, /authors), GraphQL has a single endpoint (usually /graphql) and you control what you get.

## GraphQL Core Concepts

### Schema

- The schema defines what data your API exposes and how it can be queried.

Example:
<pre>
type Book {
  id: ID!
  title: String!
  author: Author
}

type Author {
  id: ID!
  name: String!
  books: [Book]
}
</pre>

### Query [GET]

- Used to fetch data (like GET in REST).

<pre>
query {
  books {
    id
    title
    author {
      name
    }
  }
}
</pre>

- This will return

<pre>
{
  "data": {
    "books": [
      {
        "id": "1",
        "title": "Harry Potter",
        "author": {
          "name": "J.K. Rowling"
        }
      }
    ]
  }
}
</pre>


### Mutation - [POST, PUT, DELETE]

- Used to create, update, or delete data (like POST, PUT, DELETE in REST).

<pre>
mutation {
  addBook(title: "New Book", authorId: "2") {
    id
    title
  }
}
</pre>


### Resolvers

- Backend functions that actually fetch or modify data.

<pre>
addBook: (_, { title, authorId }) => {
  return Book.create({ title, author: authorId });
}
</pre>


### Single Endpoint

- Your app only talks to one backend route:

<pre>
POST /graphql
</pre>
And it sends queries/mutations like this:
<pre>
{
  "query": "query { books { title } }"
}
</pre>



## Installation 

## Backend

<pre>
npm install express apollo-server-express graphql mongoose
</pre>


## Frontend

<pre>
npm install @apollo/client graphql
</pre>