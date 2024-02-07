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
import { NavLink } from "react-router-dom";
import fa_IR from "antd/locale/fa_IR";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  notesSlice,
  selectnotesData,
  selectnotesSearchText,
  selectnotesSearchedColumn,
  useSelector,
  useDispatch,
  appSlice,
  notesData,
  selectnotesDeleteId,
  selectShowModal,
} from "../../../../lib/redux";
import Highlighter from "react-highlight-words";
import "../../../components/TableInputNote/TableInputNote.scss";
import { ColumnType } from "antd/es/table";
import { ColumnsType, FilterConfirmProps } from "antd/es/table/interface";
import Modal from "../../../components/Modal";

const Notes: React.FC = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModal);
  const showModalHandler = () => dispatch(appSlice.actions.setShowModal());
  const tableData = useSelector(selectnotesData);
  const searchTextValue = useSelector(selectnotesSearchText);
  const searchedColumn = useSelector(selectnotesSearchedColumn);
  const deleteId = useSelector(selectnotesDeleteId);
  const searchInput = useRef<InputRef>(null);

  const handleDelete = () => {
    showModalHandler();
    const newData = tableData.filter((item) => item.key !== deleteId);
    const data: notesData[] = [];
    newData.map((item, index) => data.push({ ...item, key: index + 1 }));
    dispatch(notesSlice.actions.setNewData(data));
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(notesSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(notesSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(notesSlice.actions.setSearchText(""));
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

  const columns_anniversary: ColumnsType<DataType> = [
    {
      title: "عنوان دفترچه تلفن",
      dataIndex: "groupName",
      key: "groupName",
      align: "center",
      // width: "50%",
      ...getColumnSearch("groupName", "عنوان دفترچه تلفن"),
    },
    {
      title: "گروه ها",
      dataIndex: "groups",
      key: "groups",
      align: "center",
      // width: "35%",
      ...getColumnSearch("groups", "گروه ها"),
      render: (tags: string) => (
        <Tag className="font-normal p-1 text-xs text-[#000000D9]">{tags}</Tag>
      ),
    },
    {
      title: "تعداد مخاطبین",
      dataIndex: "numberUsers",
      key: "numberUsers",
      align: "center",
      // width: "20%",
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
      width: 100,
      render: (action: number) => (
        <Space>
          <NavLink to={`/store/notes/viewNote/${action}`}>
            <Button type="link">مشاهده و ویرایش</Button>
          </NavLink>
          <Button
            onClick={() => {
              showModalHandler();
              dispatch(notesSlice.actions.setNotesDeleteId(action));
            }}
            type="link"
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
      <div className="flex flex-col items-center content-center p-10 sm:!p-5 xl:w-full h-full">
        <div className="mb-5 w-full h-16 p-3 bg-cover rounded-lg md:mb-3 hover:cursor-pointer bg-[#FAFAFA]  flex justify-between items-center">
          <p className="text-2xl font-semibold sm:text-sm text-[#151515]">
            لیست تمام دفترچه تلفن ها
          </p>
          <NavLink to="/store/notes/addNotePhone">
            <Button_component
              children={
                <div className="flex justify-center flex-row-reverse items-center">
                  ایجاد دفترچۀ جدید<div className="text-xl p-0  ml-3">+</div>
                </div>
              }
              ButtonClass="bg-[#2DCEA2] text-xs font-bold h-11 flex justify-center items-center"
            />
          </NavLink>
        </div>
        <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer ">
          <ConfigProvider locale={fa_IR}>
            <Table dataSource={tableData} columns={columns_anniversary}></Table>
          </ConfigProvider>
        </div>
        <Modal
          modalHeader={<></>}
          modalClass="!min-w-[30%]"
          modalBody={
            <>
              <p className="font-semibold sm:text-base text-xl text-[#212121]">
                مطمئنید می‌خواهید این دفترچه را حذف کنید؟
              </p>
            </>
          }
          modalBodyClass=""
          modalFooter={
            <>
              <Button_component
                onClick={handleDelete}
                children="حذف"
                ButtonClass="bg-[#B71C1C] text-xs font-bold h-11 flex justify-center items-center"
              />
            </>
          }
          modalFooterClass="flex justify-center items-center "
          Open={showModal}
          HandleOpen={showModalHandler}
        />
      </div>
    </>
  );
};

export default Notes;

// Types
interface DataType {
  key: React.Key;
  groupName: string;
  groups: string;
  numberUsers: number;
}

type DataIndex = keyof DataType;
