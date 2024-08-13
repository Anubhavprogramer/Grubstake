import React from  'react'

const Footer = () => {
  return (
    <div className='h-fit md:grid md:grid-cols-3 w-full bg-[#1e3a8a]'>
      <div className='col-span-2 hidden md:block  justify-center text-center flex-col w-full h-full text-white '>
        <h1 className='text-2xl md:text-4xl pt-3 md:pt-7'>Important link</h1>
        <div className='text-sm md:grid md:grid-cols-2 h-fit w-full'>
        <div className='flex items-center flex-col justify-start'>
            <span className='my-1 hover:underline'>Up Schollarship</span>
            <span className='my-1 hover:underline'>Up Schollarship</span>
            <span className='my-1 hover:underline'>Up Schollarship</span>
            <span className='my-1 hover:underline'>Up Schollarship</span>
        </div>
        <div className='flex items-center flex-col justify-start'>
            <span className='my-1 hover:underline'>Central Schollarship</span>
            <span className='my-1 hover:underline'>Central Schollarship</span>
            <span className='my-1 hover:underline'>Central Schollarship</span>
            <span className='my-1 hover:underline'>Central Schollarship</span>
            <span className='my-1 hover:underline'>Central Schollarship</span>
            <span className='my-1 hover:underline'>Central Schollarship</span>
        </div>
        </div>

      </div>
      <div className='w-full h-full flex text-white justify-center text-center flex-col'>
        <h1 className='text-2xl md:text-4xl pt-3 md:pt-7'>Our team</h1>
        <span className='my-1 text-sm hover:underline'>Dhruvi Tyagi</span>
        <span className='my-1 text-sm hover:underline'>Alka Singh</span>
        <span className='my-1 text-sm hover:underline'>Anshika Pandey</span>
        <span className='my-1 text-sm hover:underline'>Piyush Kumar Jaiswal</span>
        <span className='my-1 text-sm hover:underline'>Avansih Shukla</span>
        <span className='my-1 text-sm hover:underline'>Anubhav Dubey</span>
      </div>
    </div>
  )
}

export default Footer
