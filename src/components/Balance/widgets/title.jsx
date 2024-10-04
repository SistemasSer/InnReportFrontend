import React from "react";

export const Title = ({title}) => {
  return (
    <>
      <p className="mt-5 ml-12 p-0 font-bold text-[45px] text-white">
        {title}
      </p>
      <hr className="mb-3 mx-10 place-content-baseline bg-gray-100 h-2 rounded-lg" />
    </>
  );
};
