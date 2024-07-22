import React from "react";
import "../../../../components/TableInputNote/TableInputNote.scss";
import { Link } from "react-router-dom";
import CustomTable, { type CustomColumnType } from "../../../../components/Table";
import {
  useDispatch,
  useSelector,
  appSlice,
  selectShowModals,
} from "../../../../../lib/redux";

const HeaderWithButton = React.lazy(() => import("../../../../components/HeaderWithButton"));
const Modal = React.lazy(() => import("../../../../components/Modal"));
const Space = React.lazy(() => import( "antd/es/space/index"));
const Button = React.lazy(() => import( "antd/es/button/index"));
const ButtonComponent = React.lazy(() => import( "../../../../components/Button"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Textarea = React.lazy(() => import( "../../../../components/TextArea"));
const ArrowRightCircleIcon = React.lazy(() => import("@heroicons/react/24/outline/ArrowRightCircleIcon"));

const dataTable: DataType[] = [
  {
    key: 1,
    nameStore: "فروشگاه شماره 1",
    userName: "0123456789",
    dateSend: "1400/00/00 - 12:00",
    sendMethod: "شماره",
    price: "50,0000",
  },
  {
    key: 2,
    nameStore: "فروشگاه شماره 2",
    userName: "0123456789",
    dateSend: "1400/00/00 - 12:00",
    sendMethod: "فایل",
    price: "50,0000",
  },
  {
    key: 3,
    nameStore: "فروشگاه شماره 3",
    userName: "0123456789",
    dateSend: "1400/00/00 - 12:00",
    sendMethod: "گروه",
    price: "60,0000",
  },
  {
    key: 4,
    nameStore: "فروشگاه شماره 4",
    userName: "0123456789",
    dateSend: "1400/00/00 - 12:00",
    sendMethod: "انتخاب منطقه",
    price: "503,0000",
  },
  {
    key: 5,
    nameStore: "فروشگاه شماره 5",
    userName: "0123456789",
    dateSend: "1400/00/00 - 12:00",
    sendMethod: "کد پستی",
    price: "50,0000",
  },
  {
    key: 6,
    nameStore: "فروشگاه شماره 6",
    userName: "0123456789",
    dateSend: "1400/00/00 - 12:00",
    sendMethod: "پیام مناسبتی",
    price: "50,0000",
  },
];

const SystemDeposit: React.FC = () => {
  const dispatch = useDispatch();
  const [modalDeposit, setmodalDeposit] = React.useState(false);
  const showModals = useSelector(selectShowModals);
  const showModalHandler = () =>
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
  const handelmodalConfirm = () => {
    setmodalDeposit(!modalDeposit);
  };

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "nameStore",
      key: "nameStore",
      align: "center",
      searchProps: true,
    },
    {
      title: "نام کاربری",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      searchProps: true,
    },
    {
      title: "تاریخ  و ساعت ارسال",
      dataIndex: "dateSend",
      key: "dateSend",
      align: "center",
      DateRangeProps: true,
      sorter: (a: DataType, b: DataType) =>
        -a.dateSend.localeCompare(b.dateSend),
    },
    {
      title: "مبلغ",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (b, a) =>
        parseFloat(a.price.replace(/,/g, "")) -
        parseFloat(b.price.replace(/,/g, "")),
      searchProps: true,
    },
    {
      title: "جزئیات",
      dataIndex: "key",
      align: "center",
      render: (key: number) => (
        <Link to={`/admin/SmsSendingPanel/viewSmsDetailsReport/${key}`}>
          <Button className="p-0" type="link">
            مشاهده
          </Button>
        </Link>
      ),
    },
    {
      title: "",
      dataIndex: "key",
      align: "center",
      render: () => (
        <Space>
          <Button
            className="text-[#E53935] p-0"
            type="link"
            onClick={() => {
              showModalHandler();
            }}
          >
            حذف
          </Button>
          <Button
            className="text-[#389E0D] p-0"
            type="link"
            onClick={() => {
              handelmodalConfirm();
            }}
          >
            تایید
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full gap-10">
      <HeaderWithButton
        HeaderTitle={"لیست واریزی های سامانه"}
        Button={
          <Link to="/admin/ListOfFinancialReports">
            <ButtonComponent ButtonClass="bg-primary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center">
              <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
                برگشت به گزارشات مالی{" "}
              </div>
            </ButtonComponent>
          </Link>
        }
      />
      <div className="w-full">
        <CustomTable columns={columns} dataSource={dataTable} theme="primary" />
      </div>
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[24%]"
        modalBody={
          <>
            <p lang="fa" role="text" className="font-semibold sm-max:text-base text-center text-xl text-[#212121]">
              از حذف این واریزی اطمینان دارید؟{" "}
            </p>
          </>
        }
        modalBodyClass=""
        modalFooter={
          <>
            <ButtonComponent
              onClick={() => {
                showModalHandler();
              }}
              children="حذف"
              ButtonClass="bg-[#B71C1C] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            />
          </>
        }
        modalFooterClass="flex justify-center items-center "
        Open={showModals.showModalOrigin}
        HandleOpen={showModalHandler}
      />
      <Modal
        modalClass="!min-w-[28%] sm-max:!min-w-[90%] mb-2 scroll-auto"
        modalHeader={"اطلاعات واریز"}
        modalHeaderClass="mt-2"
        modalBody={
          <div className="space-y-4">
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"شماره حساب یا کارت مبدا"}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"شماره پیگیری/رهگیری"}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"مبلغ"}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"تاریخ واریز"}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"قبض واریز"}
            />
            <Textarea
              TextAreaClass=""
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              Placeholder="توضیحات"
            />
            <div></div>
            <div className="flex flex-row-reverse justify-between">
              <ButtonComponent
                onClick={() => {
                  handelmodalConfirm();
                }}
                children="تایید واریزی"
                ButtonClass="bg-[#4CAF50] w-7/12 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
              <ButtonComponent
                onClick={() => {
                  handelmodalConfirm();
                }}
                children="حذف واریزی"
                ButtonClass="bg-[#B71C1C] w-4/12 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
            </div>
          </div>
        }
        modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={handelmodalConfirm}
              // onClick={goback}
              type="link"
              className="flex items-center justify-center mx-auto"
              icon={
                <ArrowRightCircleIcon
                  color="#E53935"
                  strokeWidth={2.5}
                  className={"h-3.5 w-3.5 mx-auto"}
                />
              }
            >
              <span className="text-sm text-textColor font-medium ">
                برگشت{" "}
              </span>
            </Button>
          </div>
        }
        Open={modalDeposit}
        HandleOpen={handelmodalConfirm}
      />
    </div>
  );
};

export default SystemDeposit;

// Types
interface DataType {
  key: React.Key;
  nameStore: string;
  userName: string;
  dateSend: string;
  sendMethod: string;
  price: string;
}
