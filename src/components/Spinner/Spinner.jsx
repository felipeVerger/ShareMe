import React from 'react'
import { DotSpinner } from '@uiball/loaders'

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <DotSpinner 
        size={50}
        speed={0.9} 
        color="#00BFFF" 
      />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner