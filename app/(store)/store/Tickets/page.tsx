import React, { useRef } from "react";
import Button_component from "../../../components/Button";
import {
  Input,
  Tag,
  Space,
  Table,
  Button,
  ConfigProvider,
  InputRef,
} from "antd";
import fa_IR from "antd/locale/fa_IR";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";

import {
  ticketsSlice,
  selectticketsData,
  selectticketsSearchText,
  selectticketsSearchedColumn,
  useSelector,
  useDispatch,
} from "../../../../lib/redux";
import Highlighter from "react-highlight-words";
import "../../../components/TableInputNote/TableInputNote.scss";
import { ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import { ColumnsType } from "antd/lib/table";

const Tickets: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(selectticketsData);
  const searchTextValue = useSelector(selectticketsSearchText);
  const searchedColumn = useSelector(selectticketsSearchedColumn);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(ticketsSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(ticketsSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(ticketsSlice.actions.setSearchText(""));
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

  const columns_tickets = [
    {
      title: "موضوع",
      dataIndex: "ticketname",
      key: "ticketname",
      width: "20%",
      ...getColumnSearch("ticketname", "موضوع"),
      // render: (ticketname: string) => (
      render:(_: any, record: DataType) => (
        <div className="flex flex-row ">
         
          <p
          className={
            record.Condition == "پاسخ داده شده"
              ? "text-[#630303]"
              : ""
          }
          // className={}
            // className='text-red-200'
            // className={record.Condition}
          //  className={
          //   record.Condition === "پاسخ داده شده"
          //   ? 'text-red-200'
          // }
          >{record.Condition}
          </p>
          {
             record.Condition == "پاسخ داده شده"
             ? <IoIosChatboxes className='mr-2' color='#FD6E6E' size={18} /> : ""
          }
        </div>
      ),
    },

    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a: DataType, b: DataType) => a.date.localeCompare(b.date),
    },

    {
      title: "کد شناسه",
      dataIndex: "recognizecode",
      align: "center",
      key: "recognizecode",
      width: "25%",
      ...getColumnSearch("recognizecode", "کد شناسه"),
    },
    {
      title: "وضعیت",
      dataIndex: "Condition",
      key: "Condition",
      align: "center",
      width: "20%",
      ...getColumnSearch("Condition", "وضعیت"),
      render: (Condition: string[]) =>
        Condition.map((Condition, index) => (
          <Tag
            key={index}
            color={
              Condition === "پاسخ داده شده"
                ? "green"
                : Condition === "پاسخ داده شده و در حال بررسی"
                ? "blue"
                : Condition === "بسته شده"
                ? "red"
                : ""
            }
          >
            {Condition}
          </Tag>
        )),
    },
    {
      title: "پاسخ ادمین",
      align: "center",
      dataIndex: "key",
      key: "key",
      render: (action: number) => (
        <Space>
          <NavLink to={`/store/tickets/viewTicket/${action}`}>
            <Button type="link">مشاهدۀ پاسخ</Button>
          </NavLink>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <div className="flex flex-col items-center p-10 sm:!p-5 xl:w-full h-full">
        <div className=" w-full h-16 p-3 bg-cover rounded-lg  hover:cursor-pointer bg-[#FAFAFA] flex justify-between items-center">
          <p className="text-2xl font-semibold sm:text-sm text-[#151515]">
            لیست تیکت های ارسالی
          </p>
          <NavLink to="/store/tickets/addTicket">
            <Button_component
              children={
                <div className="flex justify-center flex-row-reverse items-center">
                  ثبت تیکت جدید<div className="text-xl p-0  ml-3">+</div>
                </div>
              }
              ButtonClass="bg-[#2DCEA2] text-xs font-bold h-11 flex justify-center items-center"
            />
          </NavLink>
        </div>
        <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
          <ConfigProvider locale={fa_IR}>
            <Table
              className="mt-5"
              bordered
              dataSource={tableData}
              columns={columns_tickets as ColumnsType<DataType>}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Tickets;

// Types
interface DataType {
  key: React.Key;
  ticketname: string;
  recognizecode: number;
  date: string;
  Condition: string[];
}

type DataIndex = keyof DataType;
