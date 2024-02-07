import React from "react";
import { useSelector, selectNotePhone } from "../../lib/redux";
import { DateObject } from "react-multi-date-picker";
import { AccrodionFilterName } from "./AdvanceFilter/FilterName";
import { AccrodionFilterDate } from "./AdvanceFilter/FilterDate";
import { AccrodionFilterNumber } from "./AdvanceFilter/FilterNumber";

export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export const AccrodionFilters: React.FC = () => {
  const NotePhone = useSelector(selectNotePhone);
  // const inputData
  const handleDelete = () => {};
  const handleDateChange = (date: DateObject | DateObject[] | null) => {
    // SetData(data);
  };
  // const [data, SetData] = useState("");
  return (
    // <div>
    <div className="flex flex-col  mt-5  w-96  ">
      <AccrodionFilterName />
      <AccrodionFilterDate />
      <AccrodionFilterNumber />
    </div>
  );
};
