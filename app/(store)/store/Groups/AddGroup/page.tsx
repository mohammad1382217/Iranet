import React from "react";
import { Input, Select, Button } from "antd";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import Button_component from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import {
  groupsSlice,
  selectGroupOpations,
  selectedGroupOpation,
  selectInputTitileGroup,
  selectGroupsData,
  selectInputTextMessage,
  useSelector,
  useDispatch,
  selectedLengthTextarea,
} from "../../../../../lib/redux";
import Textarea from "../../../../components/TextArea";

const AddGroup: React.FC = () => {
  // textarea
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableGroup = useSelector(selectGroupsData);
  const InputTitileGroup = useSelector(selectInputTitileGroup);
  const InputTextMessage = useSelector(selectInputTextMessage);
  const lenghtTextArea = useSelector(selectedLengthTextarea);
  
  const goback = () => {
    navigate("/store/Groups");
    dispatch(groupsSlice.actions.setTitileGroup(""));
    dispatch(groupsSlice.actions.settextmessage(""));
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(groupsSlice.actions.settextmessage(e.target.value));
    dispatch(groupsSlice.actions.setlenghtTextArea(e.target.value.length));
  };
  
  const handleCreateGroup = () => {
    try {
      const newData = [
        ...tableGroup,
        {
          key: tableGroup.length + 1,
          groupName: InputTitileGroup,
          Notebooks: selectedItems,
          textmessage: InputTextMessage,
          numberUsers: 152,
          disable: false,
          actions: tableGroup.length + 1,
        },
      ];
      dispatch(groupsSlice.actions.setNewData(newData));
      dispatch(groupsSlice.actions.setTitileGroup(""));
      dispatch(groupsSlice.actions.settextmessage(""));
      navigate("/store/Groups");
    } catch (error) {
      alert(error);
    }
  };

  const isDisabled = InputTextMessage === "" || InputTitileGroup === "";

  //select
  const options = useSelector(selectGroupOpations);
  const selectedItems = useSelector(selectedGroupOpation);
  const filteredOptions = options.filter((o) => !selectedItems.includes(o));

  return (
    // <div className="flex flex-col items-center p-10 sm:!p-5 h-full  mx-auto sm:w-80 w-96">
    <div className="flex flex-col items-center sm:px-5 h-full my-10 sm:w-80 w-96 mx-auto">
      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
        فرم ایجاد گروه
      </p>
      <Input
        value={InputTitileGroup}
        onChange={(e) =>
          dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
        }
        placeholder="عنوان گروه"
        className="mt-5 h-10"
      ></Input>
      <Textarea
        ShowCount={true}
        TextAreaClass="mt-3 h-44 p-5"
        MaxLength={100}
        Value={InputTextMessage}
        onChange={onChange}
        Placeholder="متن پیامک اعضای گروه"
      />
      <div className="w-full">
        <p className="text-[#78909C] font-normal text-right text-sm mt-5">
          حداکثر {lenghtTextArea} کاراکتر
        </p>
        <p className="text-[#78909C] font-normal text-right text-sm mt-5">
          کلمه لغو ۱۱ به انتهای همه پیام ها اضافه خواهد شد.
        </p>
      </div>

      <div className="flex flex-row justify-between w-full mt-5">
        <span className="text-[#151515] text-base font-normal">
          تعداد کاراکتر ها: {55}
        </span>
        <span className="text-[#151515] text-base font-normal">
          تعداد پیامک ها: {1}
        </span>
      </div>
      <Select
        className="mt-5"
        size="large"
        placeholder="انتخاب دفترچه"
        value={selectedItems}
        onChange={(e) => dispatch(groupsSlice.actions.setSelectedOption(e))}
        style={{
          width: "100%",
        }}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <Button_component
        disabled={isDisabled}
        ButtonClass="bg-secondary sm:text-[10px] w-full mx-auto mt-10 text-xs font-bold h-11 flex justify-center items-center"
        children="ایجاد گروه"
        onClick={handleCreateGroup}
      />

      <Button
        onClick={goback}
        type="link"
        className="flex items-center justify-center mt-1 mb-5 mx-auto"
        icon={
          <HiOutlineArrowCircleRight
            className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
          />
        }
      >
        <span className="text-sm text-[#151515] font-medium ">
          <span className="text-[#757575]">لغو عملیات و</span> برگشت به داشبورد
        </span>
      </Button>
    </div>
  );
};

export default AddGroup;