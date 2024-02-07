import React, { useRef } from "react";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Popconfirm,
  Space,
  Table,
  Typography,
  Upload,
  UploadProps,
  message,
} from "antd";
import fa_IR from "antd/locale/fa_IR";
import Button_component from "./Button";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { selectEditingKey, selectuserNoteData, selectuserNoteSearchText, selectuserNoteSearchedColumn, useDispatch, useSelector, userNoteSlice } from "../../lib/redux";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import { FaRegTrashAlt } from "react-icons/fa";
import Highlighter from "react-highlight-words";

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `${title} را وارد کنید!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const UsersNote: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const tableData = useSelector(selectuserNoteData);
  const editingKey = useSelector(selectEditingKey);
  const searchInput = useRef<InputRef>(null);
  const searchTextValue = useSelector(selectuserNoteSearchText);
  const searchedColumn = useSelector(selectuserNoteSearchedColumn);
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(userNoteSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(userNoteSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(userNoteSlice.actions.setSearchText(""));
  };

  const getColumnSearch = (
    dataIndex: DataIndex,
    name: string
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
          width: 250,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          className="font-thin font-[Estedad-FD]"
          placeholder={`جستجو در ${name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space className="w-full flex flex-row justify-between gap-2">
          <Button_component
            Type="submit"
            onClick={() => clearFilters && handleReset(clearFilters)}
            ButtonClass="!w-[105px] !h-[28px] border-secondary border-2 bg-[#FFFFFF] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2"
          >
            <span className="text-black text-[10px]">پاک سازی متن</span>
            <FaRegTrashAlt color="black" />
          </Button_component>
          <Button_component
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            ButtonClass="!w-[123px] !h-[28px] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-secondary gap-2"
          >
            <span className="text-[10px]">جستجو</span>
            <SearchOutlined className="w-4 h-4 leading-normal"/>
          </Button_component>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value: any, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text : string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#DFF8F2",
            padding: 0,
          }}
          searchWords={[searchTextValue]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    dispatch(userNoteSlice.actions.setEditingKey(record.key as string));
  };

  const handleDelete = (key: React.Key) => {
    const newData = tableData.filter((item) => item.key !== key);
    dispatch(userNoteSlice.actions.setNewData(newData));
  };

  const cancel = () => {
    dispatch(userNoteSlice.actions.setEditingKey(""));
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
        dispatch(userNoteSlice.actions.setEditingKey(""));
      } else {
        newData.push(row);
        dispatch(userNoteSlice.actions.setNewData(newData));
        dispatch(userNoteSlice.actions.setEditingKey(""));
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  type EditableColumnType = ColumnType<DataType> & { editable?: boolean };
  
  const columns : EditableColumnType[] = [
    {
      title: "نام",
      dataIndex: "firstName",
      width: "15%",
      align: 'center',
      editable: true,
      ...getColumnSearch("firstName", "نام"),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      width: "20%",
      align: 'center',
      editable: true,
      ...getColumnSearch("lastName", "نام خانوادگی"),
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthdate",
      width: "10%",
      align: 'center',
      editable: true,
      sorter: (a: DataType, b: DataType) => a.birthdate.localeCompare(b.birthdate),
    },
    {
      title: "شغل",
      dataIndex: "job",
      width: "10%",
      align: 'center',
      editable: true,
      ...getColumnSearch("job", "شغل"),
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      width: "20%",
      align: 'center',
      editable: true,
      ...getColumnSearch("job", "شغل"),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      width: "15%",
      align: 'center',
      render: (_: any, record: DataType) => {
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
                <Link className="!text-red-700" to={"#"}>حذف</Link>
              </Popconfirm>
            ) : null}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "phoneNumber" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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

  return (
    <div className="w-full">
      <div className="flex sm:flex-col h-33 items-center justify-center py-3 w-full">
        <span className="text-2xl font-semibold sm:text-sm sm:mb-2 lg:text-base text-[#151515] w-full ">
          افزودن مخاطب با فایل:
        </span>
        <div className="flex items-center justify-center w-full">
          <Upload {...props} maxCount={3} className="w-auto">
            <Button
              className="h-10 w-auto"
              icon={<UploadOutlined />}
            >
              آپلود لیست شماره ها
            </Button>
          </Upload>
          <Button_component ButtonClass="bg-[#2DCEA2] w-max sm:mr-3 px-4 py-2 mr-4 sm:mr-2 text-xs font-bold h-10 flex justify-center items-center">
            افزودن مخاطبین
          </Button_component>
        </div>
      </div>
      <div>
        <Form form={form} component={false}>
          <ConfigProvider locale={fa_IR}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={tableData}
              columns={mergedColumns as ColumnTypes}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </ConfigProvider>
        </Form>
      </div>
    </div>
  );
};

// Types
interface Item {
  key: string,
  firstName: string,
  lastName: string,
  birthdate:string ,
  job: string,
  phoneNumber: string,
}

type DataIndex = keyof DataType;
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

interface DataType {
  key: React.Key;
  firstName: string,
  lastName: string,
  birthdate:string ,
  job: string,
  phoneNumber: string,
}