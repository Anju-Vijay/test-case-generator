import React from 'react'

const Button = ({onClick, title}) => {
  return (
    <div>
        <button onClick={onClick} className='p-3  bg-lime-200 h-14 rounded cursor-pointer font-semibold border border-lime-400 shadow-2xl hover:bg-lime-400'>{title}</button>
    </div>
  )
}

export default Button