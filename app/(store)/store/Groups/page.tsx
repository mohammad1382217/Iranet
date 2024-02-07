import React, { useRef } from "react";
import Button_component from "../../../components/Button";
import {
  Input,
  Tag,
  Space,
  Table,
  ConfigProvider,
  Button,
  InputRef,
} from "antd";
import faIR from "antd/locale/fa_IR";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  groupsSlice,
  selectGroupsData,
  selectGroupsSearchText,
  selectGroupsSearchedColumn,
  useSelector,
  useDispatch,
  GroupsData,
  appSlice,
  selectedDeleteId,
  selectShowModal,
} from "../../../../lib/redux";
import { NavLink } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "../../../components/TableInputNote/TableInputNote.scss";
import Modal from "../../../components/Modal";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(selectGroupsData);
  const showModal = useSelector(selectShowModal);
  const showModalHandler = () => dispatch(appSlice.actions.setShowModal());
  const deleteId = useSelector(selectedDeleteId);

  const handleDelete = () => {
    showModalHandler();
    const newData = tableData.filter((item) => item.key !== deleteId);
    const data: GroupsData[] = [];
    newData.map((item, index) => data.push({ ...item, key: index + 1 }));
    dispatch(groupsSlice.actions.setNewData(data));
  };

  const handleDisable = (actions: number) => {
    const newData = [...tableData];
    newData.splice(actions - 1, 1, {
      ...newData[actions - 1],
      disable: !newData[actions - 1].disable,
    });
    dispatch(groupsSlice.actions.setNewData(newData));
  };

  const searchTextValue = useSelector(selectGroupsSearchText);
  const searchedColumn = useSelector(selectGroupsSearchedColumn);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(groupsSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(groupsSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(groupsSlice.actions.setSearchText(""));
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

  const columns_anniversary: ColumnsType<DataType> = [
    {
      title: "عنوان گروه",
      dataIndex: "groupName",
      key: "groupName",
      align:'center',
      ...getColumnSearch("groupName", "عنوان گروه"),
      width: "40%",
    },
    {
      title: "دفترچه",
      dataIndex: "Notebooks",
      key: "Notebooks",
      width: "25%",
      ...getColumnSearch("Notebooks", "دفترچه "),
      render: (tags: string) => (
        <Tag className="font-normal p-1 text-xs text-[#000000D9]">
          {tags}
        </Tag>
      ),
    },
    {
      title: "تعداد مخاطبین",
      dataIndex: "numberUsers",
      key: "numberUsers",
      align: "center",
      width: "20%",
      render: (tags: string) => (
        <Tag
          color="#FF4D4F"
          className="font-normal mx-auto p-1 rounded-lg text-xs text-[#FFFFFF]"
        >
          {tags}
        </Tag>
      ),
      sorter: (a: DataType, b: DataType) => a.numberUsers - b.numberUsers,
    },
    {
      title: "رویداد ها",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "15%",
      render: (action: number) => (
        <Space>
          <NavLink to={`/store/groups/viewGroup/${action}`}>
            <Button type="link">مشاهده و ویرایش</Button>
          </NavLink>
          <Button
            type="link"
            onClick={() => {
              handleDisable(action);
            }}
            className={`${
              tableData[action - 1].disable === false
                ? "text-[#E53935]"
                : "text-[#43A047]"
            }`}
          >
            {tableData[action - 1].disable === false
              ? "غیر فعال کردن"
              : "فعال کردن"}
          </Button>
          <Button
            type="link"
            onClick={() => {
              showModalHandler();
              dispatch(groupsSlice.actions.setDeleteId(action));
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
    <div className="flex flex-col items-center content-center p-10 sm:!p-5 xl:w-full h-full">
      <div className="mb-5 w-full h-16 p-3 bg-cover rounded-lg md:mb-3 hover:cursor-pointer bg-[#FAFAFA] flex justify-between items-center">
        <p className="text-2xl font-semibold sm:text-sm text-[#151515]">
          لیست تمام گروه ها
        </p>
        <NavLink to="/store/groups/addGroup">
          <Button_component
            children={
              <div className="flex justify-center flex-row-reverse items-center">
                ایجاد گروه جدید<div className="text-xl p-0  ml-3">+</div>
              </div>
            }
            ButtonClass="bg-[#2DCEA2] text-xs font-bold h-11 flex justify-center items-center"
          />
        </NavLink>
      </div>
      <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
        <ConfigProvider locale={faIR}>
          <Table dataSource={tableData} columns={columns_anniversary}></Table>
        </ConfigProvider>
      </div>
      <Modal
      modalHeader={<></>}
          modalClass="!min-w-[30%] p-0"
        modalBody={
          <div className="flex flex-col  justify-center">
            <p className="font-semibold text-xl sm:text-lg text-[#212121] mb-1">
              مطمئنید می‌خواهید این دفترچه را حذف کنید؟
            </p>
            <p className="text-[#607D8B] text-sm font-normal">
              در صورت نیاز به برگرداندن دفترچه، با پشتیبانی در ارتباط باشید
            </p>
          </div>
        }
        modalHeaderClass="h-0 p-1"
        modalFooter={
          <div className="flex flex-col items-center justify-center">
            <Button_component
              onClick={handleDelete}
              children="حذف"
              ButtonClass="bg-[#B71C1C] text-xs font-bold h-11 flex justify-center items-center"
            />
          </div>
        }
        modalFooterClass="flex justify-center items-center"
        Open={showModal}
        HandleOpen={showModalHandler}
      />
    </div>
  );
};

export default Groups;

// Types
interface DataType {
  key: React.Key;
  groupName: string;
  Notebooks: string;
  numberUsers: number;
  textmessage: string;
  disable: boolean;
}

type DataIndex = keyof DataType;
