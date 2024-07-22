import React from "react";
import Modal from "../../../components/Modal";
import { Parag } from "../../../components/tools";
import { Link, useNavigate } from "react-router-dom";
import { chartList } from "../../../(store)/store/Dashboard/page";
import HeaderWithButton from "../../../components/HeaderWithButton";
import ProgressBarChart from "../../../components/ProgressBarChart";
import ParticipantsDialogTable from "../../../components/ParticipantsDialogTable";
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const Space = React.lazy(() => import( "antd/es/space/index"));
const Button = React.lazy(() => import( "antd/es/button/index"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));

import {
  SurveyDataAdmin,
  SurveySlice,
  appSlice,
  selectShowModalParticipants,
  selectShowModals,
  selectSurveyDataAdmin,
  selectSurveyDatum,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
import CustomTable, { CustomColumnType } from "../../../components/Table";

const ListOfPolls: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModals = useSelector(selectShowModals);
  const showModalParticipants = useSelector(selectShowModalParticipants);
  const SurveyDatum = useSelector(selectSurveyDatum);
  const SurveyDataAdmin = useSelector(selectSurveyDataAdmin);

  const editHandler = (id: number) => {
    // dispatch(SurveySlice.actions.setEditingId(id));
    // const editSurvey = SurveyDatum?.filter(SurveyData => SurveyData.key === id)[0];
    // dispatch(SurveySlice.actions.setSurveyData(editSurvey));
  };

  const status = (key: string) => {
    switch (key) {
      case "متوقف شده":
        return (
          <p lang="fa" role="text" className="flex flex-row justify-center items-baseline">
            متوقف شده
            <Badge className="mr-1" size="default" status="error" />
          </p>
        );
      case "در جریان":
        return (
          <p lang="fa" role="text" className="flex flex-row justify-center items-baseline">
            در جریان
            <Badge className="mr-1" size="default" status="success" text="" />
          </p>
        );
      case "در صف":
        return (
          <p lang="fa" role="text" className="flex flex-row justify-center items-baseline">
            در صف
            <Badge className="mr-1" size="default" status="processing" />
          </p>
        );
      default:
        return (
          <p lang="fa" role="text" className="flex flex-row justify-center items-baseline">
            پایان زمان
            <Badge className="mr-1" size="default" status="default" />
          </p>
        );
    }
  };

  const stopSurveyHandler = (record: SurveyDataAdmin) => {
    const updatedData = SurveyDatum.map((item) =>
      item.uuid === record.key ? { ...item, surveyStatus: "متوقف شده" } : item
    );
    dispatch(SurveySlice.actions.setSurveyDatum(updatedData));
  };

  const columns: CustomColumnType<SurveyDataAdmin>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "store_name",
      key: "store_name",
      searchProps: true,
    },
    {
      title: "عنوان نظرسنجی",
      dataIndex: "survayTitle",
      key: "survayTitle",
      searchProps: true,
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      DateRangeProps: true,
      sorter: (a, b) => a.start_time.localeCompare(b.start_time),
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "وضعیت نظرسنجی",
      dataIndex: "surveyStatus",
      key: "surveyStatus",
      align: "center",

      filters: [
        {
          text: "متوقف شده",
          value: "متوقف شده",
        },
        {
          text: "درجریان",
          value: "درجریان",
        },
        {
          text: "پایان زمان",
          value: "پایان زمان",
        },
        {
          text: "در صف",
          value: "در صف",
        },
      ],
      onFilter: (value: React.Key | boolean, record: SurveyDataAdmin) =>
        record.status.includes(value as string),
      render: (key: string) => (
        <Space direction="horizontal">{status(key)}</Space>
      ),
    },
    {
      title: "نتایج",
      dataIndex: "surveyResults",
      key: "surveyResults",
      align: "center",

      render: () => (
        <Button className="p-0" type="link" onClick={showModalHandler}>
          مشاهده نتایج
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "survayLinks",
      key: "survayLinks",
      render: (text: string, record: SurveyDataAdmin, index: number) => (
        <Space>
          <Button
            className="p-0"
            type="link"
            onClick={showModalResultSurveyHandler}
          >
            لینک نظرسنجی
          </Button>
          <Link to={`/admin/ListOfPolls/AddOrEditSurvey`}>
            <Button
              className="p-0"
              type="link"
              onClick={() => editHandler(index + 1)}
            >
              ویرایش
            </Button>
          </Link>
          <Button
            type="link"
            className={`p-0
              ${
                record.status === "متوقف شده"
                  ? "text-red-100"
                  : "text-red-700"
              }
                `}
            onClick={() => stopSurveyHandler(record)}
          >
            توقف نظرسنجی
          </Button>
        </Space>
      ),
    },
  ];

  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
  };

  const showModalResultSurveyHandler = () => {
    dispatch(appSlice.actions.setShowModals("showModalResultSurvey"));
  };

  const showModalParticipantsHandler = () => {
    dispatch(SurveySlice.actions.setShowModalParticipants());
    showModalHandler();
  };
  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton HeaderTitle={"لیست تمام نظرسنجی ها"} />

      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <CustomTable
          bordered
          size="large"
          dataSource={SurveyDataAdmin}
          columns={columns}
          theme="primary"
        />
      </div>
      <Modal
        modalHeaderClass="flex flex-row justify-between"
        modalHeader={
          <>
            <h3 className="text-2xl font-semibold text-gray-900">
              نمایش عمومی
            </h3>
          </>
        }
        modalBody={
          <>
            <Parag
              Paragraph={"لینک صفحۀ عمومی شرکت در نظرسنجی:"}
              Pclass={"text-base font-normal text-blue-gray-500 mb-4"}
            />
            <div className="container relative inline-flex items-center">
              <Input
                dir="ltr"
                placeholder="https://backend-irannet.liara.run/"
                className="absolute flex items-center justify-center gap-2.5 flex-grow flex-shrink-0 rounded-lg border-blue-gray-100 h-10 py-3 pl-3 pr-1.5 placeholder:leading-tight placeholder:text-sm placeholder:font-normal placeholder:text-blue-gray-300 cursor-auto"
                readOnly
              />
              <ButtonComponent
                ButtonClass={
                  "flex shrink-0 items-center justify-center relative -left-1 h-8 sm-max:!p-3 bg-blue-gray-300 text-xs font-bold ml-64"
                }
              >
                کپی کردن
              </ButtonComponent>
            </div>
          </>
        }
        modalFooter={
          <div className="w-full flex gap-4">
            <ButtonComponent
              onClick={() => navigate("/store/SurveyView")}
              ButtonClass="w-full bg-white text-xs font-bold text-black h-10 flex items-center justify-center border border-[#2DCEA2]"
            >
              مشاهده نظرسنجی
            </ButtonComponent>
            <ButtonComponent
              onClick={showModalResultSurveyHandler}
              ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
            >
              بستن
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex items-center justify-end"
        Open={showModals.showModalResultSurvey}
        HandleOpen={showModalResultSurveyHandler}
      />
      <Modal
        modalHeaderClass="flex flex-row justify-between pb-2"
        modalHeader={
          <div className="container flex items-center justify-between text-xl font-semibold sm-max:text-base">
            <h3 className="text-gray-900">تعداد مشارکت کنندگان</h3>
            <div className="flex items-center justify-center bg-[#D9EEFE] py-2.5 px-5 rounded">
              <p lang="fa" role="text">123 نفر</p>
            </div>
          </div>
        }
        modalBody={
          <>
            <ProgressBarChart chartData={chartList} />
          </>
        }
        modalFooter={
          <div className="flex items-center gap-6 sm-max:gap-4">
            <ButtonComponent
              onClick={showModalHandler}
              ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
            >
              بستن
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex items-center justify-end pt-2"
        Open={showModals.showModalOrigin}
        HandleOpen={showModalHandler}
      />
      <Modal
        modalHeaderClass="flex flex-row justify-between pb-2"
        modalHeader={
          <div className="container flex items-center justify-between text-xl font-semibold sm-max:text-base">
            <h3 className="text-gray-900">لیست شرکت کنندگان</h3>
            <div className="flex items-center justify-center bg-[#DFF8F2] py-2.5 px-5 rounded">
              <p lang="fa" role="text">نام نظرسنجی</p>
            </div>
          </div>
        }
        modalBody={
          <>
            <ParticipantsDialogTable tableData={[]} />
          </>
        }
        modalFooter={
          <div className="flex items-center justify-center gap-6 sm-max:gap-4">
            <ButtonComponent
              onClick={showModalParticipantsHandler}
              ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
            >
              بستن
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex items-center justify-end pt-2"
        Open={showModalParticipants}
        HandleOpen={showModalHandler}
      />
    </div>
  );
};

export default ListOfPolls;