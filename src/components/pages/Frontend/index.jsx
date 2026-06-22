import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Create from './Create'
import Read from './Read'
import Header from '../../Header'
import Footer from '../../Footer'
import Home from './Home'

const Frontend = () => {
    return (
        <>
            <Header />
            <div className='bg-cyan-400 min-h-screen pt-16'>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='create' element={<Create />} />
                    <Route path='create/:id' element={<Create />} />
                    <Route path='read' element={<Read />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Frontend