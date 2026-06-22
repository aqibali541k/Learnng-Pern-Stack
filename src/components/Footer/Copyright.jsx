import React from 'react'

const Copyright = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white text-center py-4">
            <p className='text-center'> <span>{new Date().getFullYear()} &copy;</span>All Rights Are Reserved </p>
        </div>
    )
}

export default Copyright