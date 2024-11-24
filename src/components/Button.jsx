import React from 'react'

function Button({onClick,children}) {
    return (
        <button onClick={onClick} className='block bg-blue-700 text-white p-1 rounded-lg mb-2' >{children}</button>
    )
}

export default Button
