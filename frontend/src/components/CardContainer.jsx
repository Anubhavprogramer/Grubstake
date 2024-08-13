import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardContainer = ({ Data = [] }) => {
  if (!Data || !Array.isArray(Data)) {
    return <div>No sponsors available</div>;
  }

  return (
    <div className='h-fit justify-center w-screen p-10 flex gap-10 flex-wrap'>
      {Data.map((sponsor, index) => (
        <Card
          key={index}
          name={sponsor.name}
          link={sponsor.link}
          ScholarshipType={sponsor.ScholarshipType}
          avatar={sponsor.avatar}
          Application_Starting={sponsor.Application_Starting}
          Application_Closing={sponsor.Application_Closing}
          amount={sponsor.amount}
          eligibilityCriteria={sponsor.eligibilityCriteria}
          provider={sponsor.provider}
          instituteCreated={sponsor.instituteCreated}
        />
      ))}
    </div>
  );
};

CardContainer.propTypes = {
  Data: PropTypes.array
};

export default CardContainer;
