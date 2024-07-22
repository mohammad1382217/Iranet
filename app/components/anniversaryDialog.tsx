import React from "react";
import "./TableInputNote/TableInputNote.scss";
import tableData from "../../data/anniversaryDialog.json";
import CustomTable from "./Table";

const DialogTable: React.FC = () => {
  const TableData = tableData.data;
  const columns_anniversary = [
    // {
    //   title: "نام",
    //   dataIndex: "firstName",
    //   key: "firstName",
    //   
    //   searchProps: true,
    // },
    // {
    //   title: "نام خانوادگی",
    //   dataIndex: "lastName",
    //   key: "lastName",
    //   
    //   searchProps: true,
    // },
    {
      title: "مناسبت",
      dataIndex: "occasion",
      key: "occasion",
      
      searchProps: true,
      // render: (tags: string) => (
      //   <Tag className="font-normal p-1 text-xs text-[#000000D9]">{tags}</Tag>
      // ),
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      searchProps: true,
      
    },
  ];
  return (
    <div className="w-full">
    <CustomTable size="large" dataSource={TableData} columns={columns_anniversary} theme={"secondary"} />
    </div>
  );
};

export default DialogTable;
// Types
// interface DataType {
//   key: React.Key;
//   occasion: string;
//   phoneNumber: string;
// }