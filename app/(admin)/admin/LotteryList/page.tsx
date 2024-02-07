import React, { useRef } from 'react'
import Button_component from "../../../components/Button";
import fa_IR from "antd/locale/fa_IR";
import { useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Input, InputRef, Space, Table } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { selectticketsSearchText, selectticketsSearchedColumn, useSelector } from '../../../../lib/redux';

const data: DataType[] = [
  {
    key: "1",
    titleLottery: "قرعه کشی شماره 1",
    date: "1402/10/10",
    winners: "واریز به حساب",
  },
  {
    key: "2",
    titleLottery: "قرعه کشی شماره 2",
    date: "1401/10/20",
    winners: "پرداخت مستقیم",
  },
  {
    key: "3",
    titleLottery: "قرعه کشی شماره 3",
    date: "1400/12/21",
    winners: "پرداخت مستقیم",
  },
  {
    key: "4",
    titleLottery: "قرعه کشی شماره 4",
    date: "1400/08/08",
    winners: "واریز به حساب",
  },
];

const LotteryList : React.FC = () => {
  const navigate = useNavigate();
  const searchTextValue = useSelector(selectticketsSearchText);
  const searchedColumn = useSelector(selectticketsSearchedColumn);
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    // dispatch(sendReportSlice.actions.setSearchText(selectedKeys[0]));
    // dispatch(sendReportSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    // dispatch(sendReportSlice.actions.setSearchText(""));
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

  const columns: ColumnsType<DataType> = [
    {
      title: "عنوان قرعه کشی",
      dataIndex: "titleLottery",
      key: "titleLottery",
      // align: "center",
      width:'50%',
      ...getColumnSearch("titleLottery", "عنوان قرعه کشی"),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      width:100,
      align: "center",
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "برندگان",
      dataIndex: "winners",
      key: "winners",
      width:100,
  
      align: "center",
      render: () => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate("/store/Lottery/ShowLotteryWinners")}
          >
            مشاهدۀ برندگان
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm:!p-5 xl:w-full h-full">
      <div className="w-full h-16 rounded-lg bg-[#FAFAFA] flex p-3 justify-between items-center">
        <p className="text-2xl font-semibold sm:text-xs text-[#151515]">
        لیست تمام قرعه کشی ها
        </p>
      </div>
      <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
        <ConfigProvider locale={fa_IR}>
          <Table
            className="mt-5"
            bordered
            dataSource={data}
            columns={columns}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default LotteryList;

// Types
interface DataType {
  key: React.Key;
  titleLottery: string;
  date: string;
  winners: string;
}

type DataIndex = keyof DataType;