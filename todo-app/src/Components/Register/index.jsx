import React, { useState } from 'react'
import "./Register.css"
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../graphql/UserMutation'

function Register({ setIsRegister }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [addUser, { loading }] = useMutation(ADD_USER)

    const handleRegister = async () => {
        try {

            if (username === '' || email === '' || password === '') {
                alert('Please provide the data')
                return
            }

            await addUser({ variables: { name: username, email, password, roleId: "68598d4429ba7829e119ed98" } })
            setUsername('')
            setEmail('')
            setPassword('')
            setIsRegister(false)
        }
        catch (err) {
            console.log('err', err)
        }

    }
    console.log('loading', loading)

    return (
        <div className='register_card'>
            <div className='register_header'>
                <span>Register</span>
                <p>Already have an account? <label onClick={() => setIsRegister(false)}>try login</label></p>
            </div>
            <div className='register_content'>
                <div className='register_field'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        placeholder='Please enter the username'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='OFF'
                    />
                </div>
                <div className='register_field'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='text'
                        placeholder='Please enter the email address'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='register_field'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Please enter the password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className='register_action'>
                <button onClick={handleRegister}>Create new Account</button>
            </div>
        </div>
    )
}

export default Register
