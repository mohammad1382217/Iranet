import React, { useRef } from "react";
import {
  Input,
  Form,
  InputNumber,
  Table,
  Space,
  InputRef,
  Typography,
  Popconfirm,
  ConfigProvider,
  Select,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import Highlighter from "react-highlight-words";
import {
  tableInputNotesSlice,
  selecttableInputNotesData,
  selecttableInputNotesSearchText,
  selecttableInputNotesSearchedColumn,
  selecttableInputNotesAddTitle,
  selecttableInputNotesAddKind,
  selecttableInputNotesAddLimitCharacter,
  useSelector,
  useDispatch,
  dataTable,
  selectEditingKeyTable,
} from "../../../lib/redux";
import "./TableInputNote.scss";
import Button_component from "../Button";
import { ColumnType, ColumnsType, FilterConfirmProps } from "antd/es/table/interface";
import { Link } from "react-router-dom";
import fa_IR from "antd/locale/fa_IR";

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

export const TableInputNote: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const tableData = useSelector(selecttableInputNotesData);
  const editingKey = useSelector(selectEditingKeyTable);
  const searchInput = useRef<InputRef>(null);
  const searchTextValue = useSelector(selecttableInputNotesSearchText);
  const searchedColumn = useSelector(selecttableInputNotesSearchedColumn);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    dispatch(tableInputNotesSlice.actions.setSearchText(selectedKeys[0]));
    dispatch(tableInputNotesSlice.actions.setSearchedColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    dispatch(tableInputNotesSlice.actions.setSearchText(""));
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
    render: (text: string) =>
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

  const InputTitle = useSelector(selecttableInputNotesAddTitle);
  const InputKind = useSelector(selecttableInputNotesAddKind);
  const InputLimitCharacter = useSelector(
    selecttableInputNotesAddLimitCharacter
  );
  const isDisabled =
    InputTitle === "" || InputKind === "" || InputLimitCharacter === null;
  const addItem = () => {
    const newDataItem: dataTable = {
      key: tableData.length + 1,
      title: InputTitle,
      kind: InputKind,
      limitcharacter: InputLimitCharacter,
    };
    const newData = [...tableData, newDataItem];
    dispatch(tableInputNotesSlice.actions.setNewData(newData));
    dispatch(tableInputNotesSlice.actions.setAddTitle(""));
    dispatch(tableInputNotesSlice.actions.setAddKind(""));
    dispatch(tableInputNotesSlice.actions.setAddLimitCharacter(null));
  };

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({
      title: "",
      kind: "",
      limitcharacter: null,
      ...record,
    });
    dispatch(
      tableInputNotesSlice.actions.setEditingKeyTable(record.key as string)
    );
  };

  const handleDelete = (key: React.Key) => {
    const newData = tableData.filter((item) => item.key !== key);
    dispatch(tableInputNotesSlice.actions.setNewData(newData));
  };

  const cancel = () => {
    dispatch(tableInputNotesSlice.actions.setEditingKeyTable(""));
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
        dispatch(tableInputNotesSlice.actions.setNewData(newData));
        dispatch(tableInputNotesSlice.actions.setEditingKeyTable(""));
      } else {
        newData.push(row);
        dispatch(tableInputNotesSlice.actions.setNewData(newData));
        dispatch(tableInputNotesSlice.actions.setEditingKeyTable(""));
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  type EditableColumnType = ColumnType<DataType> & { editable?: boolean };

  const columns_Table: EditableColumnType[] = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: "25%",
      align: "center",
      editable: true,
      ...getColumnSearch("title", "عنوان"),
    },
    {
      title: "نوع",
      dataIndex: "kind",
      key: "kind",
      width: "15%",
      align: "center",
      editable: true,
      ...getColumnSearch("kind", "نوع"),
      render: (tags: string) => (
        <Tag color={
          tags === "تاریخ"
            ? "orange"
            : tags === "متن"
            ? "purple"
            : tags === "عدد"
            ? "blue"
            : ""
        } className="font-normal p-1 text-xs text-[#000000D9]">
          {tags}
        </Tag>
      ),
    },
    {
      title: "محدودیت کاراکتر",
      dataIndex: "limitcharacter",
      key: "limitcharacter",
      width: "15%",
      align: "center",
      editable: true,
      sorter: (a: DataType, b: DataType) => a.limitcharacter - b.limitcharacter,
      render: (tags: string) => (
        <Tag
          color="#FF4D4F"
          className="font-normal mx-auto p-1 rounded-lg text-xs text-[#FFFFFF]"
        >
          {tags}
        </Tag>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: "15%",
      align: "center",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex gap-20 mx-auto justify-center">
            <Typography.Link onClick={() => save(record.key)}>
              ذخیره
            </Typography.Link>
            <Popconfirm title="آیا عملیات را لغو می کنید?" onConfirm={cancel}>
              <Link to={"#"}>لغو</Link>
            </Popconfirm>
          </div>
        ) : (
          <div className="flex gap-4 mx-auto justify-center">
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

  const mergedColumns = columns_Table.map((col) => {
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

  return (
    <div className="w-full">
      <div className="flex flex-row sm:flex-col sm:w-full lg:p-1 h-33 items-center justify-between !p-4">
        <span className="font-bold text-xl sm:text-xl sm:mt-3 lg:text-sm text-[#151515] w-1/6 sm:w-64">
          فیلد جدید :
        </span>
        <Input
          size="large"
          // status={InputTitle === "" ? "error" : ""}
          onChange={(value) =>
            dispatch(
              tableInputNotesSlice.actions.setAddTitle(value.target.value)
            )
          }
          placeholder="عنوان"
          className="mt-2 lg:mx-2 h-10 w-1/5 sm:w-64"
        />
        <Select
          placeholder="نوع"
          className="mt-2 h-10 lg:mx-2 w-1/5 sm:w-64"
          onChange={(value) =>
            dispatch(tableInputNotesSlice.actions.setAddKind(value))
          }
          options={[
            {
              value: "متن",
            },
            {
              value: "عدد",
            },
            {
              value: "تاریخ",
            },
          ]}
        />
        <InputNumber
          value={InputLimitCharacter}
          disabled={InputKind == 'تاریخ' ? true:false}
          onChange={(value) =>
            dispatch(tableInputNotesSlice.actions.setAddLimitCharacter(value))
          }
          placeholder="محدودیت کاراکتر"
          className="mt-2 lg:mx-2 flex justify-center items-center h-10 w-1/5 sm:w-64"
        />
        <Button_component
          disabled={isDisabled}
          onClick={addItem}
          children={"ایجاد فیلد"}
          ButtonClass="bg-[#2DCEA2] w-1/5 sm:w-64 mt-2 lg:mx-2 text-xs font-bold h-10 flex justify-center items-center"
        />
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
  key: string;
  title: string;
  kind: string;
  limitcharacter: number;
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
  title: string;
  kind: string;
  limitcharacter: number;
}