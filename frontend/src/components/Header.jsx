import React, { useState } from "react";
import NavElem from "./NavElem";

const Header = () => {
  return (
    <div className=" flex mx-3 xl:mx-10 justify-between items-center font-[Kodchasan]">
      <div className="flex justify-start xl:justify-center w-fit xl:w-56 items-center py-5 xl:py-10 px-2 ">
        <h1 className="text-xl xl:text-4xl text-Grubstake font-semibold">
          Grubstake
        </h1>
      </div>
      <NavElem />
    </div>
  );
};

export default Header;
