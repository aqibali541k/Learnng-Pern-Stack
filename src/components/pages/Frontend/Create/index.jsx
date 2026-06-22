import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

let initialState = {
    name: "",
    phone: "",
    age: "",
    profilePic: ""
}
const Create = () => {
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const handleChange = (e) => {
        if (e.target.name === "phone" || e.target.name === "age") {
            if (!/^[0-9]*$/.test(e.target.value)) {
                return;
            }
        }
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, phone, age, profilePic } = state
        if (!name || !phone || !age || !profilePic) {
            message.error("Please fill all the fields")
            return;
        }

        setLoading(true)
        if (id) {
            return handleUpdate(id)
        }
        try {
            const res = await axios.post("http://localhost:8000/api/users", state)
            console.log(res.data)
            setLoading(false)
            message.success("User created successfully")
            setState(initialState)
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                message.error("User already exists")
                return;
            }
            message.error("Failed to create user")
        } finally {
            setLoading(false)
        }
    }
    const handleUpdate = async (id) => {

        try {
            const res = await axios.put(`http://localhost:8000/api/users/${id}`, state)
            console.log(res.data)

            message.success("User updated successfully")
            setState(initialState)
            if (res.status == 200) {

                navigate("/create")
            }

        }
        catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                message.error("User with this phoone already exists")
                return;
            }
            message.error("Failed to Update user")
        } finally {
            setLoading(false)
        }
    }
    const fetchSingleUser = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/users/${id}`
            )

            console.log("Single User:", res.data)

            setState({
                name: res.data.Name,
                phone: res.data.Phone,
                age: res.data.Age,
                profilePic: res.data.ProfilePic
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (id) {
            fetchSingleUser()
        }
    }, [id])
    const style = "w-full mt-4 bg-white p-2 border border-gray-300 rounded-lg"
    return (
        <div className='max-w-xl px-8 rounded-xl mt-2 py-12 bg-pink-400 shadow-lg flex mx-auto justify-center items-center '>
            <div className="">
                <h1 className='w-full text-2xl font-bold text-white text-center'>Create User</h1>
                <input className={style} value={state.name} type="text" name='name' placeholder='Name' onChange={handleChange} />
                <input className={style} value={state.phone} type="text" name='phone' placeholder='Phone' onChange={handleChange} />
                <input className={style} value={state.age} type="number" name='age' placeholder='Age' onChange={handleChange} />
                <input className={style} value={state.profilePic} type="text" name='profilePic' placeholder='ProfilePic' onChange={handleChange} />
                <button onClick={handleSubmit} className='bg-blue-600 p-2 cursor-pointer hover:bg-blue-700 transition-all duration-300 shadow-lg mt-4 w-full text-white font-bold rounded-lg'>
                    {
                        loading
                            ? (id ? "Updating..." : "Creating...")
                            : (id ? "Update User" : "Create User")
                    }                </button>
            </div>

        </div>
    )
}

export default Create