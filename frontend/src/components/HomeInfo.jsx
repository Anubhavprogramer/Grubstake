import React from "react";

const HomeInfo = ({ text, heading }) => {
  return (
    <>
      {text.map((t, index) => (
        <div
          key={index} // Add the key prop here
          className="w-full h-fit lg:h-[90vh] flex-col flex justify-start xl:justify-center items-center px-5 md:px-10 lg:px-20"
        >
          <span className="text-3xl md:text-5xl justify-start my-9 font-bold text-Grubstake font-[Lexend] hover:underline ">
            {heading[index]}
          </span>
          <span className="font- text-3xl md:text-4xl lg:5xl xl:6xl text-Grubstake font-[Lexend]">
            {t}
          </span>
          <button className="my-20 text-xl md:text-2xl lg:text-5xl px-5 py-3 text-white bg-gradient-to-b from-slate-200 bg-Grubstake rounded-full lg:w-[300px] lg:h-16 font-regular font-[Kodchasan]">
            More Info
          </button>
        </div>
      ))}
    </>
  );
};

export default HomeInfo;
