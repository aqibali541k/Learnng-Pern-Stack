import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'

const Auth = () => {
    return (
        <Routes>
            <Route path='register' element={<Register />} />
        </Routes>
    )
}

export default Auth