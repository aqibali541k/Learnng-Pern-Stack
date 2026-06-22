import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'

const Index = () => {
    return (
        <div>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='auth/*' element={<Auth />} />
            </Routes>
        </div>
    )
}

export default Index