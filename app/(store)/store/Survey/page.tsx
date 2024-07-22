import React from "react";
import moment from "moment-jalaali";
import { chartListType } from "../Dashboard/page";
import Modal from "../../../components/Modal";
import { Parag } from "../../../components/tools";
import { Link, useNavigate } from "react-router-dom";
import "../../../components/TableInputNote/TableInputNote.scss";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import ProgressBarChart from "../../../components/ProgressBarChart";
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import ParticipantsDialogTable from "../../../components/ParticipantsDialogTable";
import {
  SurveyData,
  SurveySlice,
  appSlice,
  fetchSurveyMemberThunk,
  fetchSurveyResultThunk,
  fetchSurveyStopThunk,
  fetchSurveyThunk,
  selectIsStatusSurvey,
  selectShowModalParticipants,
  selectShowModals,
  selectSurveyDatum,
  selectSurveyMembers,
  selectSurveyResults,
  selectSurveyTitle,
  selectUuid,
  surveyResults,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";

const Spin = React.lazy(() => import("antd/es/spin/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Space = React.lazy(() => import("antd/es/space/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Input = React.lazy(() => import("antd/es/input/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));

const Survey: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchSurveyThunk());
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://front-irannet.liara.run/store/SurveyView/${uuid}`)
      .then(() => {
        alert("متن با موفقیت کپی شد!");
      })
      .catch((err) => {
        console.error("خطا در کپی کردن متن: ", err);
      });
  };

  const uuid = useSelector(selectUuid);
  const isLoadingSurvey = useSelector(selectIsStatusSurvey);
  const surveyMembers = useSelector(selectSurveyMembers);
  const showModals = useSelector(selectShowModals);
  const showModalParticipants = useSelector(selectShowModalParticipants);
  const SurveyDatum = useSelector(selectSurveyDatum);
  const SurveyResults = useSelector(selectSurveyResults);
  const surveyTitle = useSelector(selectSurveyTitle);
  const colors = ["#FF5050", "#FD6E6E", "#FF9C9C"];

  const transformData = (
    surveyResults: surveyResults,
    colors: string[]
  ): chartListType[] => {
    const entries = Object.entries(surveyResults.data);
    return entries.map(([lable, percent], index) => ({
      lable,
      percent: [percent, 100 - percent], // محاسبه مکمل درصد
      fill: colors[index] || "#FFFFFF",
    }));
  };

  const handleShowResult = async (uuid: string, title: string) => {
    dispatch(fetchSurveyResultThunk({ uuid }));
    dispatch(SurveySlice.actions.setUuid(uuid));
    dispatch(SurveySlice.actions.setSurvayTitle(title));
    showModalHandler();
  };

  const stopSurveyHandler = async (uuid: string) => {
    await dispatch(fetchSurveyStopThunk({ uuid }));
    await dispatch(fetchSurveyThunk());
  };

  const status = (status: string) => {
    switch (status) {
      case "S":
        return (
          <p
            lang="fa"
            role="text"
            className="flex flex-row justify-center items-baseline"
          >
            متوقف شده
            <Badge className="mr-1" size="default" status="error" />
          </p>
        );
      case "D":
        return (
          <p
            lang="fa"
            role="text"
            className="flex flex-row justify-center items-baseline"
          >
            در جریان
            <Badge className="mr-1" size="default" status="success" text="" />
          </p>
        );
      case "Q":
        return (
          <p
            lang="fa"
            role="text"
            className="flex flex-row justify-center items-baseline"
          >
            در صف
            <Badge className="mr-1" size="default" status="processing" />
          </p>
        );
      default:
        return (
          <p
            lang="fa"
            role="text"
            className="flex flex-row justify-center items-baseline"
          >
            پایان زمان
            <Badge className="mr-1" size="default" status="default" />
          </p>
        );
    }
  };

  const editHandler = (id: number) => {
    dispatch(SurveySlice.actions.setEditingId(id));
    dispatch(SurveySlice.actions.setIsEdit(true));
    // const editSurvey: SurveyData = SurveyDatum?.filter(
    //   (SurveyData) => +SurveyData.uuid === id
    // )[0];
    // dispatch(SurveySlice.actions.setSurveyData(editSurvey));
  };

  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
  };

  const showModalResultSurveyHandler = () => {
    dispatch(appSlice.actions.setShowModals("showModalResultSurvey"));
  };

  const showModalSurveyHandler = (uuid: string) => {
    dispatch(SurveySlice.actions.setUuid(uuid));
    dispatch(appSlice.actions.setShowModals("showModalResultSurvey"));
  };

  const showModalSurveyMemberHandler = (uuid: string) => {
    dispatch(fetchSurveyMemberThunk({ uuid }));
    dispatch(SurveySlice.actions.setShowModalParticipants());
    showModalHandler();
  };

  const showModalParticipantsHandler = () => {
    dispatch(SurveySlice.actions.setShowModalParticipants());
    showModalHandler();
  };

  const columns: CustomColumnType<SurveyData>[] = [
    {
      title: "عنوان نظرسنجی",
      dataIndex: "title",
      key: "title",
      searchProps: true,
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "تاریخ شروع",
      dataIndex: "start_time",
      key: "start_time",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.start_time.localeCompare(b.start_time),
      render: (text) => <>{moment(text).format("jYYYY/jMM/jDD - HH:mm")}</>,
    },
    {
      title: "تاریخ پایان",
      dataIndex: "start_time",
      key: "end_time",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.start_time.localeCompare(b.start_time),
      render: (text) => <>{moment(text).format("jYYYY/jMM/jDD - HH:mm")}</>,
    },
    {
      title: "وضعیت نظرسنجی",
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        {
          text: "S",
          value: "متوقف شده",
        },
        {
          text: "D",
          value: "درجریان",
        },
        {
          text: "E",
          value: "پایان زمان",
        },
        {
          text: "Q",
          value: "در صف",
        },
      ],
      onFilter: (value: React.Key | boolean, record: SurveyData) =>
        record.status.includes(value as string),
      render: (key: string) => (
        <Space direction="vertical">{status(key)}</Space>
      ),
    },
    {
      title: "نتایج",
      dataIndex: "surveyResults",
      key: "surveyResults",
      align: "center",
      render: (_: string, record: SurveyData) => (
        <Button
          disabled={record.status === "Q" ? true : false}
          className={`p-0  ${
            record.status === "Q" ? "!text-blue-100" : "text-blue-700"
          }`}
          type="link"
          onClick={() => handleShowResult(record.uuid, record.title)}
        >
          مشاهده
        </Button>
      ),
    },
    {
      title: "لینک ها",
      dataIndex: "survayLinks",
      key: "survayLinks",
      align: "center",
      render: (_: string, record: SurveyData, index: number) => (
        <Space>
          <Button
            disabled={
              record.status === "S" || record.status === "E" ? true : false
            }
            className={`p-0
              ${
                record.status === "S" || record.status === "E"
                  ? "!text-blue-100"
                  : "text-blue-700"
              }`}
            type="link"
            onClick={() => showModalSurveyHandler(uuid)}
          >
            لینک نظرسنجی
          </Button>
          {record.status === "Q" ? (
            <Link to={`/store/survey/viewSurvey/${SurveyDatum[index].uuid}`}>
              <Button
                className={`p-0 text-blue-700`}
                type="link"
                onClick={() => editHandler(index + 1)}
              >
                ویرایش
              </Button>
            </Link>
          ) : (
            <Link to={`/store/survey/viewSurvey/${SurveyDatum[index].uuid}`}>
              <Button
                className={`p-0 text-blue-700`}
                type="link"
                onClick={() => editHandler(index + 1)}
              >
                مشاهده
              </Button>
            </Link>
          )}
          <Button
            disabled={
              record.status === "S" || record.status === "E" ? true : false
            }
            type="link"
            className={`p-0
              ${
                record.status === "S" || record.status === "E"
                  ? "!text-red-100"
                  : "text-red-700"
              }`}
            onClick={() => stopSurveyHandler(record.uuid)}
          >
            توقف نظرسنجی
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton
        Button={
          <ButtonComponent
            onClick={() => navigate("/store/Survey/AddSurvey")}
            ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          >
            <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
              <div>ایجاد نظرسنجی/مسابقه جدید</div>
              <div className="text-xl sm-max:text-xs p-0 ml-3">+</div>
            </div>
          </ButtonComponent>
        }
        HeaderTitle={"لیست تمام نظرسنجی ها و مسابقات"}
      />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <Spin spinning={isLoadingSurvey === "loading"}>
          <CustomTable
            bordered
            size="large"
            dataSource={SurveyDatum}
            columns={columns}
            theme={"secondary"}
          />
        </Spin>
      </div>
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
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
            <div className="container flex items-center gap-3">
              <ButtonComponent
                ButtonClass={
                  "flex shrink-0 items-center justify-center h-8 sm-max:!p-3 bg-white border border-blue-gray-100 text-xs font-bold h-full"
                }
                onClick={handleCopy}
              >
                <HiOutlineDocumentDuplicate className="w-5 h-5 text-blue-gray-300" />
              </ButtonComponent>
              <Input
                style={{ direction: "ltr", textAlign: "left" }}
                placeholder={`https://front-irannet.liara.run/store/SurveyView/${uuid}`}
                className="flex items-center justify-center gap-2.5 flex-grow rounded-lg border-blue-gray-100 h-full py-3 pl-3 pr-1.5 placeholder:leading-tight placeholder:text-sm placeholder:font-normal placeholder:text-blue-gray-300 cursor-auto"
                readOnly
              />
            </div>
          </>
        }
        modalFooter={
          <div className="w-full flex gap-4">
            <ButtonComponent
              onClick={showModalResultSurveyHandler}
              ButtonClass="text-red-900 text-xs font-bold bg-white h-10 flex items-center justify-center"
            >
              بستن
            </ButtonComponent>
            <ButtonComponent
              onClick={() => navigate(`/store/SurveyView/${uuid}`)}
              ButtonClass="w-full bg-white text-xs font-bold text-black h-10 flex items-center justify-center border border-[#2DCEA2]"
            >
              مشاهده نظرسنجی
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
            <div className="flex items-center justify-center bg-[#DFF8F2] py-2.5 px-5 rounded">
              <p lang="fa" role="text">
                {SurveyResults.member_count}
              </p>
            </div>
          </div>
        }
        modalBodyClass="h-auto"
        modalBody={
          <>
            <ProgressBarChart
              chartData={transformData(SurveyResults, colors)}
            />
          </>
        }
        modalFooter={
          <div className="flex items-center gap-6 sm-max:gap-4">
            <ButtonComponent
              onClick={() => showModalSurveyMemberHandler(uuid)}
              ButtonClass="bg-secondary text-xs font-bold text-white h-10 flex items-center justify-center"
            >
              نمایش شرکت کنندگان
            </ButtonComponent>
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
              <p lang="fa" role="text">
                {surveyTitle}
              </p>
            </div>
          </div>
        }
        modalBody={
          <>
            <ParticipantsDialogTable tableData={surveyMembers} />
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

export default Survey;
