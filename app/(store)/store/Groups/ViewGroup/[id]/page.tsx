import { Input, Select, Button } from "antd";
import React, { useEffect, ChangeEvent } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Button_component from "../../../../../components/Button";
import { NavLink, useParams, useNavigate } from "react-router-dom";
const { TextArea } = Input;
import {
  groupsSlice,
  selectGroupOpations,
  selectedGroupOpation,
  selectInputTitileGroup,
  selectGroupsData,
  selectInputTextMessage,
  useSelector,
  useDispatch,
} from "../../../../../../lib/redux";

const ViewGroup : React.FC = () => {
  // let textarea;
  const [lenghtTextArea, setlenghtTextArea] = React.useState(0);
  const { idGroup } = useParams<{ idGroup: string }>();
  const parsedIdGroup = idGroup!;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goback = () => {
    navigate("/store/Groups");
    dispatch(groupsSlice.actions.setTitileGroup(""));
    dispatch(groupsSlice.actions.settextmessage(""));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(groupsSlice.actions.settextmessage(e.target.value));
    setlenghtTextArea(e.target.value.length);
  };
  console.log(onChange);
  const tableGroup = useSelector(selectGroupsData);
  const InputTitileGroup = useSelector(selectInputTitileGroup);
  const InputTextMessage = useSelector(selectInputTextMessage);

  const handleEditGroup = () => {
    const newData = [...tableGroup];
    newData.splice(parseInt(parsedIdGroup) - 1, 1, {
      ...newData[parseInt(parsedIdGroup) - 1],
      groupName: InputTitileGroup,
      Notebooks: selectedItems,
      textmessage: InputTextMessage,
    });
    dispatch(groupsSlice.actions.setNewData(newData));
    dispatch(groupsSlice.actions.setTitileGroup(''));
    dispatch(groupsSlice.actions.settextmessage(''));
    navigate('/store/groups');
  };

  useEffect(() => {
    dispatch(groupsSlice.actions.setTitileGroup(tableGroup[parseInt(parsedIdGroup) - 1].groupName));
    dispatch(groupsSlice.actions.settextmessage(tableGroup[parseInt(parsedIdGroup) - 1].textmessage));
    dispatch(groupsSlice.actions.setSelectedOption(tableGroup[parseInt(parsedIdGroup) - 1].Notebooks));
  }, [dispatch, parsedIdGroup, tableGroup]);

  const isDisabled = InputTextMessage === "" || InputTitileGroup === "";
  //select
  const OPTIONS = useSelector(selectGroupOpations);
  const selectedItems = useSelector(selectedGroupOpation);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <div>
      <div className="flex flex-col mx-auto justify-center items-center my-10 sm:px-5 sm:w-80 w-96 ">
      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
          فرم مشاهده و ویرایش گروه
        </p>
        <Input
          value={InputTitileGroup}
          onChange={(e) =>
            dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
          }
          placeholder="عنوان گروه"
          className="mt-5 h-10"
        ></Input>
        <TextArea
          value={InputTextMessage}
          onChange={(e) =>
            dispatch(groupsSlice.actions.settextmessage(e.target.value))
          }
          showCount
          className="mt-3 font-['Estedad-FD'] h-44"
          maxLength={100}
          style={{ fontFamily: "Estedad-FD" }}
          placeholder="متن پیامک اعضای گروه"
        />
        <div className="w-full">
          <p className="text-[#78909C] font-normal text-sm  text-right mt-5">
            حداکثر {lenghtTextArea} کاراکتر
          </p>
          {/* <p className="text-[#78909C] font-normal text-sm mt-5">
            کلمه لغو ۱۱ به انتهای همه پیام ها اضافه خواهد شد.
          </p> */}
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
          onClick={handleEditGroup}
          ButtonClass="bg-[#2DCEA2] w-full mx-auto mt-10 text-xs font-bold h-11 flex justify-center items-center"
          children="ذخیرۀ تغییرات"
        />

        {/* <Button
          onClick={goback}
          type="link"
          className="flex items-center justify-center my-5 mx-auto"
          icon={
            <ArrowRightCircleIcon
              color="#E53935"
              strokeWidth={2.5}
              className={"h-3.5 w-3.5 mx-auto"}
            />
          }
        >
          <NavLink to={"/store/groups"}>
            <span className="text-sm text-[#151515] font-medium ">
              برگشت به داشبورد
            </span>
          </NavLink>
        </Button> */}
        <Button
        onClick={goback}
        type="link"
        className="flex items-center justify-center mt-1 mb-5 mx-auto"
        icon={
          <ArrowRightCircleIcon
          color="#E53935"
          strokeWidth={2.5}
          className={"h-3.5 w-3.5 mx-auto"}
        />
        }
      >
        <span className="text-sm text-[#151515] font-medium ">
          <span className="text-[#757575]">لغو عملیات و</span> برگشت به داشبورد
        </span>
      </Button>
      </div>
    </div>
  );
};

export default ViewGroup;