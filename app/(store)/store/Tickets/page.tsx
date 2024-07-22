import React from "react";
import moment from "moment-jalaali";
import { Link } from "react-router-dom";
import "../../../components/TableInputNote/TableInputNote.scss";
import {
  selectStatusTicketsDataUsers,
  selectTicketsDataUsers,
  ticketsUsersDataType,
  useSelector,
  useDispatch
} from "../../../../lib/redux";
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import { fetchUsersTicket } from "../../../../lib/redux/slices/ticketsSlice/fetchUsersTicket";

const Spin = React.lazy(() => import("antd/es/spin/index"));;
const Button = React.lazy(() => import("antd/es/button/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));

const StoresTickets: React.FC = () => {
  const status = useSelector(selectStatusTicketsDataUsers);
  const dispatch = useDispatch();
  const tableData = useSelector(selectTicketsDataUsers);

  React.useEffect(() => {
    dispatch(fetchUsersTicket());
    console.log(tableData);
  }, []);
  const columns_tickets: CustomColumnType<ticketsUsersDataType>[] = [
    {
      title: "کد شناسه",
      dataIndex: "code",
      align: "center",
      key: "code",
      searchProps: true,
      render: (code: number) => (
        <Tag
          key={code}
          color="#1890FF"
          className="font-normal mx-auto  rounded-lg text-xs text-[#FFFFFF]"
        >
          {code}
        </Tag>
      ),
    },
    {
      title: "موضوع",
      dataIndex: "title",
      key: "title",
      searchProps: true,
    },
    {
      title: "تاریخ",
      dataIndex: "created_at",
      key: "created_at",
      DateRangeProps: true,
      align: "center",
      sorter: (a: ticketsUsersDataType, b: ticketsUsersDataType) =>
        -a.created_at.localeCompare(b.created_at),
      render: (text) => <>{moment(text).format(
        "jYYYY/jMM/jDD - HH:mm"
      )}</>,
    },
    {
      title: "دپارتمان",
      dataIndex: "department",
      key: "department",
      align: "center",
      filters: [
        {
          text: "مالی",
          value: "F",
        },
        {
          text: "مدیریت",
          value: "M",
        },
        {
          text: "ارسال پیامک",
          value: "SMSM",
        },
        {
          text: "فنی",
          value: "T",
        },
        {
          text: "طراحی و تولید",
          value: "DAP",
        },
      ],
      onFilter: (value: React.Key | boolean, record: ticketsUsersDataType) =>
        record.department === value,
      render: (department: string) => {
        if (department === "F") {
          return "مالی";
        } else if (department === "M") {
          return "مدیریت";
        } else if (department === "SSMS") {
          return "ارسال پیامک";
        } else if (department === "T") {
          return "فنی";
        } else if (department === "DAP") {
          return "طراحی و تولید";
        }
      },
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        {
          text: "در انتظار پاسخ",
          value: "P",
        },
        {
          text: "پاسخ داده شده",
          value: "A",
        },
        {
          text: "پاسخ داده شده و در حال بررسی",
          value: "AUR",
        },
        {
          text: "در حال بررسی",
          value: "R",
        },
        {
          text: "بسته شده",
          value: "C",
        },
      ],
      onFilter: (value: React.Key | boolean, record: ticketsUsersDataType) =>
        record.status === value,
      render: (status: string) => (
        <span>
          {[status].map((tag) => {
            let name: string;
            let color: string;
            if (tag === "AUR") {
              color = "blue";
              name = "پاسخ داده شده و در حال بررسی";
            } else if (tag === "P") {
              color = "orange";
              name = "در انتظار پاسخ";
            } else if (tag === "A") {
              color = "green";
              name = "پاسخ داده شده";
            } else if (tag === "C") {
              color = "#D9D9D9";
              name = "بسته شده";
            } else {
              color = "#FADB14";
              name = "در حال برسی";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row-reverse justify-center items-baseline"
              >
                {name}
                <Badge className="ml-1" size="default" color={color}></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
    {
      title: "پاسخ ادمین",
      align: "center",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Link to={`/store/Tickets/viewTicket/${id}`}>
          <Button className="p-0 text-[#039BE5]" color="#039BE5" type="link">
            مشاهدۀ
          </Button>
        </Link>
      ),
    },
  ];

  const getRowClassName = (record: ticketsUsersDataType) => {
    return record.status === "A" ? "blue-row" : "";
  };

  return (
    <>
      <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
        <HeaderWithButton
          HeaderTitle={"لیست تیکت های ارسالی"}
          Button={
            <Link to="/users/tickets/addTicket">
              <ButtonComponent ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center">
                <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
                  ثبت تیکت جدید<div className="text-xl p-0  ml-3">+</div>
                </div>
              </ButtonComponent>
            </Link>
          }
        />
        <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
          <Spin spinning={status === "loading" ? true : false}>
            <CustomTable
              bordered
              rowClassName={getRowClassName}
              size="large"
              dataSource={tableData}
              columns={columns_tickets}
              theme={"secondary"}
            />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default StoresTickets;

// Types
