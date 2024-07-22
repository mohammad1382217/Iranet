import React from "react";
const ButtonComponent = React.lazy(() => import("./Button"));
const Select = React.lazy(() => import("antd/es/select/index"));
import {
  appSlice,
  selectIsLastStep,
  selectSelectedItems,
  SurveySlice,
  useDispatch,
  useSelector,
} from "../../lib/redux";

const NotePhone: React.FC = () => {
  const dispatch = useDispatch();
  const isLastStep = useSelector(selectIsLastStep);
  const selectedItems = useSelector(selectSelectedItems);
  const handleSelectedItemsChange = (selectedItems: string) => {
    dispatch(appSlice.actions.setSelectedItems(selectedItems));
  };
  
  const handleNext = () => {
    !isLastStep && dispatch(SurveySlice.actions.setActiveStep(1));
  };

  return (
    <div className="flex flex-col gap-3.5 mt-5 mb-10 max-w-96">
      <Select
        className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
        size="large"
        value={selectedItems === "" ? null : (selectedItems as string)}
        placeholder="انتخاب گروه"
        defaultValue={selectedItems as string}
        onChange={() => handleSelectedItemsChange(selectedItems as string)}
        style={{
          
        }}
        options={[].map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <ButtonComponent
        onClick={handleNext}
        ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
      >
        تایید و ورود به مرحلۀ بعد
      </ButtonComponent>
    </div>
  );
};

export default NotePhone;