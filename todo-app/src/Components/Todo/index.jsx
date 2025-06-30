import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { get_cookie } from '../../utils'
import { ADD_TODO, DELETE_TODO, GET_TODOS } from '../../graphql/Todos'
import { useQuery, useMutation } from '@apollo/client'

function Todo() {

    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')
    const username = get_cookie('user')?.name
    const id = get_cookie('user')?.id

    let { data, refetch } = useQuery(GET_TODOS, { variables: { userId: id } })
    const [addtodo] = useMutation(ADD_TODO)

    const [deleteTodo] = useMutation(DELETE_TODO)

    useEffect(() => {

        if (data !== undefined) {
            setTodos(data.todos.todos)
        }

    }, [data])

    const handleAddTodo = async () => {
        if (text.trim().length !== 0) {

            let todo = await addtodo({ variables: { todo: text, userId: id } })

            if (!todo.errors) {
                refetch()
                setText('')
            }
            else {
                console.error(todo.errors)
            }

        }
        else {
            alert("Please write something")
        }
    }

    const handleDelete = async (todoId) => {

        try {

            let deleteTododata = await deleteTodo({ variables: { id: todoId } })

            if (!deleteTododata.errors) {
                refetch()
            }
            else {
                console.error(deleteTododata.errors)
            }

        }
        catch (err) {
            console.error('err', err)
        }

    }

    return (
        <div className='todo_container'>
            <div className='todo_card'>
                <div className='todo_header'>
                    <span>Todo</span>
                    <div className='todo_profile'>
                        <p>Welcome, {username.toString().substring(0, 1).toUpperCase() + username.toString().substring(1).toLowerCase()}</p>
                        <button>Logout</button>
                    </div>
                </div>
                <div className='todo_add'>
                    <input
                        type='text'
                        placeholder='Enter the todo item'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={handleAddTodo}>Add</button>
                </div>
                <div className='todo_items'>
                    <span>Items</span>
                    {
                        todos.length !== 0 ? todos?.map((item, index) => {
                            return <TodoItem
                                key={index + '111'}
                                todo={item?.todo}
                                isCompleted={item?.isCompleted}
                                todoId={item.id}
                                handleDelete={handleDelete}
                            />
                        }) :
                            <p>Please add TODO</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo;


function TodoItem({ todo, isCompleted, todoId, handleDelete }) {

    const [isEdit, setIsEdit] = useState(false)
    const [newText, setNewText] = useState('')

    return (
        <div className='todo_item'>
            {
                isEdit ?
                    <>
                        <input type='checkbox' checked={isCompleted} />
                        <input
                            type='text'
                            placeholder='Edit it'
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        />
                        <button onClick={() => setIsEdit(false)}>Update</button>
                    </>
                    :
                    <>
                        <input type='checkbox' />
                        <p onDoubleClick={() => setIsEdit(true)}>{todo}</p>
                        <button onClick={() => handleDelete(todoId)}>Delete</button>
                    </>
            }

        </div>
    )
}