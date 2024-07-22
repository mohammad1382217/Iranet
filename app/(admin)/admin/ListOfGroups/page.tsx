import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import "../../../components/TableInputNote/TableInputNote.scss";
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import { ListofGroupsAdminDataType, selectListofGroupsAdminData } from "../../../../lib/redux";
import { useSelector } from "react-redux";
const Popover = React.lazy(() => import("antd/es/popover/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Space = React.lazy(() => import("antd/es/space/index"));
const Button = React.lazy(() => import("antd/es/button/index"));

const ListOfGroups: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [loading, setLoading] = React.useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  }; 
  const ListofGruopDataTable = useSelector(selectListofGroupsAdminData)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: ListofGroupsAdminDataType) => ({
      disabled: record.disabledUser,
    }),
  };

  const hasSelected = selectedRowKeys.length > 0;

  const getRowClassName = (record: ListofGroupsAdminDataType) =>
    record.disabledUser ? "red-row" : "";

  const columns: CustomColumnType<ListofGroupsAdminDataType>[] = [
    {
      title: "عنوان گروه",
      dataIndex: "group_name",
      key: "group_name",
      searchProps: true,
      render: (_: string, record: ListofGroupsAdminDataType) => (
        <p
          lang="fa"
          role="text"
          className={`${record.disabledUser === false ? "" : "text-[#E53935]"}`}
        >
          {record.group_name}
        </p>
      ),
    },
    {
      title: "نام فروشگاه",
      dataIndex: "store_name",
      key: "store_name",
      searchProps: true,
      render: (_: string, record: ListofGroupsAdminDataType) => (
        <p
          lang="fa"
          role="text"
          className={`${record.disabledUser === false ? "" : "text-[#E53935]"}`}
        >
          {record.store_name}
        </p>
      ),
    },
    {
      title: "متن پیام گروه",
      dataIndex: "text_message_Group",
      key: "text_message_Group",
      ellipsis: true,

      searchProps: true,
      render: (text: string) => (
        <Popover className="" content={<div className="">{text}</div>}>
          <div className="flex justify-start">
            <span>{text.slice(0, 60)}</span>
            <span>...</span>
          </div>
        </Popover>
      ),
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
      onFilter: (value: React.Key | boolean, record: ListofGroupsAdminDataType) =>
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
      title: "تعداد مخاطبین",
      dataIndex: "numberUsers",
      key: "numberUsers",
      align: "center",
      render: (tags: string) => (
        <Tag
          key={tags}
          color="#1890ff"
          className="font-normal mx-auto rounded-lg text-xs text-[#FFFFFF]"
        >
          {tags}
        </Tag>
      ),
      sorter: (a: ListofGroupsAdminDataType, b: ListofGroupsAdminDataType) => a.numberUsers - b.numberUsers,
    },
    {
      title: "",
      dataIndex: "key",
      align: "center",
      render: (_: string, record: ListofGroupsAdminDataType) => (
        <Space>
          <Link to={`/admin/ListOfGroups/viewGroup/${record.key}`}>
            <Button className="p-0" type="link">
              مشاهده
            </Button>
          </Link>
          <Button
            type="link"
            onClick={() => {}}
            className={`p-0 ${
              record.disabledUser === true
                ? "text-[#E53935]"
                : "text-[#43A047]"
            }`}
          >
            {record.disabledUser === false ? "تایید" : "عدم تایید"}
          </Button>
          <Button
            type="link"
            onClick={() => {}}
            className={`p-0 ${
              record.disabledUser === false
                ? "text-[#E53935]"
                : "text-[#43A047]"
            }`}
          >
            {record.disabledUser === false ? "حذف" : "بازگردانی"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton HeaderTitle={"لیست تمام گروه های فروشگاه"} />
      {/* <div className="w-full flex justify-end mt-3">
        <Button
          className="!bg-white !border-[#1D6F42] !text-[#000000D9]"
          type="default"
          icon={<DownloadOutlined />}
        >
          ذخیرۀ اطلاعات در فایل اکسل
        </Button>
        <Button
          className="!bg-[#FF4D4F] !border-[#FF4D4F] rounded-none mr-3 !text-white"
          type="default"
          icon={<FaRegTrashAlt  />}
        >
          حذف گروه ها{" "}
        </Button>
      </div> */}
      <div
        className={`${
          hasSelected ? `mt-3` : `mt-10`
        }  mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer`}
      >
        {hasSelected ? (
          <div className="flex float-left my-4">
            <Button
              icon={<DownloadOutlined />}
              onClick={start}
              loading={loading}
            >
              ذخیرۀ شماره ها در سند متنی
            </Button>
            <Button
              className="mr-3 flex  justify-center items-center !text-[#FFFFFF] hover:bg-[#FF4D4F] bg-[#FF4D4F]"
              danger
              icon={<FaRegTrashAlt />}
              onClick={start}
              loading={loading}
            >
              حذف گروه ها
            </Button>
          </div>
        ) : (
          <div></div>
        )}

        <CustomTable
          rowSelection={rowSelection}
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={ListofGruopDataTable}
          theme="primary"
        />
      </div>
    </div>
  );
};

export default ListOfGroups;
