import React from "react";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import "../../../components/TableInputNote/TableInputNote.scss";
import { editGroup } from "../../../../lib/redux/slices/groupsSlice/editGroup";
import { fetchGroup } from "../../../../lib/redux/slices/groupsSlice/fetchGroups";
import { deleteGroup } from "../../../../lib/redux/slices/groupsSlice/deleteGroup";
import { IoAddOutline } from "react-icons/io5";
import { Parag } from "../../../components/tools";
import { maxFileSize } from "../Tickets/AddTickets/page";
import {
  groupsSlice,
  useSelector,
  useDispatch,
  selectShowModalsGroups,
  selectGroups,
  groups,
  selectActionId,
  selectFileGruop,
  selectDefaultGroupId,
  selectStatusGroup,
  selectGroupcheckbox,
  selectGroupfieldcheckbox,
} from "../../../../lib/redux";
import {
  HiOutlineArrowCircleRight,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { patchField } from "../../../../lib/redux/slices/groupsSlice/patchField";
import message from "antd/es/message/index";


const Dragger = React.lazy(() => import("antd/es/upload/Dragger"));
const Modal = React.lazy(() => import("../../../components/Modal"));
const Typography = React.lazy(() => import("antd/es/typography/index"));
const AddGroup = React.lazy(() => import("../../../components/AddGroup"));
const ViewGroup = React.lazy(() => import("../../../components/ViewGroup"));
const HeaderWithButton = React.lazy(() => import("../../../components/HeaderWithButton"));
const Checkbox = React.lazy(() => import("@material-tailwind/react/components/Checkbox/index"));
const checkbox = React.lazy(() => import("@material-tailwind/react/components/Checkbox/index"));
const List = React.lazy(() => import("@material-tailwind/react/components/List/index"));
const ListItem = React.lazy(() => import("@material-tailwind/react/components/List/ListItem"));
const ListItemPrefix = React.lazy(() => import("@material-tailwind/react/components/List/ListItemPrefix"));
const AddContactsSingleFirstdata = React.lazy(() => import("../../../components/AddContant/addContactsSingleFirstdata"));
const AddContactsSingleFulldata = React.lazy(() => import("../../../components/AddContant/addContactsSingleFulldata"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Spin = React.lazy(() => import("antd/es/spin/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Space = React.lazy(() => import("antd/es/space/index"));
const Input = React.lazy(() => import("antd/es/input/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModalsGroups);
  const actionId = useSelector(selectActionId);
  const tableData = useSelector(selectGroups);
  const status = useSelector(selectStatusGroup);
  const showModalHandler = (name: string) =>
    dispatch(groupsSlice.actions.setShowModal(name));

  const Groupcheckbox = useSelector(selectGroupcheckbox);
  const Groupfieldcheckbox = useSelector(selectGroupfieldcheckbox);

  const File = useSelector(selectFileGruop);
  const defaultGroupId = useSelector(selectDefaultGroupId);

  React.useEffect(() => {
    const fetchGroups = dispatch(fetchGroup({ group_id: "group_id" }));
    return () => {
      fetchGroups.abort("Request canceled");
    };
  }, []);

  const deleteHandler = async () => {
    dispatch(deleteGroup({ group_id: actionId }));
    showModalHandler("deleteGruop");
  };
  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxes = Groupcheckbox.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    dispatch(groupsSlice.actions.setGroupcheckbox(updatedCheckboxes));
  };
  const handlefieldCheckboxChange = (index: number) => {
    const updatedCheckboxes = Groupfieldcheckbox.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    dispatch(groupsSlice.actions.setGroupfieldcheckbox(updatedCheckboxes));
  };
  const handleChangeinputfieldCheckbox = (e: string, index: number) => {
    const updatedCheckboxes = Groupfieldcheckbox.map((item, i) =>
      i === index ? { ...item, value: e } : item
    );
    dispatch(groupsSlice.actions.setGroupfieldcheckbox(updatedCheckboxes));
  };

  const handleDisable = async (id: number) => {
    dispatch(groupsSlice.actions.setActionId(id));

    const gruopIndex = tableData.findIndex((group) => +group.id === +id);
    console.log(gruopIndex);
    if (gruopIndex === -1) {
      console.error("Group not found in tableData");
      return;
    }

    const updatedIsActive =
      tableData[gruopIndex].active === false ? true : false;
    const updatedData: groups = {
      ...tableData[gruopIndex],
      active: updatedIsActive,
    };

    dispatch(editGroup({ group_id: id, updatedData }));
  };
  const [messageErorr, setMessageError] = React.useState("");
  const handleFiledRequest = async () => {
    const gruopIndex = tableData.findIndex((group) => group.id === actionId);
    if (gruopIndex === -1) {
      console.error("Group not found in tableData");
      return;
    }
    let updatedData = {
      name_active: Groupcheckbox[0].checked,
      last_name_active: Groupcheckbox[1].checked,
      full_name_active: Groupcheckbox[2].checked,
      birth_date_active: Groupcheckbox[3].checked,
      age: Groupcheckbox[4].checked,
      empty_field1_name: Groupfieldcheckbox[0].value,
      empty_field1_active: Groupfieldcheckbox[0].checked,
      empty_field2_name: Groupfieldcheckbox[1].value,
      empty_field2_active: Groupfieldcheckbox[1].checked,
      empty_field3_name: Groupfieldcheckbox[2].value,
      empty_field3_active: Groupfieldcheckbox[2].checked,
      empty_field4_name: Groupfieldcheckbox[3].value,
      empty_field4_active: Groupfieldcheckbox[3].checked,
      empty_field5_name: Groupfieldcheckbox[4].value,
      empty_field5_active: Groupfieldcheckbox[4].checked,
    };
    if (
      !Groupfieldcheckbox[0].value !== Groupfieldcheckbox[0].checked &&
      !Groupfieldcheckbox[1].value !== Groupfieldcheckbox[1].checked &&
      !Groupfieldcheckbox[2].value !== Groupfieldcheckbox[2].checked &&
      !Groupfieldcheckbox[3].value !== Groupfieldcheckbox[3].checked &&
      !Groupfieldcheckbox[4].value !== Groupfieldcheckbox[4].checked
    ) {
      setMessageError("");
      dispatch(patchField({ group_id: actionId, updatedData }));
      const fetchGroups = dispatch(
        fetchGroup({ group_id: "group_id" })
      );
      showModalHandler("Groupfield");
      showModalHandler("deleteField");
      return () => {
        fetchGroups.abort("Request canceled");
      };
    } else {
      setMessageError("لطفا فیلد های انتخاب شده را پر کنید");
    }
    console.log(updatedData);
  };

  const columns_anniversary: CustomColumnType<groups>[] = [
    {
      title: "عنوان گروه",
      dataIndex: "title",
      key: "title",
      searchProps: true,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "2%",
      align: "center",
      render: (index: number, record: groups) => (
        <IoAddOutline
          className="mx-auto"
          onClick={() => {
            showModalHandler("addContactsMethod");
            dispatch(groupsSlice.actions.setActionId(record.id));
          }}
        />
      ),
    },
    {
      title: "تعداد مخاطبین",
      dataIndex: "member_count",
      key: "member_count",
      align: "center",
      width: "150px",
      render: (tags: string) => (
        <Tag
          key={tags}
          color="#1890FF"
          className="font-normal mx-auto rounded-lg text-xs text-[#FFFFFF]"
        >
          {tags}
        </Tag>
      ),
      sorter: (a: groups, b: groups) => a.member_count - b.member_count,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "150px",
      filters: [
        {
          text: "تایید شده",
          value: "A",
        },
        {
          text: "تایید نشده",
          value: "D",
        },
        {
          text: "در انتظار تایید",
          value: "P",
        },
      ],
      onFilter: (value: React.Key | boolean, record: groups) =>
        record.status === value,
      render: (status: string) => (
        <span>
          {[status].map((tag) => {
            let name: string;
            let color: string;
            if (tag === "P") {
              color = "blue";
              name = "در انتظار تایید";
            } else if (tag === "D") {
              color = "red";
              name = "تایید نشده";
            } else if (tag === "A") {
              color = "green";
              name = "تایید شده";
            } else {
              color = "";
              name = "";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row-reverse justify-center items-baseline"
              >
                {name}
                <Badge className="ml-1" size="default" color={color}></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "group_id",
      key: "group_id",
      align: "center",
      width: "250px",
      render: (index: number, record: groups) => (
        <Space>
          {record.id === defaultGroupId ? (
            <Button
              className="p-0"
              type="link"
              onClick={() => {
                dispatch(groupsSlice.actions.setActionId(record.id));
                showModalHandler("editGroup");
              }}
            >
              مشاهده و ویرایش متن پیامک{" "}
            </Button>
          ) : record.status === "P" ? null : (
            <>
              <Button
                className="p-0"
                type="link"
                onClick={() => {
                  dispatch(groupsSlice.actions.setActionId(record.id));
                  showModalHandler("editGroup");
                }}
              >
                مشاهده و ویرایش
              </Button>

              <Button
                type="link"
                onClick={() => {
                  handleDisable(record.id);
                }}
                className={`p-0 ${
                  record.active === true ? "text-[#FA8C16]" : "text-[#43A047]"
                }`}
              >
                {record.active === true ? "غیر فعال کردن" : "فعال کردن"}
              </Button>

              <Button
                className="text-[#E53935] p-0"
                type="link"
                onClick={() => {
                  showModalHandler("deleteGroup");
                  dispatch(groupsSlice.actions.setActionId(record.id));
                }}
              >
                حذف
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center content-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton
        HeaderTitle={"لیست تمام گروه ها"}
        Button={
          <ButtonComponent
            onClick={() => showModalHandler("addGroup")}
            ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          >
            <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
              ایجاد گروه جدید<div className="text-xl p-0  ml-3">+</div>
            </div>
          </ButtonComponent>
        }
      />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <Spin spinning={status === "loading" ? true : false}>
          <CustomTable
            size="large"
            dataSource={tableData}
            columns={columns_anniversary}
            rowKey="id"
            theme={"secondary"}
          />
        </Spin>
      </div>
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[33%]"
        modalHeaderClass="py-1"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-xl text-2xl text-[#212121]"
            >
              از حذف این گروه اطمینان دارید؟{" "}
            </p>
            <p
              lang="fa"
              role="text"
              className="font-normal mt-2 text-base text-blue-gray-600"
            >
              در صورت نیاز به برگرداندن گروه، با پشتیبانی در ارتباط باشید{" "}
            </p>
          </>
        }
        modalBodyClass=""
        modalFooter={
          <>
            <ButtonComponent
              onClick={deleteHandler}
              children="حذف"
              ButtonClass="bg-[#B71C1C] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            />
          </>
        }
        modalFooterClass="flex justify-center items-center "
        Open={showModal.deleteGroup}
        HandleOpen={() => showModalHandler("deleteGroup")}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[3rem] m-auto"
        modalHeaderClass="p-0 m-0 h-0"
        modalBody={<AddGroup />}
        modalBodyClass=" p-0 m-0"
        modalFooterClass="p-0 m-0 h-0"
        Open={showModal.addGroup}
        HandleOpen={() => showModalHandler("addGroup")}
        modalFooter={<></>}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[3rem] m-auto"
        modalHeaderClass="p-0 m-0 h-0"
        modalBody={<ViewGroup />}
        modalBodyClass=" p-0 m-0"
        modalFooterClass="p-0 m-0 h-0"
        Open={showModal.editGroup}
        HandleOpen={() => showModalHandler("editGroup")}
        modalFooter={<></>}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[5rem] m-auto"
        modalHeaderClass="h-0 p-0 m-0"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-base text-2xl mb-4 text-[#212121]"
            >
              گروه جدید ایجاد شد{" "}
            </p>
            <p
              lang="fa"
              role="text"
              className="font-normal text-base text-blue-gray-600"
            >
              در صورت نیاز می‌توانید برای گروه، فیلد های مورد نظر خود را انتخاب
              یا ایجاد کنید.
            </p>
          </>
        }
        modalBodyClass=""
        modalFooter={
          <>
            <div className="flex flex-row-reverse justify-between w-full">
              <ButtonComponent
                onClick={() => {
                  showModalHandler("successfulladdGroup");
                  const fetchGroups = dispatch(
                    fetchGroup({ group_id: "group_id" })
                  );
                  fetchGroups;
                }}
                children="تایید"
                ButtonClass="bg-[#2DCEA2]  text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
              <ButtonComponent
                onClick={() => {
                  const fetchGroups = dispatch(
                    fetchGroup({ group_id: "group_id" })
                  );
                  fetchGroups;
                  showModalHandler("successfulladdGroup");
                  showModalHandler("Groupfield");
                  dispatch(groupsSlice.actions.setGroupcheckboxes());
                }}
                children="ویرایش فیلد ها"
                ButtonClass="bg-[#FFFFFF]  ml-5 w-full border-2 border-[#2DCEA2] text-[#263238] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
            </div>
          </>
        }
        modalFooterClass="flex justify-center items-center "
        Open={showModal.successfulladdGroup}
        HandleOpen={() => showModalHandler("successfulladdGroup")}
      />
      <Modal
        disabledDefault={true}
        modalHeader={<></>}
        modalClass="overscroll-auto md-max:min-w-[100%] md-max:!min-h-[100%] md-min:min-w-[98%] xl-min:!min-w-[80%] md-max:!rounded-none m-auto"
        modalHeaderClass="p-0 m-0 h-0"
        modalBodyClass="xl-max:overflow-y-scroll overflow-y-scroll md-max:!h-[100vh] md-min:!h-[90vh]"
        modalBody={
          <div className="">
            <p
              lang="fa"
              role="text"
              className="font-semibold px-8 sm-max:text-base text-2xl mb-2 text-[#212121]"
            >
              فیلد های گروه
            </p>
            <p
              lang="fa"
              role="text"
              className="font-normal px-8 text-base text-blue-gray-600"
            >
              فیلد های مورد نظر برای گروه را انتخاب کنید. در صورت نیاز می‌توانید
              از قسمت پایین، عناوین فیلد های اختصاصی خود را وارد کنید.{" "}
            </p>
            <div className="flex gap-10 mt-5 justify-center">
              <List className="grid grid-flow-row w-auto sm-max:gap-x-6 md-max:gap-x-16 lg-min:gap-x-20 gap-x-24 items-center justify-center grid-cols-5 grid-rows-6 md-max:grid-cols-3 md-max:grid-rows-[10] gap-4 ">
                {Groupcheckbox.map((e, index) => (
                  <ListItem
                    className="p-0 w-32 xl-min:w-36"
                    key={index}
                    disabled={e.disabled}
                  >
                    <label
                      htmlFor={e.name}
                      className="flex w-full cursor-pointer items-center justify-center p-4 px-2 py-2"
                    >
                      <ListItemPrefix className="ml-2 mr-0 p-1">
                        <Checkbox
                          id={e.name}
                          ripple={false}
                          checked={e.checked}
                          onChange={() => {
                            console.log();
                            handleCheckboxChange(index);
                          }}
                          color="blue"
                          className="hover:before:opacity-0 rounded-full w-4 h-4"
                          containerProps={{
                            className: "p-0",
                          }}
                          crossOrigin={checkbox}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium p-1">
                        {e.name}
                      </Typography>
                    </label>
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="flex w-full gap-20 mt-5 justify-center">
              <List className="grid grid-flow-row w-auto gap-7 items-center justify-center grid-cols-4 grid-rows-4 md-max:grid-cols-2 md-max:grid-rows-[8] ">
                {Groupfieldcheckbox.map((e, index) => (
                  <ListItem
                    className="p-0 hover:bg-transparent"
                    key={index}
                    ripple={false}
                  >
                    <label
                      htmlFor={e.name}
                      className="flex w-full cursor-pointer items-center justify-center p-4 px-2 py-2"
                    >
                      <ListItemPrefix className="ml-2 mr-0 p-1">
                        <Checkbox
                          id={e.name}
                          ripple={false}
                          checked={e.checked}
                          onChange={() => {
                            console.log();
                            // setGroupcheckbox([
                            //   ...Groupcheckbox,
                            //   { name: e.name, checked: !e.checked },
                            // ]);
                            handlefieldCheckboxChange(index);
                          }}
                          color="blue"
                          className="hover:before:opacity-0 rounded-full w-4 h-4"
                          containerProps={{
                            className: "p-0",
                          }}
                          crossOrigin={checkbox}
                        />
                      </ListItemPrefix>
                      <Input
                        name={e.name}
                        value={e.value}
                        onChange={(e) => {
                          handleChangeinputfieldCheckbox(e.target.value, index);
                        }}
                        className={
                          "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
                        }
                        placeholder={"عنوان فیلد"}
                        disabled={false}
                      />
                    </label>
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <ButtonComponent
                onClick={handleFiledRequest}
                children="ثبت تغییرات"
                ButtonClass="bg-[#2DCEA2] w-5/12 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
              {messageErorr ? (
                <p className="text-red-500 text-sm mt-1">{messageErorr}</p>
              ) : null}
              <ButtonComponent
                onClick={() => showModalHandler("Groupfield")}
                ButtonClass="flex items-center  !bg-transparent justify-center mt-1 mx-auto bg-white !shadow-none hover:shadow-none"
              >
                <div className="flex items-center gap-2 text-sm text-textColor font-medium">
                  <HiOutlineArrowCircleRight
                    className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                  />
                  <div>
                    <span className="text-textColor">برگشت</span>
                  </div>
                </div>
              </ButtonComponent>
            </div>
          </div>
        }
        modalFooterClass="p-0 m-0 !h-0"
        Open={showModal.Groupfield}
        HandleOpen={() => showModalHandler("Groupfield")}
        modalFooter={<></>}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[33%]"
        modalHeaderClass="py-1"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-base text-xl text-[#212121]"
            >
              از ثبت تغییرات اطمینان دارید؟{" "}
            </p>
            <p
              lang="fa"
              role="text"
              className="font-normal text-base text-blue-gray-600"
            >
              در صورتی که فیلد هایی که پیش از این، برای آنها اطلاعات ثبت شده بود
              را حذف کنید، تمام اطلاعات قبلی این فیلد ها هم از بین میرود.
            </p>
          </>
        }
        modalBodyClass=""
        modalFooter={
          <>
            <ButtonComponent
              onClick={deleteHandler}
              children="حذف"
              ButtonClass="bg-[#B71C1C]  text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            />
          </>
        }
        modalFooterClass="flex justify-center items-center "
        Open={showModal.deleteField}
        HandleOpen={() => showModalHandler("deleteField")}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[43%] lg-max:!min-w-[55%] "
        modalHeaderClass="h-0 p-0 m-0"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-base text-center text-2xl mt-1 mb-5 text-[#212121]"
            >
              انتخاب روش افزودن مخاطب
            </p>
            <div className="container flex items-center justify-center shrink-0 flex-wrap gap-4">
              <div
                onClick={() => {
                  showModalHandler("addContactsMethod");
                  showModalHandler("addContactsSingleFirstdata");
                }}
                className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))]  h-36 md-max:h-28 rounded-lg border border-solid border-amber-300 bg-amber-50 cursor-pointer"
              >
                <Parag
                  Paragraph={"تکی"}
                  Pclass={
                    "text-2xl text-center font-bold text-amber-700 md-max:text-lg"
                  }
                />
              </div>
              <div
                onClick={() => {
                  showModalHandler("addContactsMethod");
                  showModalHandler("addContactsGroup");
                }}
                className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-36 md-max:h-28 rounded-lg border border-solid border-orange-300 bg-orange-50 cursor-pointer"
              >
                <Parag
                  Paragraph={"گروهی (آپلود فایل)"}
                  Pclass={
                    "text-2xl text-center font-bold text-orange-700 md-max:text-lg"
                  }
                />
              </div>
            </div>
          </>
        }
        modalBodyClass=""
        modalFooterClass="p-0 m-0 h-0"
        Open={showModal.addContactsMethod}
        HandleOpen={() => showModalHandler("addContactsMethod")}
        modalFooter={<></>}
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
              showModalHandler("");
              message.success(`فایل ${file.name} با موفقیت بارگذاری شد.`);
              showModalHandler("successfullContactsGroup");
              showModalHandler("addContactsGroup");
              return false;
            }}
            // onChange={(info) => {
            // const fileList = [...info.fileList];
            // if (national_card.length !== 0) {
            //   dispatch(loginSlice.actions.setNationalCard(fileList));
            // }
            // }}
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
                فایل با نسبت ابعاد 5:1 فرمت gif، jpg، png یا webp و حجم نهایتاً
                3مگابایت
              </p>
            </div>
          </Dragger>
        }
        modalFooter={<></>}
        modalFooterClass="hidden"
        Open={showModal.addContactsGroup}
        HandleOpen={() => showModalHandler("addContactsGroup")}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[43%]"
        modalHeaderClass="h-0 p-0 m-0"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-base text-xl text-[#212121]"
            >
              321 شماره دریافت شد
            </p>
            <p
              lang="fa"
              role="text"
              className="font-normal mt-2 text-base text-blue-gray-600"
            >
              درصورت تایید، تعداد 321 شماره به این گروه افزوده خواهد شد
            </p>
          </>
        }
        modalBodyClass=""
        modalFooter={
          <div className="flex flex-row-reverse justify-between w-full items-center">
            <ButtonComponent
              onClick={() => {
                showModalHandler("successfullContactsGroup");
              }}
              children="تایید"
              ButtonClass="bg-[#2DCEA2] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            />
            <div onClick={() => showModalHandler("successfullContactsGroup")}>
              <span className="text-[#E53935]">لغو</span>
            </div>
          </div>
        }
        modalFooterClass="flex justify-center items-center "
        Open={showModal.successfullContactsGroup}
        HandleOpen={() => showModalHandler("successfullContactsGroup")}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[3rem] m-auto w-auto"
        modalHeaderClass="p-0 m-0 h-0"
        modalBody={<AddContactsSingleFirstdata />}
        modalBodyClass=" p-0 m-0 w-full"
        modalFooterClass="p-0 m-0 h-0"
        Open={showModal.addContactsSingleFirstdata}
        HandleOpen={() => showModalHandler("addContactsSingleFirstdata")}
        modalFooter={<></>}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[3rem] m-auto overflow-y-auto overflow-x-auto h-auto"
        modalHeaderClass="p-0 m-0 h-0"
        modalBody={<AddContactsSingleFulldata />}
        modalBodyClass=" p-0 m-0"
        modalFooterClass="p-0 m-0 h-0"
        Open={showModal.addContactsSingleFulldata}
        HandleOpen={() => showModalHandler("addContactsSingleFulldata")}
        modalFooter={<></>}
      />
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[33%]"
        modalHeaderClass="py-1"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-xl text-2xl text-[#212121]"
            >
              اطلاعات با موفقیت ثبت شد{" "}
            </p>
            <p
              lang="fa"
              role="text"
              className="font-normal mt-2 text-base text-blue-gray-600"
            >
              مخاطب به دفترچۀ مورد نظر اضافه گردید{" "}
            </p>
          </>
        }
        modalBodyClass=""
        modalFooter={
          <>
            <ButtonComponent
              onClick={() => showModalHandler("successfullContactsSingle")}
              children="تایید"
              ButtonClass="bg-[#2DCEA2] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            />
          </>
        }
        modalFooterClass="flex justify-center items-center "
        Open={showModal.successfullContactsSingle}
        HandleOpen={() => showModalHandler("successfullContactsSingle")}
      />
    </div>
  );
};

export default Groups;
