import React from "react";
import { Link, useParams } from "react-router-dom";
import ButtonComponent from "../../../../../components/Button";
import "../../../../../components/TableInputNote/TableInputNote.scss";
import CustomTable, { CustomColumnType } from "../../../../../components/Table";
import { Parag } from "../../../../../components/tools";
import TextArea from "antd/lib/input/TextArea";
const Tag = React.lazy(() => import("antd/es/tag/index"));

const data: DataType[] = [];
for (let i = 0; i < 6; i++) {
  data.push({
    key: i,
    name: `نام شماره${i}`,
    family: `نام خانوادگی شماره  ${i}`,
    birthDate: `13${i}6/12/${i + 10}`,
    job: "بقالی",
    phoneNumber: `0939322898${i}`,
  });
}

const ViewGroup: React.FC = () => {
  const { idGroup } = useParams();

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      searchProps: true,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      key: "family",
      searchProps: true,
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthDate",
      align: "center",
      sorter: (a, b) => a.birthDate.localeCompare(b.birthDate),
    },
    {
      title: "شغل",
      dataIndex: "job",
      searchProps: true,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      align: "center",
      searchProps: true,
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full gap-10 w-full">
      <div className="flex items-center justify-between container bg-gray-50 p-3 rounded-lg">
          <div className="flex w-full justify-between items-center my-1 gap-4 text-lg font-semibold xs-max:text-sm text-textColor xs-max:flex-col 3xl-max:flex-row">
            <p lang="fa" role="text" className="w-max text-2xl font-semibold text-[#151515]">
            عنوان گروه شماره {idGroup}

            <span className="text-[#94A3B8] text-xs mr-4 font-semibold">
            تاریخ و ساعت ثبت گروه : {' '}
              <span className="font-normal">
               1400/00/00 - 12:21’ {` `}
              </span>
            </span>
            </p>
            
            <div className="flex  gap-3">
            <ButtonComponent ButtonClass="bg-white text-textColor text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center border border-solid border-[#0081E8] gap-2">
              <Parag Paragraph={"مشاهده فیلد های گروه"} Pclass={""} />
            </ButtonComponent>
            <Link to={`/admin/ListOfGroups`}>
              <ButtonComponent
                children="برگشت به لیست گروه ها"
                ButtonClass="bg-primary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
            </Link>
            </div>
          </div>
        </div>
      <div className="w-full">
        <div className="flex items-center justify-between container bg-gray-50 p-3 rounded-lg mb-5">
          <div className="flex my-1 gap-4 text-lg font-semibold xs-max:text-sm text-textColor xs-max:flex-col 3xl-max:flex-row">
            <p lang="fa" role="text" className="w-max">
              متن پیامک گروه
            </p>
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-between mb-3">
              <div className="flex items-center">
                <p
                  lang="fa"
                  role="text"
                  className="text-blue-gray-600 text-base font-normal"
                >
                  وضعیت:
                  {/* {confirmation === "0" ? ( */}
                  {/* <Tag color="#E53935" className="mr-3 rounded-lg ">
                  تایید نشده
                </Tag> */}
                  {/* ) : ( */}
                  <Tag color="#43A047" className="mr-2 rounded-lg ">
                    تایید شده
                  </Tag>
                  {/* )} */}
                </p>
                <div className="flex flex-row-reverse ">
                  <p
                    lang="fa"
                    role="text"
                    className="text-blue-gray-600 text-base mr-2 font-normal"
                  >
                    تعداد کاراکتر ها:
                    <Tag color="#2196F3" className="mr-2 rounded-lg ">
                      {/* {text.length} */}
                    </Tag>
                  </p>
                  <p
                    lang="fa"
                    role="text"
                    className="text-blue-gray-600 text-base font-normal mr-2"
                  >
                    تعداد پیامک:
                    <Tag color="#2196F3" className="mr-2 rounded-lg ">
                      3
                    </Tag>
                  </p>
                </div>
              </div>
              <div className="w-72 flex flex-row-reverse p-3 gap-2">
              <ButtonComponent
                  // onClick={() => {navigate("/PasswordRecovery/NewPassword"); showModalHandler();}}
                  ButtonClass={
                    "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                  }
                >
                  تایید متن
                </ButtonComponent>
                <ButtonComponent
                  // onClick={() => {navigate("/PasswordRecovery/NewPassword"); showModalHandler();}}
                  ButtonClass={
                    "w-full gap-2 text-sm px-[1.125rem] py-2 text-white rounded-lg bg-[#E53935] hover:bg-hover-[#E53935] shadow-gray-500/20"
                  }
                >
                  عدم تایید متن
                </ButtonComponent>
              </div>
            </div>
            <TextArea
              className="p-3 h-64 mt-1"
              
              // Value={text}
              // onChange={() => {
              // dispatch(
              //   StoreManagementSlice.actions.setConfirmation(confirmation)
              // );
              // dispatch(StoreManagementSlice.actions.setText(e.target.value));
              // dispatch(StoreManagementSlice.actions.setGroupName(groupName));
              // }}
              placeholder="متن پیامک اعضای گروه"
            />
            <p lang="fa" role="text" className="text-sm my-3 mb-4">
              حداکثر 1000 کاراکتر
            </p>
          </div>
        </div>
        <CustomTable columns={columns} dataSource={data} theme="primary" />
      </div>
    </div>
    // {/* </div> */}
  );
};

export default ViewGroup;

// Types
interface DataType {
  key: React.Key;
  name: string;
  family: string;
  birthDate: string;
  job: string;
  phoneNumber: string;
}
