import React, { useEffect, lazy, Suspense } from "react";
import moment from "moment-jalaali";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { weekDays } from "../../../../../Register/page";
import { Parag } from "../../../../../components/tools";
import persian from "react-date-object/calendars/persian";
import Textarea from "../../../../../components/TextArea";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import ButtonComponent from "../../../../../components/Button";
import {
  HiOutlineArrowCircleRight,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import {
  SurveySlice,
  addSurveyData,
  fetchDeleteSurveyOptionsThunk,
  fetchSurveyByIdThunk,
  selectIsEdit,
  selectUpdateSurveyData,
  selectUuid,
  useDispatch,
  useSelector,
} from "../../../../../../lib/redux";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Form from "antd/es/form/Form";

const Input = lazy(() => import("antd/es/input/index"));

const ViewSurvey: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idOpinion } = useParams();
  const uuid = useSelector(selectUuid);
  const is_edit = useSelector(selectIsEdit);

  useEffect(() => {
    dispatch(fetchSurveyByIdThunk(idOpinion!));
  }, [dispatch, idOpinion]);

  const updateSurveyData = useSelector(selectUpdateSurveyData);

  const handleEditOpinion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      SurveySlice.actions.setSurveyDataKey({
        key: name as keyof addSurveyData,
        value,
      })
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    dispatch(
      SurveySlice.actions.setSurveyDataKey({
        key: name as keyof addSurveyData,
        value,
      })
    );
  };

  const handleDateChange = (
    name: keyof typeof updateSurveyData,
    date: DateObject | DateObject[] | null
  ) => {
    if (date instanceof DateObject) {
      dispatch(
        SurveySlice.actions.setSurveyDataKey({
          key: name as keyof addSurveyData,
          value: date?.convert(persian, persian_fa).format().toString() ?? "",
        })
      );
    }
  };

  const handleCreateLottery = () => {
    dispatch(SurveySlice.actions.setEditingId(0));
  };

  const handleDelete = (id: number) => {
    dispatch(fetchDeleteSurveyOptionsThunk({ uuid: idOpinion!, id }));
  };

  return (
    <div className="flex flex-col mx-auto justify-center min-h-screen items-center my-10 sm-max:w-80 w-96 ">
      <p
        lang="fa"
        role="text"
        className="text-2xl p-1 text-right self-start font-semibold sm-max:text-base text-textColor"
      >
        فرم ویرایش نظرسنجی
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Input
          value={updateSurveyData?.title}
          onChange={handleEditOpinion}
          name="title"
          disabled={is_edit}
          placeholder="عنوان نظرسنجی"
          className="mt-5 h-10 disabled:text-gray-600 disabled:bg-white disabled:border-gray-300 disabled:cursor-not-allowed select-none"
        />
      </Suspense>
      <Textarea
        ShowCount={true}
        Name="text"
        disabled={is_edit}
        TextAreaClass="mt-3 h-44 disabled:!text-gray-600 disabled:!bg-white disabled:!border-gray-300 disabled:!cursor-not-allowed select-none"
        Value={updateSurveyData?.text}
        MaxLength={100}
        onChange={handleChange}
        Placeholder="متن سوال"
      />
      <Form className="w-full flex flex-row items-center justify-between">
        <Suspense fallback={<div>Loading...</div>}>
          <Input
            onChange={handleChange}
            placeholder="متن گزینه ها"
            className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4 mt-5 disabled:text-gray-600 disabled:bg-white disabled:border-gray-300 disabled:cursor-not-allowed select-none"
            name="title"
            disabled={is_edit}
          />
        </Suspense>
        <ButtonComponent
          Type="submit"
          disabled={is_edit}
          ButtonClass="border border-gray-300 rounded-lg mr-3.5 p-3 mt-5 bg-white disabled:text-gray-600 disabled:bg-white disabled:border-gray-300 disabled:cursor-not-allowed select-none"
        >
          <FaPlus className="h-3 w-3 text-blue-gray-300" />
        </ButtonComponent>
      </Form>
      <Parag
        Paragraph={"حداکثر تعداد گزینه ها، 10 عدد می‌باشد"}
        Pclass={"mt-2.5 text-sm font-normal text-blue-gray-400 self-start"}
      />

      {updateSurveyData?.options.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-center gap-2 text-textColor w-full mt-3.5"
        >
          <Parag Paragraph={`${index + 1} .`} Pclass={""}></Parag>
          <Parag Paragraph={item.title} Pclass="flex-grow" />
          <HiOutlineMinusCircle
            aria-disabled={is_edit}
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ))}

      <DatePicker
        format="HH:mm:ss YYYY/MM/DD"
        value={moment(updateSurveyData?.start_time).format(
          "HH:mm:ss jYYYY/jMM/jDD"
        )}
        onChange={(date) => handleDateChange("start_time", date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 disabled:text-gray-600 disabled:bg-white disabled:border-gray-300 disabled:cursor-not-allowed select-none"
        placeholder="تاریخ شروع"
        plugins={[<TimePicker position="bottom" />]}
        disabled={is_edit}
      />
      <DatePicker
        format="HH:mm:ss YYYY/MM/DD"
        value={moment(updateSurveyData?.end_time).format(
          "HH:mm:ss jYYYY/jMM/jDD"
        )}
        onChange={(date) => handleDateChange("end_time", date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 disabled:text-gray-600 disabled:bg-white disabled:border-gray-300 disabled:cursor-not-allowed select-none"
        placeholder="تاریخ پایان"
        plugins={[<TimePicker position="bottom" />]}
        disabled={is_edit}
      />
      <Link to="/store/Survey" className="w-full">
        <ButtonComponent
          disabled={is_edit}
          ButtonClass="bg-secondary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          onClick={handleCreateLottery}
        >
          ویرایش نظرسنجی
        </ButtonComponent>
      </Link>
      <Link to="/store/Survey">
        <ButtonComponent ButtonClass="flex items-center justify-center mt-1 mx-auto bg-white shadow-none hover:shadow-none">
          <div className="flex items-center gap-2 text-sm text-textColor font-medium">
            <HiOutlineArrowCircleRight
              className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
            />
            <div>
              <span className="text-[#757575]">لغو عملیات و</span> برگشت به
              داشبورد
            </div>
          </div>
        </ButtonComponent>
      </Link>
    </div>
  );
};

export default ViewSurvey;
