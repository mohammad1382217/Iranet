import React from "react";
import { AccordionCustomIcon } from "../../../../../components/Accordion";
import { NavLink } from "react-router-dom";
import { TableInputNote } from "../../../../../components/TableInputNote/TableInputNote";
import { Select, Tag, Input, Button } from "antd";
import "../../../../../components/TableInputNote/TableInputNote.scss";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { UsersNote } from "../../../../../components/UsersNote";
import Button_component from "../../../../../components/Button";
import { notesSlice, selectSelectedItems, useDispatch, useSelector } from "../../../../../../lib/redux";

const options: string[] = ["کشاورزی", "خوراکی", "لباس ها", "نام گروه"];

const ViewNotePhone : React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectSelectedItems);
  const filteredOptions = options.filter((o) => !selectedItems.includes(o));

  const handleSelectedItemsChange = (selectedItems: string[]) => {
    dispatch(notesSlice.actions.setSelectedItems(selectedItems));
  };

  return (
    <div className="flex flex-col items-center p-10 px-20 sm:!p-5 w-full h-full">
      <AccordionCustomIcon headerTitle="اطلاعات دفترچه" Id={1}>
        <div className="w-96 m-3 px-3 mx-auto">
          <p className="font-semibold text-2xl sm:text-xl mb-5 text-[#151515]">
            ایجاد دفترچه تلفن جدید
          </p>
          <Input
            size="large"
            placeholder="عنوان دفترچه"
            className="mt-2"
          />
          <Select
            className="mt-5"
            mode="multiple"
            size="large"
            placeholder="انتخاب گروه"
            value={selectedItems}
            onChange={handleSelectedItemsChange}
            style={{
              width: "100%",
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />
          <div className="flex flex-row justify-between mt-5">
            <div>
              <span className="ml-3 text-sm">تعداد شماره ها:</span>
              <Tag color="#2196F3">0</Tag>
            </div>
            <div>
              <span className="ml-3 text-sm">تعداد گروه ها:</span>
              <Tag color="#2196F3">0</Tag>
            </div>
          </div>
        </div>
      </AccordionCustomIcon>
      <AccordionCustomIcon headerTitle="فیلد های دفترچه" Id={2}>
        <TableInputNote />
      </AccordionCustomIcon>
      <AccordionCustomIcon headerTitle="مخاطبین دفترچه" Id={3}>
        <UsersNote />
      </AccordionCustomIcon>
      <div className="flex flex-col items-center h-full mx-auto">
        <NavLink to={`/store/notes`}>
          <Button_component
            ButtonClass="bg-[#2DCEA2] w-64 mx-auto mt-10 text-xs font-bold h-11 flex justify-center items-center"
            children="ذخیرۀ تغییرات"
          />
        </NavLink>
        
        <NavLink to={`/store/notes`}>
          <Button
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
        </NavLink>
      </div>
    </div>
  );
};

export default ViewNotePhone;