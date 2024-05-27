import React from "react";

// Define an array of objects representing the data for each company logo
const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chainlink_Logo_Blue.svg/2560px-Chainlink_Logo_Blue.svg.png",
    alt: "Chainlink",
    width: 158,
    height: 48,
  },
  {
    src: "https://global.discourse-cdn.com/standard11/uploads/scroll2/original/1X/8834ad8a6b9e71657369ca74314393852ff6a81e.png",
    alt: "Scroll",
    width: 158,
    height: 48,
  },
  {
    src: "https://seeklogo.com/images/A/ankr-crypto-blockchain-nodes-logo-9DABC43C1B-seeklogo.com.png",
    alt: "Ankr",
    width: 158,
    height: 48,
  },
  {
    src: "https://sindri.app/img/logo-with-sindri.svg",
    alt: "Sindri",
    width: 158,
    height: 48,
  },
  {
    src: "https://seeklogo.com/images/T/the-graph-grt-logo-29502E1E1E-seeklogo.com.png",
    alt: "The Graph",
    width: 158,
    height: 48,
  },
];

export default function Tools() {
  return (
    <div className="bg-white py-24 sm:py-32 ">
      <div className="bg-repeat w-full h-full text-primary-100 heropattern-wiggle-slate-200 pb-10 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-lg font-semibold leading-8 text-gray-900">
              Built With
            </h2>
            <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
