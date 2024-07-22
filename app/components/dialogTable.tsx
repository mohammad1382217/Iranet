import React from "react";
import tableData from "../../data/anniversaryDialog.json";
import CustomTable, { CustomColumnType } from "./Table";
const Tag = React.lazy(() => import("antd/es/tag/index"));

const DialogTable: React.FC = () => {
  const TableData = tableData.data;
  const columns_anniversary: CustomColumnType<DataType>[] = [
    {
      title: "مناسبت",
      dataIndex: "occasion",
      key: "occasion",
      searchProps: true,
      render: (tags: string) => (
        <Tag className="font-normal p-1 text-xs text-[#000000D9]">{tags}</Tag>
      ),
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <CustomTable
      size="large"
      dataSource={TableData}
      columns={columns_anniversary}
      theme={"secondary"}
    />
  );
};

export default DialogTable;

// Types
interface DataType {
  key: React.Key;
  occasion: string;
  phoneNumber: string;
}