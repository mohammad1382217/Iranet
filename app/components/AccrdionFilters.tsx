import React from "react";
import AccrodionFilterName from "./AdvanceFilter/FilterName";
import AccrodionFilterDate from "./AdvanceFilter/FilterDate";
import AccrodionFilterNumber from "./AdvanceFilter/FilterNumber";

const AccrodionFilters: React.FC = () => {
  return (
    <div className="flex flex-col  mt-5  w-96  ">
      <AccrodionFilterName />
      <AccrodionFilterDate />
      <AccrodionFilterNumber />
    </div>
  );
};

export default AccrodionFilters;