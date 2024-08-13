import React from "react";
import HomeInfo from "./HomeInfo";
import HomeSvg from "./HomeSvg";

const text = [
  "Empowering Your Financial Future, One Innovation at a Time.",
  "Explore Opportunities: Unlock the door to educational success with our comprehensive scholarship database.",
  "Invest in Your Future: Discover the power of compound interest with our investment calculator.",
  "Get Ahead: Learn how to manage your student loans and avoid debt.",
];

const heading = [
  "",
  "Scholarships",
  "Institutional Aid",
  "Banks And Loans",
]

const Home = () => {
  return (
    <div className="h-fit w-screen grid grid-cols-2">
      <div className=" w-screen md:w-full h-fit md:h-full">
        <HomeInfo text={text} heading={heading} />
      </div>
      <div className="w-1/5 lg:w-full h-2/5 lg:h-full hidden sm:block">
        <HomeSvg/>
        <HomeSvg/>
      </div>
    </div>
  );
};

export default Home;
