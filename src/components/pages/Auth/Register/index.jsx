import { Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
let initialState = { name: "", email: "", phone: "", age: "", password: "", profilePic: "" }
const Register = () => {
    const [state, setState] = useState(initialState)
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, phone, age, password } = state
        if (!name || !email || !phone || !age || !password) {
            message.error("Please fill all the fields")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/api/auth", state)
            console.log(res.data)
            message.success("User Registered Successfully")
            setState(initialState)
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                message.error("User Already Exists")
            }
            else {
                message.error("User Registered Failed")
            }
        }
        console.log(state)
    }
    const style = "w-full my-2 mb-2  bg-white rounded-lg border border-gray-200 flex justify-center items-center p-1 "
    return (
        <div className='max-w-xl px-8 mt-4 py-12 bg-white shadow-lg rounded-2xl p-4 mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-2xl w-full font-bold text-center'>Register</h1>
            <label className='w-full text-left'>Name</label>
            <input className={style} type="text" name='name' placeholder='Enter your Name' onChange={handleChange} />
            <label className='w-full text-left'>Email</label>
            <input className={style} type="text" name='email' placeholder='Enter your Email' onChange={handleChange} />
            <label className='w-full text-left'>Phone</label>
            <input className={style} type="text" name='phone' placeholder='Enter your Phone' onChange={handleChange} />
            <label className='w-full text-left'>Age</label>
            <input className={style} type="number" name="age" placeholder='Enter your Age' onChange={handleChange} />
            <label className='w-full text-left'>Password</label>
            <Input.Password className={style} name="password" placeholder='Enter your Password' onChange={handleChange} />
            <label className='w-full text-left'>ProfilePic</label>
            <input className={style} type="text" name="profilePic" placeholder='Enter your ProfilePic' onChange={handleChange} />
            <button onClick={handleSubmit} className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'>Register</button>
        </div>
    )
}

export default Register