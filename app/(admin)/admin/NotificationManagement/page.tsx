import React, { Suspense } from "react";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import Upload from "antd/es/upload/index";
import message from "antd/es/message/index";
import screen from "../../../assets/images/screen-number.webp";
import {
  HiOutlineArrowCircleRight,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import Modal from "../../../components/Modal";
import { maxFileSize } from "../../../(store)/store/Tickets/AddTickets/page";
import {
  NotificationManagementSlice,
  SurveySlice,
  appSlice,
  selectFile,
  selectShowModalDragUploadNotification,
  selectShowModalParticipants,
  selectUserManagementData,
  useDispatch,
  useSelector,
  selectShowModalDragUploadAd,
  selectShowModalDeleteAd,
  selectShowModals,
  groupsSlice,
  selectInputTitileGroup,
  selectInputTextMessage,
  selectGroupOpations,
  selectedGroupOpation,
} from "../../../../lib/redux";

const HeaderWithButton = React.lazy(
  () => import("../../../components/HeaderWithButton")
);
const Textarea = React.lazy(() => import("../../../components/TextArea"));
const Input = React.lazy(() => import("antd/es/input/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Space = React.lazy(() => import("antd/es/space/index"));
const { Dragger } = Upload;

const NotificationManagement: React.FC = () => {
  const dispatch = useDispatch();

  const InputTitileGroup = useSelector(selectInputTitileGroup);
  const InputTextMessage = useSelector(selectInputTextMessage);
  const isDisabled = InputTextMessage === "" || InputTitileGroup === "";

  //select
  const options = useSelector(selectGroupOpations);
  const selectedItems = useSelector(selectedGroupOpation);
  const filteredOptions = options.filter((o) => !selectedItems.includes(o));

  const canselAdd = () => {
    showModalHandler();
    dispatch(groupsSlice.actions.setTitileGroup(""));
    dispatch(groupsSlice.actions.settextmessage(""));
  };

  const canselEdit = () => {
    showModalParticipantsHandler();
    dispatch(groupsSlice.actions.setTitileGroup(""));
    dispatch(groupsSlice.actions.settextmessage(""));
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(groupsSlice.actions.settextmessage(e.target.value));
  };

  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
  };
  const showModalParticipantsHandler = () => {
    dispatch(SurveySlice.actions.setShowModalParticipants());
  };
  const showModalDragUploadNotificationHandler = () => {
    dispatch(
      NotificationManagementSlice.actions.setShowModalDragUploadNotification()
    );
  };
  const showModalDragUploadAdHandler = () => {
    dispatch(NotificationManagementSlice.actions.setShowModalDragUploadAd());
  };
  const showModalDeleteAdHandler = () => {
    dispatch(NotificationManagementSlice.actions.setShowModalDeleteAd());
  };
  const showModals = useSelector(selectShowModals);
  const showModalParticipants = useSelector(selectShowModalParticipants);
  const showModalDragUpload = useSelector(
    selectShowModalDragUploadNotification
  );
  const showModalDragUploadAd = useSelector(selectShowModalDragUploadAd);
  const showModalDeleteAd = useSelector(selectShowModalDeleteAd);
  const File = useSelector(selectFile);
  const tableData = useSelector(selectUserManagementData);

  const columnParticipants: CustomColumnType<DataType>[] = [
    {
      title: "عنوان تبلیغ",
      dataIndex: "name",
      // align: "center",
      key: "ad",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      // align: "center",
      key: "operation",
    },
  ];

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "عنوان اعلان",
      dataIndex: "titleStore",
      key: "titleStore",
      searchProps: true,
    },
    {
      title: "متن اعلان",
      dataIndex: "ownerName",
      key: "ownerName",
      searchProps: true,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      render: (index: number, record) => {
        return (
          <Button
            type="link"
            onClick={() => {}}
            // danger
            className={`p-0 ${
              record.disabledUser === false
                ? "text-[#E53935]"
                : "text-[#43A047]"
            }`}
          >
            {record.disabledUser === false ? "حذف" : "فعال"}
            {/* {record.disabledUser} */}
          </Button>
        );
      },
      sorter: (a, b) => a.Auth.localeCompare(b.Auth),
    },
    {
      title: "عملیات",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (index: number, record: DataType) => (
        <Space>
          <Button
            className="p-0"
            type="link"
            onClick={showModalParticipantsHandler}
          >
            مشاهده و ویرایش
          </Button>
          <Button
            className="text-[#E53935] p-0"
            type="link"
            onClick={() => {
              // showModalHandler();
              // dispatch(groupsSlice.actions.setDeleteId(index));
            }}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-row lg-max:flex-col">
      <div className="p-10 sm-max:!py-3 sm-max:!px-5 w-full h-full flex items-center content-center flex-col gap-4">
        <div className="flex flex-col items-center gap-4 w-full h-full">
          <HeaderWithButton
            HeaderTitle={"اعلان های منتشر شده"}
            Button={
              <Suspense fallback={<>درحال بارگیری...</>}>
                <ButtonComponent
                  ButtonClass="bg-primary text-xs font-bold px-4 py-2.5 h-11 flex justify-center items-center"
                  onClick={showModalHandler}
                >
                  <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
                    ایجاد اعلان جدید
                    <div className="text-xl p-0 ml-3 sm-max:ml-2">+</div>
                  </div>
                </ButtonComponent>
              </Suspense>
            }
          />
          <div className="mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
            <CustomTable
              size="large"
              bordered
              dataSource={tableData}
              columns={columns}
              theme="primary"
            />
          </div>
          <Modal
            modalClass="!min-w-[30%] lg-max:!min-w-[90%] sm-max:w-80"
            modalHeaderClass="flex flex-row justify-between pb-2"
            modalHeader={<></>}
            modalBody={
              <>
                <p
                  lang="fa"
                  role="text"
                  className="text-2xl p-1 text-right self-start font-semibold sm-max:text-base text-textColor"
                >
                  فرم ایجاد اعلان
                </p>
                <Input
                  value={InputTitileGroup}
                  onChange={(e) =>
                    dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                  }
                  placeholder="عنوان اعلان"
                  className="mt-5 h-10"
                ></Input>
                <Textarea
                  ShowCount={true}
                  TextAreaClass="mt-3 h-44 p-5"
                  MaxLength={1000}
                  Value={InputTextMessage}
                  onChange={onChange}
                  Placeholder="متن اعلان"
                />
                <div className="w-full">
                  <p
                    lang="fa"
                    role="text"
                    className="text-[#78909C] font-normal text-right text-sm mt-5"
                  >
                    حداکثر 1000 کاراکتر
                  </p>
                </div>
                <Select
                  className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-5"
                  size="large"
                  mode="multiple"
                  placeholder="همه فروشگاه ها"
                  onChange={(e: unknown) =>
                    dispatch(groupsSlice.actions.setSelectedOption(e as string))
                  }
                  style={{}}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <ButtonComponent
                  disabled={isDisabled}
                  ButtonClass="bg-primary sm-max:text-[10px] w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                  // onClick={handleCreateGroup}
                >
                  ایجاد اعلان
                </ButtonComponent>

                <ButtonComponent
                  onClick={canselAdd}
                  ButtonClass="flex items-center justify-center mt-1 mx-auto bg-white shadow-none hover:shadow-none"
                >
                  <div className="flex items-center gap-2 text-sm text-textColor font-medium">
                    <HiOutlineArrowCircleRight
                      className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                    />
                    <div>
                      <span className="text-[#757575]">لغو عملیات و</span> برگشت
                      به داشبورد
                    </div>
                  </div>
                </ButtonComponent>
              </>
            }
            modalFooter={<></>}
            modalFooterClass="flex items-center justify-center pt-2"
            Open={showModals.showModalOrigin}
            HandleOpen={showModalHandler}
          />
          <Modal
            modalClass="!min-w-[30%] lg-max:!min-w-[90%] !min-h-[400px]"
            modalHeaderClass="flex flex-row justify-between pb-2"
            modalHeader={<></>}
            modalBody={
              <>
                <p
                  lang="fa"
                  role="text"
                  className="text-2xl p-1 text-right self-start font-semibold sm-max:text-base text-textColor"
                >
                  فرم مشاهده و ویرایش اعلان
                </p>
                <Input
                  value={InputTitileGroup}
                  onChange={(e) =>
                    dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                  }
                  placeholder="عنوان اعلان"
                  className="mt-5 h-10"
                ></Input>
                <Textarea
                  ShowCount={true}
                  TextAreaClass="mt-3 h-44 p-5"
                  MaxLength={1000}
                  Value={InputTextMessage}
                  onChange={onChange}
                  Placeholder="متن اعلان"
                />
                <div className="w-full">
                  <p
                    lang="fa"
                    role="text"
                    className="text-[#78909C] font-normal text-right text-sm mt-5"
                  >
                    حداکثر 1000 کاراکتر
                  </p>
                </div>
                <Select
                  className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-5"
                  size="large"
                  mode="multiple"
                  placeholder="همه فروشگاه ها"
                  defaultValue={selectedItems}
                  onChange={(e: unknown) =>
                    dispatch(groupsSlice.actions.setSelectedOption(e as string))
                  }
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <ButtonComponent
                  disabled={isDisabled}
                  ButtonClass="bg-primary sm-max:text-[10px] w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                  // onClick={handleCreateGroup}
                >
                  ایجاد اعلان
                </ButtonComponent>

                <ButtonComponent
                  onClick={canselEdit}
                  ButtonClass="flex items-center justify-center mt-1 mx-auto bg-white shadow-none hover:shadow-none"
                >
                  <div className="flex items-center gap-2 text-sm text-textColor font-medium">
                    <HiOutlineArrowCircleRight
                      className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                    />
                    <div>
                      <span className="text-[#757575]">لغو عملیات و</span> برگشت
                      به داشبورد
                    </div>
                  </div>
                </ButtonComponent>
              </>
            }
            modalFooter={<></>}
            modalFooterClass="flex items-center justify-center pt-2"
            Open={showModalParticipants}
            HandleOpen={showModalParticipantsHandler}
          />
          <Modal
            modalClass="!min-w-[40%] lg-max:!min-w-[90%]"
            modalHeader={<></>}
            modalHeaderClass="hidden"
            modalBody={
              <Dragger
                fileList={File}
                multiple={false}
                maxCount={1}
                beforeUpload={(file) => {
                  const fileType = file.type;
                  if (!fileType.startsWith("image/")) {
                    // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                    message.error("شما فقط میتوانید عکس بارگذاری نمایید!");
                    return false;
                  } else if (file.size > maxFileSize) {
                    // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                    message.error("حداکثر حجم مجاز 5 مگابایت می باشد.");
                    return false;
                  } else if (file && Array.isArray(file) && file.length > 1) {
                    // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                    message.error("شما مجاز به بارگذاری فقط یک فایل هستید");
                    return false;
                  }
                  // setFieldValue("national_card", file);
                  showModalDragUploadNotificationHandler();
                  message.success(`فایل ${file.name} با موفقیت بارگذاری شد.`);
                  return false;
                }}
                onChange={(info) => {
                  const fileList = [...info.fileList];
                  // if (national_card.length !== 0) {
                  //   dispatch(loginSlice.actions.setNationalCard(fileList));
                  // }
                }}
              >
                <div className="flex flex-col justify-center h-[250px]">
                  <p
                    lang="fa"
                    role="text"
                    className="ant-upload-drag-icon flex items-center justify-center"
                  >
                    <HiOutlineCloudUpload className="w-12 h-12 text-primary" />
                  </p>
                  <p lang="fa" role="text" className="ant-upload-text">
                    برای انتخاب فایل تبلیغ، کلیک کنید یا آن‌را به اینجا بکشید
                  </p>
                  <p lang="fa" role="text" className="ant-upload-hint">
                    فایل با نسبت ابعاد 5:1 فرمت gif، jpg، png یا webp و حجم
                    نهایتاً 3مگابایت
                  </p>
                </div>
              </Dragger>
            }
            modalFooter={<></>}
            modalFooterClass="hidden"
            Open={showModalDragUpload}
            HandleOpen={showModalDragUploadNotificationHandler}
          />
          <Modal
            modalClass="!min-w-[40%] lg-max:!min-w-[90%]"
            modalHeader={<></>}
            modalHeaderClass="hidden"
            modalBody={
              <Dragger
                fileList={File}
                multiple={false}
                maxCount={1}
                beforeUpload={(file) => {
                  const fileType = file.type;
                  if (!fileType.startsWith("image/")) {
                    // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                    message.error("شما فقط میتوانید عکس بارگذاری نمایید!");
                    return false;
                  } else if (file.size > maxFileSize) {
                    // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                    message.error("حداکثر حجم مجاز 5 مگابایت می باشد.");
                    return false;
                  } else if (file && Array.isArray(file) && file.length > 1) {
                    // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                    message.error("شما مجاز به بارگذاری فقط یک فایل هستید");
                    return false;
                  }
                  // setFieldValue("national_card", file);
                  showModalDragUploadAdHandler();
                  message.success(`فایل ${file.name} با موفقیت بارگذاری شد.`);
                  return false;
                }}
                onChange={(info) => {
                  const fileList = [...info.fileList];
                  // if (national_card.length !== 0) {
                  //   dispatch(loginSlice.actions.setNationalCard(fileList));
                  // }
                }}
              >
                <div className="flex flex-col justify-center h-[250px]">
                  <p
                    lang="fa"
                    role="text"
                    className="ant-upload-drag-icon flex items-center justify-center"
                  >
                    <HiOutlineCloudUpload className="w-12 h-12 text-primary" />
                  </p>
                  <p lang="fa" role="text" className="ant-upload-text">
                    برای انتخاب فایل محافظ صفحه، کلیک کنید یا آن‌را به اینجا
                    بکشید
                  </p>
                  <p lang="fa" role="text" className="ant-upload-hint">
                    فایل با نسبت ابعاد 3:5 فرمت gif یا mp4 و حجم نهایتاً
                    5مگابایت
                  </p>
                </div>
              </Dragger>
            }
            modalFooter={<></>}
            modalFooterClass="hidden"
            Open={showModalDragUploadAd}
            HandleOpen={showModalDragUploadAdHandler}
          />
        </div>
        <div className="w-full grid grid-cols-2 lg-max:grid-cols-1 gap-10 items-start justify-center">
          <section className="flex flex-col gap-4">
            <HeaderWithButton
              ParentClass="!p-6"
              headerClass="!max-w-full"
              HeaderTitle={"مدیریت تبلیغات"}
              Button={
                <ButtonComponent
                  onClick={showModalDragUploadAdHandler}
                  ButtonClass="bg-primary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                >
                  <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
                    ایجاد تبلیغ جدید
                    <div className="text-xl p-0 ml-3 sm-max:ml-2">+</div>
                  </div>
                </ButtonComponent>
              }
            />
            <div className="flex flex-col items-start justify-between gap-6">
              <CustomTable className="w-full" dataSource={[]} columns={columnParticipants} theme={""} />
              <Modal
                modalClass="!min-w-[30%] lg-max:!min-w-[90%]"
                modalHeader={
                  <div className="container flex !items-center !justify-center gap-6 sm-max:gap-4">
                    <h2>آیا از حذف تبلیغ اطمینان دارید؟</h2>
                  </div>
                }
                modalHeaderClass="p-6"
                modalBodyClass="hidden"
                modalBody={<></>}
                modalFooter={
                  <div className="container flex items-center justify-center gap-6 sm-max:gap-4">
                    <ButtonComponent
                      onClick={showModalDeleteAdHandler}
                      ButtonClass="bg-red-900 text-xs font-bold text-white h-10 flex items-center justify-center"
                    >
                      حذف
                    </ButtonComponent>
                  </div>
                }
                modalFooterClass=""
                Open={showModalDeleteAd}
                HandleOpen={showModalDeleteAdHandler}
              />
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <HeaderWithButton
              ParentClass="px-6"
              headerClass="sm-max:!max-w-[165px]"
              HeaderTitle={"محافظ صفحه پیش‌فرض اپلیکیشن"}
            />
            <div className="flex items-start gap-6">
              <div
                className="w-[180px] h-[297px] flex flex-col items-center justify-center"
                style={{
                  backgroundImage: `url(${screen})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <section className="flex flex-col gap-2">
                <span className="text-blue-gray-600">
                  نام فایل محافظ صفحه : 1.gif
                </span>
                <span
                  className="flex justify-end flex-row-reverse items-center sm-max:text-[0.625rem] text-primary cursor-pointer"
                  onClick={showModalDragUploadAdHandler}
                >
                  ویرایش محافظ صفحه
                </span>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;

// Types
export interface DataType {
  key: React.Key;
  titleStore: string;
  ownerName: string;
  nationalCode: string;
  phoneNumber: string;
  Auth: string;
  disabledUser: boolean;
}
