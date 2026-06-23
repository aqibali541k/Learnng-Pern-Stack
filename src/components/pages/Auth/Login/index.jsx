import { Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
let initialState = { email: "", password: "" }
const Login = () => {
    const [state, setState] = useState(initialState)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = state
        if (!email || !password) {
            message.error("Please fill all the fields")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", state)
            console.log(res.data)
            message.success("User Login Successfully")
            setState(initialState)
            navigate("/")
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                message.error("Invalid Credentials")
            }
            else if (error.response.status === 400) {
                message.error("Password is incorrect")
            }
            else {
                message.error("User Login Failed")
            }
        }
        console.log(state)
    }
    const style = "w-full my-2 mb-2  bg-white rounded-lg border border-gray-200 flex justify-center items-center p-1 "
    return (
        <div className='max-w-lg min-h-[400px] px-8 mt-8 py-12 bg-white shadow-lg rounded-2xl p-4 mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-2xl w-full font-bold text-green-600 text-center'>User Login</h1>
            <label className='w-full text-left'>Email</label>
            <input className={style} type="text" name='email' placeholder='Enter your Email' onChange={handleChange} />
            <label className='w-full text-left'>Password</label>
            <Input.Password className={style} name="password" placeholder='Enter your Password' onChange={handleChange} />
            <button onClick={handleSubmit} className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'>Login</button>
            <div className="flex justify-between w-full">
                <p onClick={() => navigate("/auth/register")} className=' text-green-600 cursor-pointer text-sm font-semibold'>Don't have an account ? <span className='font-bold text-blue-600'>Register</span></p>
                <p onClick={() => navigate("/auth/forgot-password")} className='text-green-600 cursor-pointer text-sm font-semibold'>Forgot password</p>
            </div>
        </div>
    )
}

export default Login