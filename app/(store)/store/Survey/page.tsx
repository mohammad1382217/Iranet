import {
  Badge,
  Button,
  ConfigProvider,
  Input,
  InputRef,
  Space,
  Table,
} from "antd";
import Button_component from "../../../components/Button";
import fa_IR from "antd/locale/fa_IR";
import {
  SurveySlice,
  appSlice,
  selectShowModal,
  selectShowModalParticipants,
  selectShowModalResultSurvey,
  selectSurveyDatum,
  selectticketsSearchText,
  selectticketsSearchedColumn,
  sendReportSlice,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
import React, { useRef } from "react";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import Highlighter from "react-highlight-words";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { Parag } from "../../../components/tools";
import ProgressBarChart from "../../../components/ProgressBarChart";
import { chartList } from "../Dashboard/page";
import { ParticipantsDialogTable } from "../../../components/ParticipantsDialogTable";

const Survey: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = useSelector(selectShowModal);
  const showModalParticipants = useSelector(selectShowModalParticipants);
  const showModalResultSurvey = useSelector(selectShowModalResultSurvey);
  const SurveyDatum = useSelector(selectSurveyDatum);
  const stopSurveyHandler = (record: DataType) => {
    const updatedData = SurveyDatum.map((item) =>
    item.key === record.key ? { ...item, surveyStatus: 'متوقف شده' } : item
    );
    dispatch(SurveySlice.actions.setSurveyDatum(updatedData));
  }
  const searchTextValue = useSelector(selectticketsSearchText);
  const searchedColumn = useSelector(selectticketsSearchedColumn);
  const searchInput = useRef<InputRef>(null);

  const status = (key: string) => {
    switch (key) {
      case "متوقف شده":
        return <Badge status="error" text="متوقف شده" />;
      case "در جریان":
        return <Badge status="success" text="در جریان" />;
      case "در صف":
        return <Badge status="processing" text="در صف" />;
      default:
        return <Badge status="default" text="پایان زمان" />;
    }
  };

  const editHandler = (action: number) => {
    dispatch(SurveySlice.actions.setEditingId(action));
    const editSurvey = SurveyDatum?.filter(SurveyData => SurveyData.key === action)[0];
    dispatch(SurveySlice.actions.setSurveyData(editSurvey));
  }
  
  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModal());
  };

  const showModalResultSurveyHandler = () => {
    dispatch(appSlice.actions.setShowModalResultSurvey());
  };

  const showModalParticipantsHandler = () => {
    dispatch(SurveySlice.actions.setShowModalParticipants());
    showModalHandler();
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(sendReportSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(sendReportSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(sendReportSlice.actions.setSearchText(""));
  };

  const getColumnSearch = (
    dataIndex: DataIndex,
    name: string
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
          width: 250,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          className="font-thin font-[Estedad-FD]"
          placeholder={`جستجو در ${name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space className="w-full flex flex-row justify-between gap-2">
          <Button_component
            Type="submit"
            onClick={() => clearFilters && handleReset(clearFilters)}
            ButtonClass="!w-[105px] !h-[28px] border-secondary border-2 bg-[#FFFFFF] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2"
          >
            <span className="text-black text-[10px]">پاک سازی متن</span>
            <FaRegTrashAlt color="black" />
          </Button_component>
          <Button_component
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            ButtonClass="!w-[123px] !h-[28px] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-secondary gap-2"
          >
            <span className="text-[10px]">جستجو</span>
            <SearchOutlined className="w-4 h-4 leading-normal"/>
          </Button_component>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value: any, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#DFF8F2",
            padding: 0,
          }}
          searchWords={[searchTextValue]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "عنوان نظرسنجی",
      dataIndex: "survayTitle",
      key: "survayTitle",
      align: "center",
      ...getColumnSearch("survayTitle", "عنوان نظرسنجی"),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      width: "10%",
      key: "date",
      align: "center",
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "وضعیت نظرسنجی",
      dataIndex: "surveyStatus",
      width: "15%",
      key: "surveyStatus",
      align: "center",
      render: (key: string) => (
        <Space direction="vertical">{status(key)}</Space>
      ),
    },
    {
      title: "نتایج",
      dataIndex: "surveyResults",
      width: "15%",
      key: "surveyResults",
      align: "center",
      render: () => (
        <Space>
          <Button type="link" onClick={showModalHandler}>
            مشاهده نتایج
          </Button>
        </Space>
      ),
    },
    {
      title: "لینک ها",
      dataIndex: "survayLinks",
      width: "30%",
      key: "survayLinks",
      align: "center",
      render: (text: string, record: DataType, action: number) => (
        <Space>
          <Button type="link" onClick={showModalResultSurveyHandler}>
            لینک نظرسنجی
          </Button>
          <NavLink to={`/store/survey/viewSurvey/${action + 1}`}>
            <Button type="link" onClick={() => editHandler(action + 1)}>ویرایش</Button>
          </NavLink>
          <Button
            type="link"
            className={
              record.surveyStatus === "متوقف شده"
                ? "text-red-100"
                : "text-red-700"
            }
            onClick={() => stopSurveyHandler(record)}
          >
            توقف نظرسنجی
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm:!p-5 xl:w-full h-full">
      <div className="w-full h-16 rounded-lg bg-[#FAFAFA] flex p-3 justify-between items-center">
        <p className="text-2xl font-semibold sm:text-xs text-[#151515]">
          لیست تمام نظرسنجی ها
        </p>
        <Button_component
          onClick={() => navigate("/store/Survey/AddSurvey")}
          ButtonClass="bg-secondary text-xs font-bold sm:p-5 h-11 flex justify-center items-center"
        >
          <div className="flex justify-center flex-row-reverse items-center">
            <div>ایجاد نظرسنجی جدید</div>
            <div className="text-xl sm:text-xs p-0 ml-3">+</div>
          </div>
        </Button_component>
      </div>
      <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
        <ConfigProvider locale={fa_IR}>
          <Table
            className="mt-5"
            bordered
            dataSource={SurveyDatum}
            columns={columns}
          />
        </ConfigProvider>
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
                placeholder="https://link.com/link_link"
                className="absolute flex items-center justify-center gap-2.5 flex-grow flex-shrink-0 rounded-lg border-blue-gray-100 h-10 py-3 pl-3 pr-1.5 placeholder:leading-tight placeholder:text-sm placeholder:font-normal placeholder:text-blue-gray-300 cursor-auto"
                readOnly
              />
              <Button_component
                ButtonClass={
                  "flex shrink-0 items-center justify-center relative -left-1 h-8 sm:!p-3 bg-blue-gray-300 text-xs font-bold ml-64"
                }
              >
                کپی کردن
              </Button_component>
            </div>
          </>
        }
        modalFooter={
          <Button_component
            onClick={showModalResultSurveyHandler}
            ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
          >
            بستن
          </Button_component>
        }
        modalFooterClass="flex items-center justify-end"
        Open={showModalResultSurvey}
        HandleOpen={showModalResultSurveyHandler}
      />
      <Modal
        modalHeaderClass="flex flex-row justify-between px-6 pb-2"
        modalHeader={
          <div className="container flex items-center justify-between text-xl font-semibold sm:text-base">
            <h3 className="text-gray-900">
              تعداد مشارکت کنندگان
            </h3>
            <div className="flex items-center justify-center bg-[#DFF8F2] py-2.5 px-5 rounded">
              <p>123 نفر</p>
            </div>
          </div>
        }
        modalBody={
          <>
            <ProgressBarChart chartData={chartList} />
          </>
        }
        modalFooter={
          <div className="flex items-center gap-6 sm:gap-4">
            <Button_component
              onClick={showModalParticipantsHandler}
              ButtonClass="bg-secondary text-xs font-bold text-white h-10 flex items-center justify-center"
            >
              نمایش شرکت کنندگان
            </Button_component>
            <Button_component
            onClick={showModalHandler}
            ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
            >
            بستن
            </Button_component>
          </div>
        }
        modalFooterClass="flex items-center justify-end pt-2"
        Open={showModal}
        HandleOpen={showModalHandler}
      />
      <Modal
        modalHeaderClass="flex flex-row justify-between px-6 pb-2"
        modalHeader={
          <div className="container flex items-center justify-between text-xl font-semibold sm:text-base">
            <h3 className="text-gray-900">
            لیست شرکت کنندگان
            </h3>
            <div className="flex items-center justify-center bg-[#DFF8F2] py-2.5 px-5 rounded">
              <p>نام نظرسنجی</p>
            </div>
          </div>
        }
        modalBody={
          <>
            <ParticipantsDialogTable />
          </>
        }
        modalFooter={
          <div className="flex items-center justify-center gap-6 sm:gap-4">
            <Button_component
            onClick={showModalParticipantsHandler}
            ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
            >
            بستن
            </Button_component>
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

// Types
export interface DataType {
  key: React.Key;
  survayTitle: string;
  date: string;
  surveyStatus: string;
}

type DataIndex = keyof DataType;
