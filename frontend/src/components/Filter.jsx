import React from 'react'

const Filter = () => {
  return (
    <div className='h-fit w-full bg-Grubstake  md:grid md:grid-cols-2'>
      <div className='filter h-full w-full p-5'>
        <form action="" className='flex flex-col flex-wrap lg:block'>
            <input className='outline-none m-3 px-3 py-2 rounded-lg text-zinc-950 bg-slate-100' type="number" placeholder='12th marks ' name='12th marks'/>
            <input className='outline-none m-3 px-3 py-2 rounded-lg text-zinc-950 bg-slate-100' type="number" placeholder='10th marks ' name='10th marks'/>
            <input className='outline-none m-3 px-3 py-2 rounded-lg text-zinc-950 bg-slate-100' type="number" placeholder='CGPA' name='CGPA'/>
            <input className='outline-none m-3 px-3 py-2 rounded-lg text-zinc-950 bg-slate-100' type="text" placeholder='Category' name='Category'/>
            <input className='outline-none m-3 px-3 py-2 rounded-lg text-zinc-950 bg-slate-100' type="number" placeholder='Income' name='Income'/>
            <input className='outline-none m-3 px-3 py-2 rounded-lg text-zinc-950 bg-slate-100' type="text" placeholder='State' name='State'/>
            <input className=' w-24 cursor-pointer m-3 px-3 py-2 rounded-lg text-zinc-950 bg-blue-400 hover:bg-blue-500' type="submit" value="Find" />
        </form>
      </div>
      <div className='Government flex flex-col w-full text-center p-5'>
        <h1 className='text-4xl text-white font-bold font-[kodchasan]'>Important links</h1>
        <div className='w-full text-white font-[kodchasan] h-full flex flex-col text-start p-10'>
            <span><a href="">Up Schollarships</a></span>
            <span><a href="">Central Schollarships</a></span>
        </div>
      </div>
    </div>
  )
}

export default Filter
