import React from "react";
import { Parag } from "./tools";
const Tag = React.lazy(() => import("antd/es/tag/index"));
const ButtonComponent = React.lazy(() => import("./Button"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

import {
  appSlice,
  selectSelectedItems,
  useDispatch,
  useSelector,
} from "../../lib/redux";

const RegionAndCountry: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedItems = useSelector(selectSelectedItems);
  const handleSelectedItemsChange = (selectedItems: string) => {
    dispatch(appSlice.actions.setSelectedItems(selectedItems));
  };

  const handleNextLevel = () => {
    dispatch(appSlice.actions.setShowModals("showModalSendByRegion"));
    dispatch(appSlice.actions.setShowModals("showModalSendReport"));
  };

  return (
    <div className="flex flex-col gap-3.5 max-w-96">
      <Parag
        Paragraph={
          "شهر و منطقه مخاطبینی که قصد ارسال پیامک به آنها را دارید انتخاب کنید."
        }
        Pclass={"text-sm text-gray-600 text-right font-normal sm-max:text-xs"}
      />
      <Select
        className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
        size="large"
        value={selectedItems === "" ? null : (selectedItems as string)}
        placeholder="استان"
        defaultValue={selectedItems as string}
        onChange={() => handleSelectedItemsChange(selectedItems as string)}
        style={{}}
        options={[].map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <Select
        className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
        size="large"
        value={selectedItems === "" ? null : (selectedItems as string)}
        placeholder="شهر"
        defaultValue={selectedItems as string}
        onChange={() => handleSelectedItemsChange(selectedItems as string)}
        style={{}}
        options={[].map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <div className="flex items-center gap-2">
        <Parag
          Paragraph={"تعداد شماره های فعال در محدودۀ وارد شده:"}
          Pclass={"text-sm text-gray-600 text-right font-normal sm-max:text-xs"}
        />
        <Tag color="#2196F3">123</Tag>
      </div>
      <Input
        type={"text"}
        name={""}
        className={
          "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        }
        placeholder="تعداد ارسال"
        disabled={false}
      />
      <ButtonComponent
        onClick={handleNextLevel}
        ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
      >
        تایید و ورود به مرحلۀ بعد
      </ButtonComponent>
      <ButtonComponent
        onClick={() => navigate("/store/Dashboard")}
        ButtonClass="flex items-center justify-center mx-auto bg-white shadow-none hover:shadow-none"
      >
        <div className="flex items-center gap-2 text-sm text-[#151515] font-medium">
          <HiOutlineArrowCircleRight
            className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
          />
          <div>
            <span className="text-[#757575]">لغو عملیات و</span> برگشت به
            داشبورد
          </div>
        </div>
      </ButtonComponent>
    </div>
  );
};

export default RegionAndCountry;