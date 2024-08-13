import React from 'react';

const Card = ({ name, link, ScholarshipType, avatar, Application_Starting, Application_Closing, amount, eligibilityCriteria, provider, instituteCreated }) => {
  return (
    <div className='h-fit sm:h-96 w-80 bg-blue-900 text-white rounded-xl overflow-hidden'>
      <div className='w-full h-[60%] sm:h-2/3 p-2 '>
        <img className='h-full w-full rounded-lg' src={avatar} alt={`${name} logo`} />
      </div>
      <div className='w-full h-1/3 px-2 pb-2 font-[kodchasan]'>
        <div><span><strong>Application Start: </strong></span><span>{Application_Starting}</span></div>
        <div><span><strong>Application Close: </strong></span><span>{Application_Closing}</span></div>
        <div><span><strong>Amount: </strong></span><span>{amount}</span></div>
        <div className='flex justify-end'><span><a href={link}>Read more..</a></span></div>
      </div>
    </div>
  );
};

export default Card;
