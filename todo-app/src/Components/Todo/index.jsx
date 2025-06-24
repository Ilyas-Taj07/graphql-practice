import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { get_cookie } from '../../utils'

function Todo() {

    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')
    const username = get_cookie('user')?.name

    useEffect(() => {

        setTodos(get_cookie('todos') || [])

    }, [])

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
                    <button>Add</button>
                </div>
                <div className='todo_items'>
                    <span>Items</span>
                    {
                        todos?.map((item, index) => {
                            return <TodoItem
                                key={index + '111'}
                                todo={item?.todo}
                                isCompleted={item?.isCompleted}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo;


function TodoItem() {

    const [isEdit, setIsEdit] = useState(false)
    const [newText, setNewText] = useState('')

    return (
        <div className='todo_item'>
            {
                isEdit ?
                    <>
                        <input type='checkbox' />
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
                        <p onDoubleClick={() => setIsEdit(true)}>Learn Graphql fastly adad ada da daadad adad ada dadadad ada dad ada da dadad ada dadaadd ad ada a</p>
                        <button>Delete</button>
                    </>
            }

        </div>
    )
}