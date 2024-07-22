import React from "react";
import "../../../components/TableInputNote/TableInputNote.scss";
import {
  useSelector,
  useDispatch,
  StoreManagementDataType,
  selectStoreManagementData,
  selectConfirmation,
  selectStatusStoreManagement,
} from "../../../../lib/redux";
import { fetchStoreManagement } from "../../../../lib/redux/slices/StoreManagementSlice/fetchStoreManagement";
import CustomTable, { type CustomColumnType } from "../../../components/Table";
import { Link } from "react-router-dom";
import { getCookie } from "../../../api/apiConfig";

const Badge = React.lazy(() => import("antd/es/badge/index"));
const Spin = React.lazy(() => import("antd/es/spin/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const HeaderWithButton = React.lazy(() => import("../../../components/HeaderWithButton"));

const StoreManagement: React.FC = () => {
  const dispatch = useDispatch();
  const StoreManagementData = useSelector(selectStoreManagementData);
  const confirmation = useSelector(selectConfirmation);
  const status = useSelector(selectStatusStoreManagement);

  // get data
  React.useEffect(() => {
    // Make the request when the component mounts
    if (getCookie("accessToken")) {
      const fetchGroups = dispatch(
        fetchStoreManagement({ group_id: "group_id" })
      );

      console.log(status, confirmation);
      return () => {
        fetchGroups.abort("Request canceled");
      };
    }
  }, [getCookie("accessToken")]);
  console.log(status);

  // const handelConfirm = async () => {
  //   if (accessToken) {
  //     dispatch(
  //       ConfrimStoreManagement({
  //         group_id: +groupIdAction,
  //         accessToken,
  //         is_confirm: confirmation,
  //       })
  //     );
  //     dispatch(StoreManagementSlice.actions.setShowModalStoreManagement(false));
  //   }
  // };

  // const ModalHandlerMessage = (record: StoreManagementData) => {
  //   dispatch(StoreManagementSlice.actions.setConfirmation(record.is_confirm));
  //   dispatch(StoreManagementSlice.actions.setText(record.default_text_message));
  //   dispatch(StoreManagementSlice.actions.setGroupName(record.group_name));
  //   dispatch(StoreManagementSlice.actions.setGroupIdAction(record.group_id));
  // };
  const columns: CustomColumnType<StoreManagementDataType>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "store_name",
      key: "store_name",
      searchProps: true,
    },
    {
      title: "نام مالک",
      dataIndex: "user_name",
      align: "center",
      searchProps: true,
    },
    {
      title: "صنف فروشگاه",
      dataIndex: "guild",
      key: "guild",
      align: "center",
      searchProps: true,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "right",
      searchProps: true,
      // render: (text: string) => (
      //   <div className="flex justify-start ">
      //     {text.length <= 20 ? text : <span>{text.slice(0, 30)}...</span>}
      //   </div>
      // ),
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      key: "condition",
      align: "center",
      filters: [
        {
          text: "در انتظار تایید",
          value: "در انتظار تایید",
        },
        {
          text: "فعال",
          value:"فعال",
        },
        {
          text: "غیر فعال",
          value: "غیر فعال",
        },
      ],
      onFilter: (value: React.Key | boolean, record: StoreManagementDataType) =>
        record.condition.includes(value as string),
      render: (Auth: string) => (
        <span>
          {[Auth].map((tag) => {
            let color: string;
            if (tag === "در انتظار تایید") {
              color = "blue";
            } else if (tag === "فعال") {
              color = "green";
            } else if (tag === "غیر فعال") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row-reverse justify-center items-baseline"
              >
                {tag}
                <Badge
                  className="ml-1 mt-1"
                  size="default"
                  color={color}
                ></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
    {
      title: "عملیات ",
      align: "center",
      dataIndex: "key",
      key: "key",
      render: (index: number) => (
        <Link to={`/admin/StoreManagement/viewStore/${index}`}>
          <Button className="p-0" type="link">
            نمایش اطلاعات فروشگاه
          </Button>
        </Link>
      ),
    },
  ];

  // const getRowClassName = (record: StoreManagementDataType) =>
  //   record.is_confirm === "0" ? "red-row" : "";

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton HeaderTitle={"لیست تمام فروشگاه ها"} />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <Spin spinning={status === "loading" ? true : false}>
          <CustomTable
            // rowClassName={getRowClassName}
            columns={columns}
            rowKey="group_id"
            dataSource={StoreManagementData}
            theme="primary"
          />
        </Spin>
      </div>
      {/* <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
        modalHeader={`متن پیامک اعضای گروه ${groupName}`}
        modalHeaderClass="mt-3 mb-0 pb-0"
        modalBody={
          <div>
            <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal px-2 my-3 -mt-1">
              وضعیت:
              {confirmation === "0" ? (
                <Tag color="#E53935" className="mr-3 rounded-lg ">
                  تایید نشده
                </Tag>
              ) : (
                <Tag color="#43A047" className="mr-3 rounded-lg ">
                  تایید شده
                </Tag>
              )}
            </p>
            <Textarea
              TextAreaClass="p-3 mt-1"
              Value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementSlice.actions.setGroupName(groupName));
              }}
              Placeholder="متن پیامک اعضای گروه"
            />
            <p lang="fa" role="text" className="text-sm mt-1">حداکثر 1000 کاراکتر</p>
            <div className="flex flex-row ">
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3">
                تعداد کاراکتر ها:
                <Tag color="#2196F3" className="mr-3 rounded-lg ">
                  {text.length}
                </Tag>
              </p>
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3 mr-3">
                تعداد پیامک:
                <Tag color="#2196F3" className="mr-3 rounded-lg ">
                  3
                </Tag>
              </p>
            </div>
          </div>
        }
        modalFooterClass="flex justify-between items-center -mt-3"
        modalFooter={
          <div className="w-full flex flex-col justify-center">
            <ButtonComponent
              ButtonClass={` ${
                confirmation === "0" ? "bg-[#43A047]" : "bg-[#E53935]"
              } w-full text-xs font-bold h-11 flex items-center justify-center`}
              onClick={() => {
                dispatch(
                  StoreManagementSlice.actions.setShowModalStoreManagement(false)
                );
                handelConfirm();
                // دیفالت کردن یادم باشه
              }}
            >
              {confirmation === "0" ? (
                <p lang="fa" role="text" className="flex flex-row justify-center items-center p-2">
                  تایید
                  <FaCheck className="mr-2" />
                </p>
              ) : (
                <p lang="fa" role="text" className="flex flex-row justify-center items-center p-2">
                  عدم تایید متن
                  <HiXMark className="mr-2" />
                </p>
              )}
            </ButtonComponent>
            
            <Button
              onClick={() => {
                dispatch(
                  StoreManagementSlice.actions.setShowModalStoreManagement(false)
                );
              }}
              type="link"
              className="flex items-center justify-center mx-auto"
              icon={
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
              }
            >
              <span className="text-sm text-textColor font-medium">برگشت </span>
            </Button>
          </div>
        }
        Open={ShowModalStoreManagement.CardUser}
        HandleOpen={() => {
          dispatch(StoreManagementSlice.actions.setShowModalStoreManagement(false));
        }}
      /> */}
    </div>
  );
};

export default StoreManagement;
