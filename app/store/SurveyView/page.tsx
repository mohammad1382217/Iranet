import React from "react";
import { Field, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Form from "antd/es/form/index";
import Radio from "antd/es/radio/index";
import type { RadioChangeEvent } from "antd/es/radio/interface";
import ButtonComponent from "../../components/Button";
import xmark from "../../assets/images/circle-xmark-solid.svg";
import {
  fetchSurveyByIdThunk,
  selectUpdateSurveyData,
  useDispatch,
  useSelector,
} from "../../../lib/redux";
import Avatar from "antd/es/avatar/avatar";
import LazyImage from "../../components/LazyImage";
const Space = React.lazy(() => import("antd/es/space/index"));

const SurveyView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const updateSurveyData = useSelector(selectUpdateSurveyData);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchSurveyByIdThunk(id!));
  }, []);

  const STATUS = {
    ACCESS: "ACCESS",
    PENDING: "PENDING",
    NOT_ACCESS: "NOT_ACCESS",
  };

  let status = STATUS.ACCESS;
  if (updateSurveyData?.status === "Q") {
    status = STATUS.PENDING;
  } else if (updateSurveyData?.status === "E") {
    status = STATUS.NOT_ACCESS;
  }

  const renderContent: React.FC = () => {
    switch (status) {
      case STATUS.PENDING:
        return (
          <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 p-6">
             <h1 className="text-[#2196F3] text-3xl font-bold text-center">
               نظرسنجی هنوز آغاز نشده است!
             </h1>
             <p lang="fa" role="text" className="text-gray-600">با تشکر از مشارکت شما</p>
           </div>
        );
      case STATUS.NOT_ACCESS:
        return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 p-6">
      <LazyImage className="bg-cover" src={xmark} alt="" width={10} height={10} />
      <h1 className="text-red-600 text-3xl font-bold text-center">
        نظرسنجی با موفقیت انجام شد
      </h1>
      <p lang="fa" role="text" className="text-gray-600">با تشکر از مشارکت شما</p>
    </div>
        );
      default:
        return  <section className="flex flex-col">
        <header className="sticky top-0 left-0 right-0 z-20 w-full bg-[#F9DBDB] flex border-b border-solid border-[#dee2e6] lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out">
          <nav className="h-36 lg-max:h-28 flex flex-[1_0_0] flex-wrap lg-max:mr-0 lg-max:px-3 items-center justify-center px-10 py-2 lg-max:py-4 gap-4">
            <Avatar />
            <h1 className="text-[#630303] text-4xl font-bold">
              {updateSurveyData.store_name}
            </h1>
          </nav>
        </header>
        <main className="min-h-[calc(100vh-9rem] h-[calc(100vh-9rem)] lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out">
          <section className="max-w-xl mx-auto flex flex-col items-center justify-center gap-3 p-6 mt-24 lg-max:mt-20">
            <h2 className="w-full text-2xl font-semibold text-textColor">
              {updateSurveyData.text}
            </h2>
            <div className="w-full flex gap-3.5 p-6 border border-t-0 border-blue-gray-100 rounded-lg shadow">
              <Radio.Group onChange={onChange}>
                <Space direction="vertical">
                  {updateSurveyData.options.map((item, index) => (
                    <Radio
                      className="text-blue-gray-400 text-base fint-medium"
                      value={index + 1}
                    >
                      {item.title}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
            <h3 className="w-full text-lg font-normal text-textColor">
              برای ثبت نظر خود، اطلاعات خود را وارد کنید
            </h3>
            <Formik
              initialValues={{
                fullName: "",
                phone: "",
              }}
              onSubmit={(values) => {
                console.log("1");
                if (values) {
                  console.log(values);
                  navigate("/store/SurveyView/SurveyResult");
                }
              }}
            >
              {({ handleChange, values }) => (
                <Form className="w-full flex flex-col items-center justify-center gap-3.5">
                  <Field
                    placeholder={"نام و نام خانوادگی*"}
                    type="text"
                    className="placeholder:text-blue-gray-300 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="fullName"
                    onChange={(e: React.ChangeEvent) => {
                      handleChange(e);
                      console.log(values);
                    }}
                  />
                  <Field
                    placeholder={"شماره تماس*"}
                    type="text"
                    className="placeholder:text-blue-gray-300 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="phone"
                    onChange={(e: React.ChangeEvent) => {
                      handleChange(e);
                      console.log(values);
                    }}
                  />
                  <ButtonComponent
                    Type="submit"
                    onClick={() => navigate("/store/SurveyView/SurveyResult")}
                    ButtonClass="w-full bg-secondary text-xs font-bold sm-max:p-2 h-11 flex justify-center items-center"
                  >
                    ثبت نظر
                  </ButtonComponent>
                </Form>
              )}
            </Formik>
          </section>
        </main>
      </section>;
    }
  };

  return renderContent({});
};

export default SurveyView;
