import React from "react";
import "./TableInputNote/TableInputNote.scss";
import CustomTable, { CustomColumnType } from "./Table";
import { surveyMembers } from "../../lib/redux";


const ParticipantsDialogTable: React.FC<tableDataProps> = ({tableData}) => {

  const columns_anniversary: CustomColumnType<surveyMembers>[] = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "full_name",
      key: "full_name",
      searchProps: true,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone_number",
      key: "phone_number",
      searchProps: true,
    },
    {
      title: "گزینه مورد نظر",
      dataIndex: "survey_option",
      key: "survey_option",
      filters: [
        {
          text: "عالی",
          value: "عالی",
        },
        {
          text: "خیلی خوب",
          value: "خیلی خوب",
        },
        {
          text: "خوب",
          value: "خوب",
        },
        {
          text: "ضعیف",
          value: "ضعیف",
        },
        {
          text: "خیلی ضعیف",
          value: "خیلی ضعیف",
        },
      ],
      onFilter: (value: React.Key | boolean, record: surveyMembers) =>
        record.survey_option.title.includes(value as string),
      render: (survey_option) => <span>{survey_option.title}</span>,
    },
  ];
  return (
    <CustomTable
      size="large"
      dataSource={tableData}
      columns={columns_anniversary}
      theme={"secondary"}
    />
  );
};

export default ParticipantsDialogTable;

// Types
interface tableDataProps {
  tableData: surveyMembers[]
}