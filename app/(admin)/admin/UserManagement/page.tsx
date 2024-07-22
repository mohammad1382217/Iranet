import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import "../../../components/TableInputNote/TableInputNote.scss";
import { useSelector, selectUserManagementData } from "../../../../lib/redux";
import CustomTable, { type CustomColumnType } from "../../../components/Table";
import SkeletonButton from "antd/es/skeleton/Button";
const HeaderWithButton = React.lazy(
  () => import("../../../components/HeaderWithButton")
);
const Button = React.lazy(() => import("antd/es/button/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));

const UserManagement: React.FC = () => {
  const tableData = useSelector(selectUserManagementData);
  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام",
      dataIndex: "name",
      // align: "center",
      key: "name",
      searchProps: true,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      // align: "center",
      key: "family",
      searchProps: true,
    },
    {
      title: "کد ملی",
      dataIndex: "nationalCode",
      align: "center",
      key: "nationalCode",
      searchProps: true,
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      align: "center",
      key: "phoneNumber",
      searchProps: true,
    },
    {
      title: "احراز هویت",
      dataIndex: "Auth",
      key: "Auth",
      align: "center",
      filters: [
        {
          text: "در انتظار تایید",
          value: "در انتظار تایید",
        },
        {
          text: "تایید شده",
          value: "تایید شده",
        },
        {
          text: "عدم تایید",
          value: "عدم تایید",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.Auth.includes(value as string),
      render: (Auth: string) => (
        <span>
          {[Auth].map((tag) => {
            let color: string;
            if (tag === "در انتظار تایید") {
              color = "blue";
            } else if (tag === "تایید شده") {
              color = "green";
            } else if (tag === "عدم تایید") {
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
                <Suspense fallback={<>درحال بارگیری...</>}>
                  <Badge
                    className="ml-2 mt-1"
                    size="default"
                    color={color}
                  ></Badge>
                </Suspense>
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
        <Link to={`/admin/UserManagement/viewUser/${index}`}>
          <Suspense fallback={<SkeletonButton />}>
            <Button className="p-0" type="link">
              نمایش اطلاعات کاربر
            </Button>
          </Suspense>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
        <Suspense fallback={<>درحال بارگیری...</>}>
          <HeaderWithButton HeaderTitle={"لیست تمام کاربران"} />
        </Suspense>
        <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
          <CustomTable
            bordered
            size="large"
            dataSource={tableData}
            columns={columns}
            theme="primary"
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;

// Types
export interface DataType {
  key: React.Key;
  name: string;
  family: string;
  nationalCode: string;
  phoneNumber: string;
  Auth: string;
}
