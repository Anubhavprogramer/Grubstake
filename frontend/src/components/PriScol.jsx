import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import CardContainer from './CardContainer'
import axios from 'axios'

const PriScol = () => {
  const [sponserData, setSponserData] = useState([]);

  useEffect(()=>{
    axios.get('/api/v1/Schollerships')
    .then((res)=>{
      // console.log("Response data:", res.data);
      const scholarshipsArray = res.data.scholerships;
      if(Array.isArray(scholarshipsArray)){
        const filteredData = scholarshipsArray.filter(scholership => scholership.isGovernment === false);
        setSponserData(filteredData);
        // console.log("Filtered data:", filteredData);
      } 
      else{
        console.error("scholarshipsArray is not an array:", scholarshipsArray);
      }
    })
    .catch((err)=>{
      console.error("Error fetching data:", err);
    })
  })

  return (
    <div className='w-screen h-fit'>
      <div className='w-full flex justify-center text-center ' >
        <h1 className='text-3xl md:text-7xl font-bold font-[kodchasan] text-Grubstake'>Private Scholarships</h1>
      </div>
      <Filter/>
      <CardContainer Data={sponserData}/>

    </div>
  )
}

export default PriScol
