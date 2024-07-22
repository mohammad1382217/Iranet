import React from "react";
import { Link } from "react-router-dom";
const ButtonComponent = React.lazy(() => import("./Button"));
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import CustomTable, { CustomColumnType } from "./Table";
import Form from "antd/es/form/index";
const Button = React.lazy(() => import( "antd/es/button/index"));
import Upload from "antd/es/upload/Upload";
import message from "antd/es/message/index";
import Popconfirm from "antd/es/popconfirm/index";
import Typography from "antd/es/typography/index";
import type { UploadProps } from "antd/es/upload/interface";

import {
  appSlice,
  selectEditingKeyUserNotes,
  selectuserNoteData,
  useDispatch,
  useSelector,
  userNoteSlice,
} from "../../lib/redux";

const UsersNote: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const tableData = useSelector(selectuserNoteData);
  const editingKey = useSelector(selectEditingKeyUserNotes);

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({
      firstName: "",
      lastName: "",
      birthdate: "",
      job: "",
      phoneNumber: "",
      ...record,
    });
    dispatch(
      userNoteSlice.actions.setEditingKeyUserNotes(record.key as string)
    );
  };

  const handleDelete = (key: React.Key) => {
    const newData = tableData.filter((item) => item.key !== key);
    dispatch(userNoteSlice.actions.setNewData(newData));
  };

  const cancel = () => {
    dispatch(appSlice.actions.setEditingKeyTable(""));
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        dispatch(userNoteSlice.actions.setNewData(newData));
        dispatch(userNoteSlice.actions.setEditingKeyUserNotes(""));
      } else {
        newData.push(row);
        dispatch(userNoteSlice.actions.setNewData(newData));
        dispatch(userNoteSlice.actions.setEditingKeyUserNotes(""));
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",

      align: "center",
      editable: true,
      searchProps: true,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",

      align: "center",
      editable: true,
      searchProps: true,
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthdate",
      key: "birthdate",

      align: "center",
      editable: true,
      sorter: (a: DataType, b: DataType) =>
        a.birthdate.localeCompare(b.birthdate),
    },
    {
      title: "شغل",
      dataIndex: "job",
      key: "job",

      align: "center",
      editable: true,
      searchProps: true,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      key: "phoneNumber",

      align: "center",
      editable: true,
      searchProps: true,
    },
    {
      title: "عملیات",
      dataIndex: "operation",

      align: "center",
      render: (_: string, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex gap-20">
            <Typography.Link onClick={() => save(record.key)}>
              ذخیره
            </Typography.Link>
            <Popconfirm title="آیا عملیات را لغو می کنید?" onConfirm={cancel}>
              <Link to={"#"}>لغو</Link>
            </Popconfirm>
          </div>
        ) : (
          <div className="flex gap-4">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              ویرایش اطلاعات
            </Typography.Link>
            {tableData.length >= 1 ? (
              <Popconfirm
                title="آیا مطمئن هستید حذف میکنید؟"
                onConfirm={() => handleDelete(record.key)}
              >
                <Link className="!text-red-700" to={"#"}>
                  حذف
                </Link>
              </Popconfirm>
            ) : null}
          </div>
        );
      },
    },
  ];

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,

      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const isEditing = (record: DataType) => record.key === editingKey;

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="w-full">
      <div className="flex sm-max:flex-col mt-2 h-33 items-center justify-center py-3 w-full">
        <span className="font-bold text-xl sm-max:text-xl sm-max:my-3 lg-max:text-sm text-textColor w-full">
          افزودن مخاطب با فایل:
        </span>
        <div className="flex items-center justify-end sm-max:justify-between w-full">
          <Upload {...props} maxCount={3} className=" sm-max:w-1/2">
            <Button
              className="h-10 w-full px-5 sm-max:px-5 lg-max:!px-5"
              icon={<UploadOutlined />}
            >
              آپلود لیست شماره ها
            </Button>
          </Upload>
          <ButtonComponent ButtonClass="bg-secondary sm-max:w-1/2 w-max sm-max:mr-3 sm-max:px-10 px-20  lg-max:!px-5 2xl-max:px-10 py-2 mr-4 sm-max:mr-2 text-xs font-bold h-10 flex justify-center items-center">
            افزودن مخاطبین
          </ButtonComponent>
        </div>
      </div>
      <div className="mt-3">
        <Form form={form} component={false}>
          <CustomTable
            size="large"
            bordered
            dataSource={tableData}
            columns={mergedColumns as CustomColumnType<DataType>[]}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
            theme={"secondary"}
          />
        </Form>
      </div>
    </div>
  );
};

export default UsersNote;

// Types
interface Item {
  key: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  job: string;
  phoneNumber: string;
}

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  birthdate: string;
  job: string;
  phoneNumber: string;
}
