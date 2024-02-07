import React, { useRef } from "react";
import fa_IR from "antd/locale/fa_IR";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import Button_component from "../../../components/Button";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  dashboardSlice,
  selectSearchText,
  selectSearchedColumn,
  useSelector,
  useDispatch,
  appSlice,
  selectShowModal,
} from "../../../../lib/redux";
import raffle from "../../../assets/images/raffle_dashbaord.png";
import rectangle_dashbaord_mini_boxRight from "../../../assets/images/rectangle_dashbaord_mini_boxRight.png";
import { Space, ConfigProvider, Table, Input, Popover, InputRef } from "antd";
import { IconButton, Typography } from "@material-tailwind/react";
import DialogTable from "../../../components/anniversaryDialog";
import "../../../components/TableInputNote/TableInputNote.scss";
import { Link } from "react-router-dom";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import Modal from "../../../components/Modal";
import { NotificationBox } from "../../../components/NotificationBox";
import { PercentagePieChart } from "../../../components/PercentagePieChart";
import { DashboardCard } from "../../../components/DashboardCard";
import { ColumnsType } from "antd/lib/table";

const data: DataType[] = [
  {
    key: "1",
    name: "پیام شماره 1",
    time: "1400/00/00",
    text: "لورم  یپسوم متن ساختگی  یپسوم متن ساختگی ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ",
  },
  {
    key: "2",
    name: "پیام شماره 2",
    time: "1400/00/00",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت م ایپسوم متن ",
  },
  {
    key: "3",
    name: "پیام شماره 3",
    time: "1400/00/00",
    text: "لورم ایپسومایپسومایپسومایپسومایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ایپسومایپسومایپسومایپسومایپسوم",
  },
  {
    key: "4",
    name: "پیام شماره 4",
    time: "امروز",
    text: "لورم ایپسوم متنمتنمتنمتنمتنمتنمتنمتن ساختگی با تولید سادگی نامفهوم از صنعت ایپسومایپسومایپسومایپسومایپسومایپسومایپسومایپسومایپسومایپسوم",
  },
];

export const chartList: chartListType[] = [
  {
    lable: "عالی",
    percent: [15, 85],
    fill: "#FF5050",
  },
  {
    lable: "خوب",
    percent: [30, 70],
    fill: "#FD6E6E",
  },
  {
    lable: "متوسط",
    percent: [40, 60],
    fill: "#FF9C9C",
  },
  {
    lable: "ضعیف",
    percent: [5, 95],
    fill: "#FFB7B7",
  },
  {
    lable: "خیلی ضعیف",
    percent: [10, 90],
    fill: "#FFE3E3",
  },
];

const Dashboard = () => {
  // table dashbaord
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModal);
  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModal());
  };
  const searchTextValue = useSelector(selectSearchText);
  const searchedColumn = useSelector(selectSearchedColumn);
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(dashboardSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(dashboardSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(dashboardSlice.actions.setSearchText(""));
  };

  const getColumnSearchProps = (
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
          className="font-thin bg-gray-50"
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
            <SearchOutlined className="w-4 h-4 leading-normal" />
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
    render: (text: string) =>
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

  const columns = [
    {
      title: "عنوان پیام",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name", "عنوان پیام"),
    },
    {
      title: "تاریخ ارسال",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: "15%",
      sorter: (a: DataType, b: DataType) => a.time.localeCompare(b.time),
    },
    {
      title: "متن پیام",
      dataIndex: "text",
      key: "text",
      ellipsis: true,
      width: "55%",
      ...getColumnSearchProps("text", "متن پیام"),
      render: (text: string) => (
        <Popover content={<div className="">{text}</div>}>
          <div className="flex justify-center mx-7 px-2">
            <span >{text.slice(0, 60)}</span>
            <span>...</span>
          </div>
        </Popover>
      ),
    },
  ];
  return (
    <div className="container flex flex-row lg:flex-col">
      <div className="w-3/4 p-10 sm:!py-2 sm:!px-5 xl:w-full h-full flex items-center content-center flex-col gap-10 lg:gap-5">
        {/* -------- قرعه کشی -------- */}
        <div
          style={{ backgroundImage: `url(${raffle})` }}
          className="w-full h-16 p-3 px-6 md:mt-3  bg-cover rounded-lg hover:cursor-pointer bg-gray-50 flex justify-between items-center"
        >
          <h1 className="font-semibold text-2xl sm:text-sm">قرعه کشی</h1>
          <Link to="/store/lottery">
            <h5 className="font-normal text-sm sm:text-xs text-[#757575]">
              ورود به صفحۀ قرعه کشی ها
            </h5>
          </Link>
        </div>
        {/* -------- باکس های سالگردو شارژ حساب شماره های ثبت شده -------- */}
        <div className="container grid grid-cols-3 lg:grid-cols-1 gap-4 items-center justify-center">
          <DashboardCard
            HeaderCard={"تعداد شماره های ثبت شده"}
            UrlLinkCard={"#"}
            LinkCard={""}
            OnClick={() => {}}
          >
            <div className="flex flex-col">
              <div className="container flex flex-row gap-6 xl:gap-3">
                <div className="2xl:!text-sm text-sm flex items-center font-light text-[#78909C] gap-2.5">
                  <span>امروز : </span><p className="text-[#FD6E6E] text-2xl">23</p>
                </div>
                <div className="2xl:!text-sm text-sm flex items-center font-light text-[#78909C] gap-2.5">
                  <span>ماه قبل : </span><p className="text-[#FD6E6E] text-2xl">150</p>
                </div>
              </div>
              <div className="2xl:!text-sm text-sm flex items-center font-medium text-[#78909C] gap-2.5">
                <span>تعداد کل مشتریان :</span>
                <p className="text-[#FD6E6E] text-2xl">500</p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard
            HeaderCard={"موجودی فعلی حساب"}
            UrlLinkCard={"/store/ChargeAccount"}
            LinkCard={
              <div className="">
                افزایش موجودی
                <IconButton className="rounded-lg h-6 w-6 mr-3 bg-secondary">
                  <FaPlus className="w-5 h-5 p-1" />
                </IconButton>
              </div>
            }
            OnClick={() => {}}
          >
            <p className="text-[#FD6E6E]">256.000 </p>
            <p className="text-sm font-light -mr-2 text-[#78909C]">ریال</p>
          </DashboardCard>
          <DashboardCard
            HeaderCard={"تعداد سالگرد های امروز"}
            UrlLinkCard={"#"}
            LinkCard={"مشاهدۀ همۀ سالگرد ها"}
            OnClick={showModalHandler}
          >
            <p className="text-5xl font-medium text-[#FD6E6E]">28</p>
          </DashboardCard>
        </div>
        {/* -------- پیامک های ارسالی -------- */}
        <div className="container flex flex-col gap-5">
          <div className="container h-16 rounded-lg bg-gray-50 flex p-3 justify-between items-center">
            <p className="font-medium text-lg sm:text-sm text-[#151515]">
              پیامک های ارسالی
            </p>
            <Link to="/store/sendReports">
              <Button_component
                children="مشاهدۀ همۀ پیام ها"
                ButtonClass="bg-secondary text-xs font-bold h-11 flex justify-center items-center"
              />
            </Link>
          </div>
          {/* -------- جدول -------- */}
          <div className="container">
            <ConfigProvider locale={fa_IR}>
              <Table columns={columns as ColumnsType<DataType>} bordered dataSource={data} />
            </ConfigProvider>
          </div>
        </div>
        {/* -------- نظر سنجی -------- */}
        <div
          className="container py-6 px-8 bg-cover flex gap-28 xl:gap-16 lg:!gap-6 lg:flex-col items-center bg-gray-50 bg-right justify-around bg-no-repeat h-atuo rounded-lg"
          style={{
            backgroundImage: `url(${rectangle_dashbaord_mini_boxRight})`,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 lg:w-full lg:justify-between">
            <div className="flex flex-col gap-2 lg:w-full lg:flex-start lg:justify-between">
              <Typography
                className="font-semibold sm:text-lg text-xl"
                variant="h6"
              >
                آخرین نظر سنجی:
              </Typography>
              <Typography
                className="font sm:text-xl font-semibold text-2xl"
                variant="h4"
              >
                نظر سنجی عید نوروز
              </Typography>
            </div>
            <div className="lg:w-full flex lg:items-start md:items-end sm:items-start flex-col">
              <Link to="/store/survey">
                <Typography
                  variant="small"
                  className="font-normal font text-base text-teal-900 "
                >
                  ورود به صفحۀ نظر سنجی ها
                </Typography>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center text-xs">
            <PercentagePieChart chartData={chartList} />
          </div>
        </div>
      </div>
      {/* -------- اعلانات -------- */}
      <NotificationBox NotificatonBoxClass={""} />

      {/* دیالوگ سالگرد */}
      <Modal
        modalHeaderClass="flex flex-row justify-between"
        modalHeader={
          <>
            <p className="font-bold text-sm">سالگرد های امروز</p>
            <div className="font-normal text-xl ">
              تاریخ و ساعت : 12:21’ - <span>1 فروردین 1400</span>
            </div>
          </>
        }
        modalBody={<DialogTable />}
        modalFooter={
          <Button_component
            onClick={showModalHandler}
            children="برگشت به داشبورد"
            ButtonClass="bg-secondary text-xs font-bold h-11 flex items-center justify-center"
          />
        }
        modalFooterClass="flex items-center justify-center"
        Open={showModal}
        HandleOpen={showModalHandler}
      />
    </div>
  );
};

export default Dashboard;

// Types
interface DataType {
  key: React.Key;
  name: string;
  time: string;
  text: string;
}

type DataIndex = keyof DataType;

export interface chartListType {
  lable: string;
  percent: [number, number];
  fill: string;
}
