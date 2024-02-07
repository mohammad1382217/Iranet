import React, { useRef } from "react";
import Button_component from "../../../components/Button";
import {
  Input,
  Tag,
  Typography,
  Space,
  Table,
  Popover,
  Button,
  ConfigProvider,
  InputRef,
} from "antd";
import fa_IR from "antd/locale/fa_IR";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  occasionalmessageSlice,
  selectoccasionalmessageData,
  selectoccasionalmessageSearchText,
  selectoccasionalmessageSearchedColumn,
  useSelector,
  useDispatch,
} from "../../../../lib/redux";
import Highlighter from "react-highlight-words";
import "../../../components/TableInputNote/TableInputNote.scss";
import {
  ColumnType,
  FilterConfirmProps,
} from "antd/es/table/interface";
const { Paragraph } = Typography;

const OccasionalMessage: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(selectoccasionalmessageData);
  const searchTextValue = useSelector(selectoccasionalmessageSearchText);
  const searchedColumn = useSelector(selectoccasionalmessageSearchedColumn);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(occasionalmessageSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(occasionalmessageSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(occasionalmessageSlice.actions.setSearchText(""));
  };

  const deleteItem = (key: React.Key) => {
    const newData = tableData.filter((item) => item.key !== key);
    dispatch(occasionalmessageSlice.actions.setNewData(newData));
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

  type EditableColumnType = ColumnType<DataType> & { editable?: boolean };

  const columns_occasionalMessage: EditableColumnType[] = [
    {
      title: "عنوان پیام",
      dataIndex: "titlemessage",
      key: "titlemessage",
      align:'center',
      editable: true,
      width: "20%",
      ...getColumnSearch("titlemessage", "عنوان پیام"),
    },

    {
      title: "تاریخ ارسال",
      dataIndex: "senddate",
      key: "senddate",
      align: "center",
      width:'14%',
      editable: true,
      sorter: (a: DataType, b: DataType) =>
        a.senddate.localeCompare(b.senddate),
    },

    {
      title: "مخاطبین",
      dataIndex: "users",
      align: "center",
      key: "users",
      width: "15%",
      editable: true,
      ...getColumnSearch("users", "مخاطبین"),
      render: (users: string[]) =>
        users.map((tag: string, index: React.Key) => (
          <Tag
            key={index}
            className="font-normal p-1 mt-1 text-xs text-[#000000D9]"
          >
            {tag}
          </Tag>
        )),
    },
    {
      title: "متن پیام",
      dataIndex: "textmessage",
      editable: true,
      key: "textmessage",
      ellipsis: true,
      align: 'center',
      width: "30%",
      ...getColumnSearch("textmessage", "متن پیام"),
      render: (textmessage: string) => (
        // <Popover content={<div className="">{textmessage}</div>}>
        //   <Paragraph ellipsis={{ rows: 1 }}>{textmessage}</Paragraph>
        // </Popover>
        <Popover content={<div className="">{textmessage}</div>}>
        <div className="flex justify-center mx-5">
          <span>{textmessage.slice(0, 30)}</span>
          <span>...</span>
        </div>
      </Popover>
      ),
    },
    {
      title: "رویداد ها",
      align: "center",
      dataIndex: "key",
      key: "key",
      width:'18%',
      render: (action: number) => (
        <Space className="flex items-center justify-center">
          <NavLink to={`/store/occasionalMessage/ViewOccasionalMessage/${action}`}>
            <Button type="link">ویرایش</Button>
          </NavLink>
          <Button
            type="link"
            onClick={() => {
              deleteItem(action);
            }}
            className="text-[#E53935]"
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <div className="flex flex-col items-center p-10 sm:!p-5 xl:w-full h-full">
        <div className="w-full h-16 rounded-lg bg-[#FAFAFA] flex p-3 justify-between items-center">
          <p className="text-2xl font-semibold sm:text-xs text-[#151515]">
            لیست تمام پیام های تنظیم شده
          </p>
          <NavLink to="/store/occasionalMessage/AddOccasionalMesssage">
            <Button_component
              children={
                <div className="flex justify-center flex-row-reverse items-center">
                  ایجاد پیام جدید
                  <div className="text-xl sm:text-xs p-0  ml-3">+</div>
                </div>
              }
              ButtonClass="bg-[#2DCEA2] text-xs font-bold sm:p-5 h-11 flex justify-center items-center"
            />
          </NavLink>
        </div>
        <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
          <ConfigProvider locale={fa_IR}>
            <Table
              className="mt-5"
              bordered
              dataSource={tableData}
              columns={columns_occasionalMessage}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default OccasionalMessage;

// Types
interface DataType {
  key: React.Key;
  titlemessage: string;
  senddate: string;
  users: string[];
  textmessage: string;
}

type DataIndex = keyof DataType;