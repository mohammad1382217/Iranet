import React, { useRef } from "react";
import {
  Input,
  Tag,
  Space,
  Table,
  Button,
  ConfigProvider,
  InputRef,
} from "antd";
import "./ModalTableSendReport.scss";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import Button_component from "../../../components/Button";
import {
  sendReportSlice,
  selectsendReportData,
  selectsendReportSearchText,
  selectsendReportSearchedColumn,
  useSelector,
  appSlice,
  useDispatch,
  selectShowModalSendReport,
  sendReportData,
} from "../../../../lib/redux";
import Highlighter from "react-highlight-words";
import "../../../components/TableInputNote/TableInputNote.scss";
import fa_IR from "antd/locale/fa_IR";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import Modal from "../../../components/Modal";

const SendReports: React.FC = () => {
  const [idDetails, setIdDetails] = React.useState(1);
  const dispatch = useDispatch();
  const tableData = useSelector(selectsendReportData);
  const tableModalData = [tableData[idDetails - 1]];
  const searchTextValue = useSelector(selectsendReportSearchText);
  const searchedColumn = useSelector(selectsendReportSearchedColumn);
  const searchInput = useRef<InputRef>(null);
  const showModal = useSelector(selectShowModalSendReport);
  const showModalHandler = (key?: number) => {
    setIdDetails(key!);
    dispatch(appSlice.actions.setShowModalSendReport());
  };
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
      title: "تاریخ ارسال",
      dataIndex: "senddate",
      key: "senddate",
      align: "center",
      sorter: (a: DataType, b: DataType) =>
        a.senddate.localeCompare(b.senddate),
    },
    {
      title: "شناسه ارسال",
      dataIndex: "recognize_send_code",
      align: "center",
      key: "recognize_send_code",
      width: "25%",
      ...getColumnSearch("recognize_send_code", "شناسه ارسال"),
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
            className="font-normal p-1 text-xs text-[#000000D9]"
          >
            {Condition}
          </Tag>
        )),
    },
    {
      title: "هزینۀ نهایی",
      dataIndex: "final_price",
      key: "final_price",
      width: "20%",
      align: "center",
      filters: [
        {
          text: "200,000",
          value: "200000",
        },
        {
          text: "400,000",
          value: "400000",
        },
      ],
      onFilter: (value: string, record: { final_price: string }) =>
        record.final_price.startsWith(value),
      sorter: (a: DataType, b: DataType) =>
        a.final_price.localeCompare(b.final_price),
    },
    {
      title: "جزئیات",
      align: "center",
      dataIndex: "key",
      key: "key",
      render: (Key: number) => (
        <Space>
          <Button type="link" onClick={() => showModalHandler(Key)}>
            مشاهدۀ
          </Button>
        </Space>
      ),
    },
  ];

  const columns_Modal = [
    {
      title: "شناسه ارسال",
      dataIndex: "recognize_send_code",
      key: "recognize_send_code",
      width: "5%",
      align: "center",
    },
    {
      title: "تاریخ ارسال",
      dataIndex: "senddate",
      key: "senddate",
      width: "5%",
      align: "center",
    },
    {
      title: "شماره فرستنده",
      dataIndex: "SenderNumber",
      key: "SenderNumber",
      width: "5%",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "Condition",
      key: "Condition",
      width: "5%",
      align: "center",
      // ...getColumnSearch("Condition", "وضعیت"),
      render: (Condition: string[]) =>
        Condition.map((Condition, index) => (
          <Tag
            key={index}
            className="font-normal p-1 text-xs text-[#000000D9]"
          >
            {Condition}
          </Tag>
        )),
    },
    {
      title: "شیوه ارسال",
      dataIndex: "SendMethod",
      key: "SendMethod",
      width: "5%",
      align: "center",
    },
    {
      title: "گروه",
      dataIndex: "Groups",
      key: "Groups",
      width: "5%",
      align: "center",
    },
    {
      title: "تعداد صفحه",
      dataIndex: "NumberPages",
      key: "NumberPages",
      width: "5%",
      align: "center",
    },
    {
      title: "متن پیام",
      dataIndex: "TextMessage",
      key: "TextMessage",
      width: "10%",
      align: "center",
    },
    {
      title: "توضیحات",
      dataIndex: "Descrioption",
      key: "Descrioption",
      width: "5%",
      align: "center",
    },
    {
      title: "تعداد ارسال های موفق",
      dataIndex: "SucsessSend",
      key: "SucsessSend",
      width: "5%",
      align: "center",
    },
    {
      title: "تعداد ارسال های ناموفق",
      dataIndex: "FaildSend",
      key: "FaildSend",
      width: "5%",
      align: "center",
    },
    {
      title: "هزینه برگشتی",
      dataIndex: "BackPrice",
      key: "BackPrice",
      width: "5%",
      align: "center",
    },
    {
      title: "هزینۀ نهایی",
      dataIndex: "final_price",
      key: "final_price",
      width: "5%",
      align: "center",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center p-10 sm:!p-5 xl:w-full h-full">
        <div className=" w-full h-16 p-3 bg-cover rounded-lg  hover:cursor-pointer bg-[#FAFAFA] flex justify-between items-center">
          <p className="text-2xl font-semibold sm:text-xs text-[#151515]">
            لیست کل گزارشات ارسال پیام
          </p>
        </div>
        <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer ">
          <ConfigProvider locale={fa_IR}>
            <Table
              className="mt-5"
              bordered
              dataSource={tableData}
              columns={columns as ColumnsType<DataType>}
            />
          </ConfigProvider>
        </div>
        <Modal
          Open={showModal}
          HandleOpen={showModalHandler}
          modalHeader={<></>}
          modalClass="!min-w-[90%]"
          modalBodyClass="flex flex-row justify-center"
          modalBody={
            <div className="overflow-hidden modaltable">
              <ConfigProvider locale={fa_IR}>
                <Table
                  className="mt-5 w-full"
                  bordered
                  dataSource={tableModalData}
                  columns={columns_Modal as ColumnsType<sendReportData>}
                />
              </ConfigProvider>
            </div>
          }
          modalFooterClass="flex items-center justify-center"
          modalFooter={
            <Button_component
              onClick={() => showModalHandler()}
              children="بازگشت"
              ButtonClass="bg-secondary text-xs font-bold h-11 flex items-center justify-center"
            />
          }
        />
      </div>
    </>
  );
};

export default SendReports;

// Types
export interface DataType {
  key: React.Key;
  senddate: string;
  recognize_send_code: number;
  final_price: string;
  Condition: string[];
}

type DataIndex = keyof DataType;
