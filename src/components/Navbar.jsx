import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-purple-950 text-white font-extrabold py-2'>
        <div className="logo">
            <span className='font-extrabold text-3xl mx-8 text-fuchsia-700 font-serif'>To-Do-List in React</span>
        </div>
        <ul className='flex gap-8 mx-9 text-xl'>
            <li className='cursor-pointer hover:text-slate-300 transition-all duration-75 font-serif'>Home</li>
            <li className='cursor-pointer hover:text-slate-300 transition-all duration-75 font-serif'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
