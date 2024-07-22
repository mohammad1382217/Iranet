import React from "react";
import { Parag } from "../tools";
import ButtonComponent from "../Button";
import message from "antd/es/message/index";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
const Input = React.lazy(() => import( "antd/es/input/index"));

const AccrodionFilterName: React.FC = () => {
  // const inputData
  const [input, setinput] = React.useState("");
  const [paterns, setpaterns] = React.useState(["سیده سادات", "سید"]);
  const [disable, setDisable] = React.useState(true);

  const handleDelete = () => {
    setDisable(true);
    setpaterns([]);
  };

  const handelAddItem = () => {
    if (input.length > 3) {
      setpaterns([...paterns, input]);
      setinput("");
    } else {
      message.error("متن کوتاه است");
    }
  };

  React.useEffect(() => {
    if (paterns.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [paterns]);

  return (
    <div className="flex flex-col gap-1.5 mt-5 p-3   border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-row items-center mb-2">
        <p lang="fa" role="text" className="text-lg font-extrabold text-[#212121]">فیلتر اسم</p>
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
        <div className="w-full flex flex-row items-center justify-between">
          <Input
            name={""}
            value={input}
            className={
              "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            placeholder={"کلمۀ برگزیده"}
            onChange={(e) => {
              setinput(e.target.value);
            }}
            disabled={false}
          />
        <ButtonComponent
          disabled={false}
          ButtonClass="border border-gray-300 rounded-lg mr-3.5 p-3 bg-white"
          onClick={handelAddItem}
        >
          <FaPlus className="h-3 w-3 text-blue-gray-300" />
        </ButtonComponent>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        {paterns.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-2 text-textColor"
          >
            <Parag Paragraph={`${index + 1} .`} Pclass={""}></Parag>
            <Parag Paragraph={item} Pclass="flex-grow" />
            <HiOutlineMinusCircle
              className="text-red-500 cursor-pointer"
              onClick={() => {
                const updatedPaterns = [...paterns];
                updatedPaterns.splice(index, 1);
                setpaterns(updatedPaterns);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccrodionFilterName;