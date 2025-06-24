import React, { useState } from 'react'
import "./Login.css"
import { useMutation } from '@apollo/client'
import { Token } from '../../graphql/UserMutation'
import { setCookie } from '../../utils'

function Login({ setIsRegister, setIsLogin }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [token, { loading }] = useMutation(Token)
    console.log('loading', loading)
    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                alert("Please provide the data")
                return
            }

            let response = await token({ variables: { email, password } })

            setCookie('user', response.data.token.user)
            setCookie('token', response.data.token.accessToken)
            setIsLogin(true)
        }
        catch (err) {
            console.log('err', err)
        }


    }

    return (
        <div className='login_card'>
            <div className='login_header'>
                <span>Login</span>
                <p>Need a todo account? <label onClick={() => setIsRegister(true)}>Create an account</label></p>
            </div>
            <div className='login_content'>
                <div className='login_field'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='text'
                        placeholder='Please enter the email address'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='OFF'
                    />
                </div>
                <div className='login_field'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Please enter the password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='OFF'
                    />
                </div>
            </div>
            <div className='login_action'>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login
