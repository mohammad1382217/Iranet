import React from "react";
import ButtonComponent from "../Button";
import { FaRegTrashAlt } from "react-icons/fa";
const Input = React.lazy(() => import( "antd/es/input/index"));

const AccrodionFilterNumber: React.FC = () => {
  // const inputData
  const [input, setinput] = React.useState(["", ""]);
  const [disable, setDisable] = React.useState(true);
  const handleDelete = () => {
    setinput(["", ""]);
    setDisable(true);
  };
  React.useEffect(() => {
    if (input[0].length > 0 || input[1].length > 0) {
      setDisable(false);
      console.log(input[0].length);
    }
  }, input);
  // const handleDateChange = (date: DateObject | DateObject[] | null) => {};
  
  return (
    <div className="flex flex-col gap-2.5 mt-5 p-3   border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-row items-center">
        <p lang="fa" role="text" className="text-lg font-extrabold text-[#212121]">فیلتر سایز کفش</p>
        <ButtonComponent
          disabled={disable}
          onClick={handleDelete}
          ButtonClass={`${
            disable ? "border-[#CFD8DC]" : "border-[#E53935]"
          } !w-[105px] !h-[34px]  border-2 bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2`}
        >
          <span className="text-[12px] text-[#263238]">حذف فیلتر</span>
          <FaRegTrashAlt className="w-4 h-4 leading-normal text-[#263238]" />
        </ButtonComponent>
      </div>
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p lang="fa" role="text" className="w-16 text-base font-normal text-textColor">از تعداد</p>

          <Input
            type={"Number"}
            name={""}
            value={input[0]}
            className={
              "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
            }
            // Placeholder={"کلمۀ برگزیده"}
            onChange={(e) => {
              setinput([e.target.value, input[1]]);
            }}
            disabled={false}
          />
        </div>
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p lang="fa" role="text" className="w-16 text-base font-normal text-textColor">تا تعداد</p>

          <Input
            disabled={false}
            type={"Number"}
            value={input[1]}
            name={""}
            className={
              "outline-0 bg-white h-8 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
            }
            // Placeholder={"کلمۀ برگزیده"}
            onChange={(e) => {
              setinput([input[0], e.target.value]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AccrodionFilterNumber;