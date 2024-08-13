import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import CardContainer from './CardContainer'
import axios from 'axios';

const Sponsers = () => {
  const [SponserData, setSponserData] = useState([]);

  useEffect(()=>{
    axios.get('/api/v3/bank/user/loan')
    .then((res)=>{
      const scholarshipsArray = res.data.loans;
      if(Array.isArray(scholarshipsArray)){
        setSponserData(scholarshipsArray);
      } 
      else{
        console.error("scholarshipsArray is not an array:", scholarshipsArray);
      }
    })
  })
  return (
    <div className='w-screen h-fit'>
      <div className='w-full flex justify-center text-center ' >
        <h1 className='text-3xl md:text-7xl font-bold font-[kodchasan] text-Grubstake'>Sponsers</h1>
      </div>
      <Filter/>
      <CardContainer Data={SponserData} />
    </div>
  )
}

export default Sponsers
