import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import CardContainer from './CardContainer';
import axios from 'axios';

const GovScol = () => {
  const [sponserData, setSponserData] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/Schollerships')
      .then((res) => {
        // console.log("Response data:", res.data); // Log to check if data is received
        const scholarshipsArray = res.data.scholerships; // Access the scholarships array
        if (Array.isArray(scholarshipsArray)) {
          const filteredData = scholarshipsArray.filter(scholarship => scholarship.isGovernment === true);
          setSponserData(filteredData);
          // console.log("Filtered data:", filteredData); // Log filtered data
        } else {
          console.error("scholarshipsArray is not an array:", scholarshipsArray);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className='w-screen h-fit'>
      <div className='w-full flex justify-center text-center'>
        <h1 className='text-3xl md:text-7xl font-bold font-[kodchasan] text-Grubstake'>Government Scholarships</h1>
      </div>
      <Filter />
      <CardContainer Data={sponserData} />
    </div>
  );
};

export default GovScol;
