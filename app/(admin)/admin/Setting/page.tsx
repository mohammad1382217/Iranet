import React from "react";
import { FaPlus } from "react-icons/fa";
import { Field, Form, Formik } from "formik/dist/index";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import Edit from "../../../assets/svg/edit.svg";
import LazyImage from "../../../components/LazyImage";
import FormAntd from "antd/es/form/index";
import {
  SettingSlice,
  appSlice,
  selectEditingKey,
  selectShowModalAddAccountAdmin,
  selectShowModalDeleteAccountAdmin,
  selectShowModalDeleteDepartment,
  selectShowModalDisablePayment,
  selectShowModalEditAccountAdmin,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const Modal = React.lazy(() => import("../../../components/Modal"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Input = React.lazy(() => import("antd/es/input/index"));
const Space = React.lazy(() => import("antd/es/space/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
const HeaderWithButton = React.lazy(
  () => import("../../../components/HeaderWithButton")
);
const ArrowRightCircleIcon = React.lazy(
  () => import("@heroicons/react/24/outline/ArrowRightCircleIcon")
);

const Setting: React.FC = () => {
  const dataAdmin: admins[] = [
    {
      key: "1",
      name: "نام مدیر شماره 1",
      NID: "0123456789",
      sath: "نام سطح 1",
    },
    {
      key: "2",
      name: "نام مدیر شماره 1",
      NID: "0123456789",
      sath: "نام سطح 2",
    },
    {
      key: "3",
      name: "نام مدیر شماره 1",
      NID: "0123456789",
      sath: "نام سطح 3",
    },
  ];

  const dataSmsTariffs = [
    {
      key: "1",
      type: "تبلیغاتی",
      number: "0123456789",
      tarefe1: "123",
      tarefe2: "123",
      tarefe3: "123",
      tarefe4: "123",
      tarefe5: "123",
    },
    {
      key: "2",
      type: "خدماتی",
      number: "0123456789",
      tarefe1: "123",
      tarefe2: "123",
      tarefe3: "123",
      tarefe4: "123",
      tarefe5: "123",
    },
    {
      key: "3",
      type: "ترکیبی",
      number: "0123456789",
      tarefe1: "123",
      tarefe2: "123",
      tarefe3: "123",
      tarefe4: "123",
      tarefe5: "123",
    },
    {
      key: "4",
      type: "ویژه",
      number: "0123456789",
      tarefe1: "123",
      tarefe2: "123",
      tarefe3: "123",
      tarefe4: "123",
      tarefe5: "123",
    },
  ];

  const [formAntd] = FormAntd.useForm();
  const dispatch = useDispatch();

  const showModalAddAccountAdmin = useSelector(selectShowModalAddAccountAdmin);
  const setShowModalAddAccountAdmin = () =>
    dispatch(SettingSlice.actions.setShowModalAddAccountAdmin());
  const showModalEditAccountAdmin = useSelector(
    selectShowModalEditAccountAdmin
  );
  const setShowModalEditAccountAdmin = () =>
    dispatch(SettingSlice.actions.setShowModalEditAccountAdmin());
  const showModalDeleteDepartment = useSelector(
    selectShowModalDeleteDepartment
  );
  const showModalDeleteDepartmentHandler = () =>
    dispatch(SettingSlice.actions.setShowModalDeleteDepartment());
  const showModalDeleteAccountAdmin = useSelector(
    selectShowModalDeleteAccountAdmin
  );
  const showModalDeleteAccountAdminHandler = () =>
    dispatch(SettingSlice.actions.setShowModalDeleteAccountAdmin());
  const showModalDisablePayment = useSelector(selectShowModalDisablePayment);
  const showModalDisablePaymentHandler = () =>
    dispatch(SettingSlice.actions.setShowModalDisablePayment());
  // const tableData = useSelector(selectuserNoteData);

  const edit = (record: Partial<SmsTariffs> & { key: React.Key }) => {
    formAntd.setFieldsValue({
      type: "",
      number: "",
      tarefe1: "",
      tarefe2: "",
      tarefe3: "",
      tarefe4: "",
      tarefe5: "",
      ...record,
    });
    dispatch(appSlice.actions.setEditingKeyTable(record.key as string));
  };

  const cancel = () => {
    dispatch(appSlice.actions.setEditingKeyTable(""));
  };

  const save = async (key: React.Key) => {
    try {
      const row = await formAntd.validateFields();
      const newData = [...dataSmsTariffs];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // dispatch(userNoteSlice.actions.setNewData(newData));
        dispatch(appSlice.actions.setEditingKeyTable(""));
      } else {
        newData.push(row);
        // dispatch(userNoteSlice.actions.setNewData(newData));
        dispatch(appSlice.actions.setEditingKeyTable(""));
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const status = (key: string) => {
    switch (key) {
      case "نام سطح 1":
        return (
          <Tag
            key={key}
            color="#FFFBE6"
            className="font-normal mx-auto p-1 rounded-lg text-xs !text-[#FAAD14] border border-solid !border-[#FFE58F]"
          >
            نام سطح 1
          </Tag>
        );
      case "نام سطح 2":
        return (
          <Tag
            key={key}
            color="#F0F5FF"
            className="font-normal mx-auto p-1 rounded-lg text-xs !text-[#2F54EB] border border-solid !border-[#ADC6FF]"
          >
            نام سطح 2
          </Tag>
        );
      case "نام سطح 3":
        return (
          <Tag
            key={key}
            color="#FFF2E8"
            className="font-normal mx-auto p-1 rounded-lg text-xs !text-[#FA541C] border border-solid !border-[#FFBB96]"
          >
            نام سطح 3
          </Tag>
        );
    }
  };

  const columnsAdmin: CustomColumnType<admins>[] = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "name",
      searchProps: true,
    },
    {
      title: "کد ملی",
      dataIndex: "nid",
      searchProps: true,
    },
    {
      title: "سطح دسترسی",
      dataIndex: "sath",
      render: (tags: string) => status(tags),
    },
    {
      title: "",
      dataIndex: "key",
      key: "key",
      render: () => (
        <Space>
          <Button
            className="p-0 text-primary"
            onClick={setShowModalEditAccountAdmin}
            type="link"
          >
            ویرایش
          </Button>
          <Button
            type="link"
            onClick={showModalDeleteAccountAdminHandler}
            className="text-red-700 p-0"
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  const columnsGuild: CustomColumnType<admins>[] = [
    {
      title: "صنف",
      dataIndex: "guild",
      searchProps: true,
      width: "80%",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      render: () => (
        <Space>
          <Button
            type="link"
            onClick={showModalDeleteAccountAdminHandler}
            className="text-red-700 p-0"
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  const columnsSmsTariffs: CustomColumnType<SmsTariffs>[] = [
    {
      title: "نوع",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "شماره",
      dataIndex: "number",
      editable: true,
    },
    {
      title: "تعرفه 1",
      dataIndex: "tarefe1",
      editable: true,
    },
    {
      title: "تعرفه 2",
      dataIndex: "tarefe2",
      editable: true,
    },
    {
      title: "تعرفه 3",
      dataIndex: "tarefe3",
      editable: true,
    },
    {
      title: "تعرفه 4",
      dataIndex: "tarefe4",
      editable: true,
    },
    {
      title: "تعرفه 5",
      dataIndex: "tarefe5",
      editable: true,
    },
    {
      title: "",
      dataIndex: "key",
      key: "key",
      render: (_: string, record: SmsTariffs) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex gap-2 mx-auto justify-center">
            <Button
              type="link"
              className="p-0 flex items-center justify-center text-[#52C41A] hover:!text-[#52C41A]"
              onClick={() => save(record.key)}
            >
              تایید
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 mx-auto justify-center">
            <Button
              type="link"
              className="p-0 text-primary"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              ویرایش
            </Button>
          </div>
        );
      },
    },
  ];

  const editingKey = useSelector(selectEditingKey);
  const isEditing = (record: SmsTariffs) => record.key === editingKey;

  const mergedColumns = columnsSmsTariffs.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: SmsTariffs) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="flex items-start w-full h-auto p-5 xl-max:flex-col">
      <section className="flex flex-col w-full">
        <div className="flex flex-col gap-3.5 w-full p-5">
          <HeaderWithButton
            ParentClass="!py-2"
            HeaderTitle={"اطلاعات سرویس پیامکی"}
          />
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center justify-between container p-3 bg-white border-[#ECEFF1] border-2 rounded-md">
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    نام کاربری : <span className="font-bold">محمد رضا</span>
                  </p>
                  <button
                    className="flex float-left"
                    // onClick={() => showModalHandler("InformationUser")}
                  >
                    <div className="w-4 h-4">
                      <LazyImage src={Edit} alt="edit" width={16} height={16} />
                    </div>
                    <span className="text-blue-gray-600 mr-2 font-normal text-sm">
                      ویرایش
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    رمز عبور : <span className="font-bold">سلطانی</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    توکن : <span className="font-bold">0123456789</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    شماره فرستنده :{" "}
                    <span className="font-bold">09121141516</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 w-full p-5">
          <div className="inline-flex flex-col items-center justify-center gap-4">
            <HeaderWithButton ParentClass="!py-2" HeaderTitle={"صنف ها"} />
            <div className="w-full flex flex-row items-center justify-between">
              <Input
                type={"text"}
                name={""}
                className={
                  "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
                }
                placeholder={"نام صنف"}
                onChange={() => {}}
                disabled={false}
              />

              <ButtonComponent
                ButtonClass={
                  "border border-gray-300 rounded-lg mr-3.5 p-3 bg-white"
                }
                onClick={() => {}}
              >
                <FaPlus className="h-3 w-3 text-blue-gray-300" />
              </ButtonComponent>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <CustomTable
              dataSource={[]}
              columns={columnsGuild}
              theme={"primary"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3.5 w-full p-5">
          <HeaderWithButton
            ParentClass="!py-2"
            HeaderTitle={"اطلاعات شارژ حساب"}
          />
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center justify-between container p-3 bg-white border-[#ECEFF1] border-2 rounded-md">
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    شماره کارت :{" "}
                    <span className="font-bold">6037123456789012</span>
                  </p>
                  <button
                    className="flex float-left"
                    // onClick={() => showModalHandler("InformationUser")}
                  >
                    <div className="w-4 h-4">
                      <LazyImage src={Edit} alt="edit" width={16} height={16} />
                    </div>
                    <span className="text-blue-gray-600 mr-2 font-normal text-sm">
                      ویرایش
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    شماره حساب :{" "}
                    <span className="font-bold">6789123456789012</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    شماره شبا : <span className="font-bold">0123456789</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <Input
            type={"text"}
            name={""}
            className={
              "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            placeholder={"شماره کارت"}
            onChange={() => {}}
            disabled={false}
          />
          <Input
            type={"text"}
            name={""}
            className={
              "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            placeholder={"شماره حساب"}
            onChange={() => {}}
            disabled={false}
          />
          <Input
            type={"text"}
            name={""}
            className={
              "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            placeholder={"شماره شبا"}
            onChange={() => {}}
            disabled={false}
          />
          <ButtonComponent ButtonClass="bg-primary sm-max:text-[10px] w-full mx-auto mt-5 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center">
            ثبت اطلاعات
          </ButtonComponent> */}
        </div>
        {/* <Formik initialValues={{}} onSubmit={() => {}}>
            {({ handleChange, handleBlur }) => (
              <Form className="flex flex-col items-center justify-center gap-3.5">
                <Field
                  placeholder="نام کاربری"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="group_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Field
                  placeholder="رمز عبور"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="group_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Field
                  placeholder="توکن"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="group_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Field
                  placeholder="شماره فرستنده"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="group_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form>
            )}
          </Formik>
          <ButtonComponent
            Type="submit"
            ButtonClass="bg-primary sm-max:text-[10px] w-full mx-auto mt-5 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          >
            ثبت اطلاعات
          </ButtonComponent> */}
        <Modal
          modalHeader={<></>}
          modalClass="!min-w-[30%] p-0"
          modalBody={
            <div className="flex flex-col justify-center">
              <p
                lang="fa"
                role="text"
                className="font-semibold text-xl sm-max:text-lg text-[#212121] mb-1"
              >
                مطمئنید می‌خواهید این صنف را حذف کنید؟
              </p>
              <p
                lang="fa"
                role="text"
                className="text-blue-gray-600 text-sm font-normal"
              >
                صنف های حذف شده، قابل بازگردانی نیستند
              </p>
            </div>
          }
          modalHeaderClass="h-0 p-1"
          modalFooter={
            <div className="container flex items-center justify-between">
              <ButtonComponent
                // onClick={handleDelete}
                ButtonClass="bg-red-600 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              >
                حذف صنف
              </ButtonComponent>
              <ButtonComponent
                ButtonClass="bg-white text-red-600 mr-1"
                onClick={showModalDeleteDepartmentHandler}
              >
                <span>لغو</span>
              </ButtonComponent>
            </div>
          }
          modalFooterClass="flex justify-center items-center"
          Open={showModalDeleteDepartment}
          HandleOpen={showModalDeleteDepartmentHandler}
        />
        <Modal
          modalHeader={<></>}
          modalClass="!min-w-[30%] p-0"
          modalBody={
            <div className="flex flex-col justify-center">
              <p
                lang="fa"
                role="text"
                className="font-semibold text-xl sm-max:text-lg text-[#212121] mb-1"
              >
                مطمئنید می‌خواهید این حساب کاربری را حذف کنید؟
              </p>
              <p
                lang="fa"
                role="text"
                className="text-blue-gray-600 text-sm font-normal"
              >
                حساب های مدیریت حذف شده، قابل بازگردانی نیستند
              </p>
            </div>
          }
          modalHeaderClass="h-0 p-1"
          modalFooter={
            <div className="container flex items-center justify-between">
              <ButtonComponent
                // onClick={handleDelete}
                ButtonClass="bg-red-600 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              >
                حذف مدیر
              </ButtonComponent>
              <ButtonComponent
                ButtonClass="bg-white text-red-600 mr-1"
                onClick={showModalDeleteAccountAdminHandler}
              >
                <span>لغو</span>
              </ButtonComponent>
            </div>
          }
          modalFooterClass="flex justify-center items-center"
          Open={showModalDeleteAccountAdmin}
          HandleOpen={showModalDeleteAccountAdminHandler}
        />
        <Modal
          modalHeader={<></>}
          modalClass="!min-w-[30%] p-0"
          modalBody={
            <div className="flex flex-col  justify-center">
              <p
                lang="fa"
                role="text"
                className="font-semibold text-xl sm-max:text-lg text-[#212121] mb-1"
              >
                مطمئنید می‌خواهید این درگاه پرداخت را غیرفعال کنید؟
              </p>
              <p
                lang="fa"
                role="text"
                className="text-blue-gray-600 text-sm font-normal"
              >
                این درگاه، مجددا قابل فعال سازی‌است
              </p>
            </div>
          }
          modalHeaderClass="h-0 p-1"
          modalFooter={
            <div className="container flex items-center justify-between">
              <ButtonComponent
                onClick={() => {
                  showModalDisablePaymentHandler();
                }}
                ButtonClass="bg-red-600 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              >
                غیرفعال کردن
              </ButtonComponent>
              <ButtonComponent
                ButtonClass="bg-white text-red-600 mr-1"
                onClick={showModalDisablePaymentHandler}
              >
                <span>لغو</span>
              </ButtonComponent>
            </div>
          }
          modalFooterClass="flex justify-center items-center"
          Open={showModalDisablePayment}
          HandleOpen={showModalDisablePaymentHandler}
        />
        <Modal
          modalClass="!min-w-[25%] sm-max:!min-w-[90%] h-[95vh] mb-2 p-4 overflow-y-scroll scroll-auto"
          modalHeader={"ویرایش حساب مدیریت"}
          modalHeaderClass="mt-2 -mb-5"
          modalBody={
            <div className="">
              <Input
                //   value={InputTitileGroup}
                //   onChange={(e) =>
                //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                //   }
                placeholder="نام و نام خانوادگی"
                className="mb-3 mt-3 h-10"
              ></Input>
              <Input
                //   value={InputTitileGroup}
                //   onChange={(e) =>
                //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                //   }
                placeholder="کد ملی"
                className="mb-3 h-10"
              ></Input>
              <Input
                //   value={InputTitileGroup}
                //   onChange={(e) =>
                //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                //   }
                placeholder="شماره تماس"
                className="mb-3 h-10"
              ></Input>
              <Select
                className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                size="large"
                // value={selectedItems === "" ? null : selectedItems as string}
                placeholder="سطح دسترسی"
                // defaultValue={selectedItems as string}
                // onChange={handleSelectedItemsChange}
                style={{}}
                options={[
                  "تایید شده در صف ارسال",
                  "ارسال شده در انتظار گزارش",
                  "پایان یافته",
                  "نیاز به ویرایش متن",
                  "منتظر تایید اپراتور",
                ].map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
              <Input placeholder="رمز عبور" className="mb-3 mt-4 h-10" />
              <Input placeholder="رمز عبور جدید" className="mb-3 h-10" />
              <Input placeholder="تکرار رمز عبور جدید" className="mb-3 h-10" />
              <ButtonComponent
                onClick={setShowModalEditAccountAdmin}
                ButtonClass={
                  "bg-[#0081E8] w-full mx-auto mt-2 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                }
              >
                ثبت تغییرات
              </ButtonComponent>
            </div>
          }
          modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
          modalFooter={
            <div className="w-full flex justify-center">
              <Button
                onClick={setShowModalEditAccountAdmin}
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
                  لغو عملیات و برگشت
                </span>
              </Button>
            </div>
          }
          Open={showModalEditAccountAdmin}
          HandleOpen={setShowModalEditAccountAdmin}
        />
      </section>
      <section className="w-full p-5">
        <div className="flex flex-col w-full gap-4">
          <HeaderWithButton
            ParentClass="!py-2"
            HeaderTitle={"اطلاعات مدیران"}
          />
          <div className="flex items-start justify-between gap-2">
            <Input placeholder="نام و نام خانوادگی" className="h-10" />
            <Input placeholder="کدملی" className="h-10" />
            <Select
                className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none h-10"
                size="large"
                // value={selectedItems === "" ? null : selectedItems as string}
                placeholder="سطح دسترسی"
                // defaultValue={selectedItems as string}
                // onChange={handleSelectedItemsChange}
                style={{}}
                options={[
                  "تایید شده در صف ارسال",
                  "ارسال شده در انتظار گزارش",
                  "پایان یافته",
                  "نیاز به ویرایش متن",
                  "منتظر تایید اپراتور",
                ].map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            <ButtonComponent
              onClick={setShowModalAddAccountAdmin}
              ButtonClass="bg-primary text-xs font-bold sm-max:p-3 h-10 flex flex-shrink-0 justify-center items-center"
            >
              <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
                <span className="text-xl p-0 mr-3 sm-max:mr-2">+</span>
                افزودن مدیر
              </div>
            </ButtonComponent>
          </div>
          <div className="mt-5">
            <CustomTable
              dataSource={dataAdmin}
              columns={columnsAdmin}
              theme="primary"
              rowKey={"key"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full mt-5">
          <HeaderWithButton
            ParentClass="!py-2"
            HeaderTitle={"تعرفه بندی پیامک"}
          />
          <FormAntd form={formAntd} component={false}>
            <CustomTable
              size="large"
              dataSource={dataSmsTariffs}
              columns={mergedColumns as CustomColumnType<SmsTariffs>[]}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
              theme="primary"
            />
          </FormAntd>
        </div>
      </section>
    </div>
  );
};

export default Setting;

// type
interface admins {
  key: React.Key;
  name: string;
  NID: string;
  sath: string;
}

interface SmsTariffs {
  key: React.Key;
  type: string;
  number: string;
  tarefe1: string;
  tarefe2: string;
  tarefe3: string;
  tarefe4: string;
  tarefe5: string;
}
