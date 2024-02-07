import React, { useRef } from "react";
import Button_component from "../../../components/Button";
import { ConfigProvider, Input, InputRef, Space, Table, Tag } from "antd";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { SearchOutlined } from "@ant-design/icons";
import {
  appSlice,
  selectShowModal,
  selectticketsSearchText,
  selectticketsSearchedColumn,
  sendReportSlice,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Alert, Typography } from "@material-tailwind/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Parag } from "../../../components/tools";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import Modal from "../../../components/Modal";
import fa_IR from "antd/locale/fa_IR";

const IconOutlined = () => {
  return <HiOutlineInformationCircle className="h-6 w-6" />;
};
interface DataType {
  key: React.Key;
  date: string;
  amount: number;
  tags: string[];
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    date: "1400/10/10",
    amount: 50000,
    tags: ["واریز به حساب"],
  },
  {
    key: "2",
    date: "1400/10/20",
    amount: 129000,
    tags: ["پرداخت مستقیم"],
  },
  {
    key: "3",
    date: "1400/00/00",
    amount: 75000,
    tags: ["پرداخت مستقیم"],
  },
  {
    key: "4",
    date: "1400/00/00",
    amount: 1000000,
    tags: ["واریز به حساب"],
  },
];

const ChargeAccount: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = useSelector(selectShowModal);
  const searchTextValue = useSelector(selectticketsSearchText);
  const searchedColumn = useSelector(selectticketsSearchedColumn);
  const searchInput = useRef<InputRef>(null);

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
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      align: "center",
      ...getColumnSearch("date", "تاریخ"),
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "روش پرداخت",
      key: "tags",
      align: "center",
      dataIndex: "tags",
      filters: [
        {
          text: "واریز به حساب",
          value: "واریز به حساب",
        },
        {
          text: "پرداخت مستقیم",
          value: "پرداخت مستقیم",
        },
      ],
      onFilter: (value: any, record) => record.tags.includes(value),
      render: (tags: string[]) => (
        <span>
          {tags.map((tag) => {
            let color = tag === "واریز به حساب" ? "purple" : "blue";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "مبلغ",
      key: "amount",
      align: "center",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      ...getColumnSearch("amount", "مبلغ"),
    },
  ];

  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModal());
  };

  const handleClickDirectPayment = () => {
    navigate("/store/DirectPayment");
    showModalHandler();
  };

  const handleClickDepositToTheAccount = () => {
    navigate("/store/DepositToTheAccount");
    showModalHandler();
  };

  return (
    <div className="flex flex-col items-center p-10 sm:!p-5 xl:w-full h-full">
      <div className="w-full h-16 rounded-lg bg-[#FAFAFA] flex p-3 justify-between items-center">
        <p className="text-2xl font-semibold sm:text-xs text-[#151515]">
          لیست کل سوابق شارژ حساب
        </p>
        <Button_component
          onClick={showModalHandler}
          children={
            <div className="flex sm:text-[10px] justify-center flex-row-reverse items-center">
              افزایش موجودی حساب
              <div className="text-xl sm:text-xs p-0 ml-3">+</div>
            </div>
          }
          ButtonClass="bg-[#2DCEA2] text-xs font-bold sm:p-5 h-11 flex justify-center items-center"
        />
      </div>
      <div className="mb-5 w-full h-16 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
        <ConfigProvider locale={fa_IR}>
          <Table
            className="mt-5"
            bordered
            dataSource={data}
            columns={columns}
          />
        </ConfigProvider>
      </div>
      <Modal
        modalClass="!min-w-[50%] inline-flex flex-col py-[30px] px-[40px] justify-center items-center gap-6 rounded-lg bg-white"
        modalHeader={"انتخاب روش پرداخت"}
        modalHeaderClass="text-4xl font-bold justify-center lg:text-2xl !p-0"
        modalBody={
          <div className="container flex items-center justify-center shrink-0 flex-wrap gap-4">
            <div
              onClick={() => handleClickDirectPayment()}
              className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-48 rounded-lg border border-solid border-light-blue-300 bg-light-blue-50 cursor-pointer"
            >
              <Parag
                Paragraph={"پرداخت مستقیم"}
                Pclass={"text-2xl text-center font-bold text-light-blue-600"}
              />
            </div>
            <div
              onClick={() => handleClickDepositToTheAccount()}
              className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-48 rounded-lg border border-solid border-purple-300 bg-purple-50 cursor-pointer"
            >
              <Parag
                Paragraph={"واریز به حساب"}
                Pclass={"text-2xl text-center font-bold text-purple-600"}
              />
            </div>
          </div>
        }
        modalBodyClass="flex !container !p-0"
        modalFooterClass="flex justify-between items-center !p-0"
        modalFooter={
          <>
            <div className="container flex flex-col shrink-0 gap-2">
              <Alert
                className="!border-0 !p-0 justify-center gap-2 self-stretch"
                variant="outlined"
                icon={<IconOutlined />}
              >
                <Typography className="text-base font-normal">
                  برای استفاده از روش واریز به حساب، ابتدا مبلغ مورد نظر خود را
                  به یکی از شماره های زیر واریز کنید
                </Typography>
                <div className="container flex flex-col items-center justify-center text-lg font-light">
                  <ol className="container list-inside list-decimal flex flex-col gap-2">
                    <li className="flex items-center justify-evenly self-stretch flex-wrap">
                      شماره کارت:
                      <span className="">1234543210123454321</span>
                    </li>
                    <li className="flex items-center justify-evenly self-stretch flex-wrap">
                      شماره حساب:
                      <span className="">1234543210123454321</span>
                    </li>
                    <li className="flex items-center justify-evenly self-stretch flex-wrap">
                      شماره شبا:
                      <span className="">1234543210123454321</span>
                    </li>
                  </ol>
                </div>
              </Alert>
            </div>
          </>
        }
        Open={showModal}
        HandleOpen={showModalHandler}
      />
    </div>
  );
};

export default ChargeAccount;
