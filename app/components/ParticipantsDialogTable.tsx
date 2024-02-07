import React, { useRef } from "react";
import {
  Input,
  Space,
  Table,
  ConfigProvider,
  Button as AntdButton,
  InputRef,
} from "antd";
import faIR from "antd/lib/locale/fa_IR";
import Button_component from "../components/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import {
  anniversaryDialogSlice,
  selectAnniversaryDialogSearchText,
  selectAnniversaryDialogSearchedColumn,
  useSelector,
  useDispatch,
} from "../../lib/redux";
import Highlighter from "react-highlight-words";
import "./TableInputNote/TableInputNote.scss";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";

export const ParticipantsDialogTable = () => {
  const TableData = [{
    key: 1,
    firstName: "محمد",
    lastName: "محمدی",
    TheDesiredOption: "عالی",
  }];
  const dispatch = useDispatch();

  const searchTextValue = useSelector(selectAnniversaryDialogSearchText);
  const searchedColumn = useSelector(selectAnniversaryDialogSearchedColumn);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(anniversaryDialogSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(anniversaryDialogSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(anniversaryDialogSlice.actions.setSearchText(""));
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
          width: 200,
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
            ButtonClass="!w-[80px] !h-[28px] border-secondary border-2 bg-[#FFFFFF] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2"
          >
            <span className="text-black text-[9px]">پاک سازی</span>
            <FaRegTrashAlt color="black" />
          </Button_component>
          <Button_component
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            ButtonClass="!w-[96px] !h-[28px] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-secondary gap-2"
          >
            <span className="text-[10px]">جستجو</span>
            <SearchOutlined className="w-4 h-4 leading-normal"/>
          </Button_component>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value: any, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
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

  const columns_anniversary = [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: "30%",
      ...getColumnSearch("firstName", "نام"),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: "30%",
      ...getColumnSearch("lastName", "نام خانوادگی"),
    },
    {
      title: "گزینه مورد نظر",
      dataIndex: "TheDesiredOption",
      key: "TheDesiredOption",
      width: "40%",
      filters: [
        {
          text: 'عالی',
          value: 'عالی',
        },
        {
          text: 'خیلی خوب',
          value: 'خیلی خوب',
        },
        {
          text: 'خوب',
          value: 'خوب',
        },
        {
          text: 'ضعیف',
          value: 'ضعیف',
        },
        {
          text: 'خیلی ضعیف',
          value: 'خیلی ضعیف',
        },
      ],
      onFilter: (value: any, record: DataType) => record.TheDesiredOption.includes(value),
    },
  ];
  return (
    <ConfigProvider locale={faIR}>
      <Table dataSource={TableData} columns={columns_anniversary} />
    </ConfigProvider>
  );
}

// Types
interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  TheDesiredOption: string;
}

type DataIndex = keyof DataType;