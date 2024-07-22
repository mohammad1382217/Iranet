import React from "react";
import "./TableInputNote.scss";
import { Link } from "react-router-dom";
import ButtonComponent from "../Button";
import CustomTable, { CustomColumnType } from "../Table";
import Form from "antd/es/form/index";
const Input = React.lazy(() => import( "antd/es/input/index"));
import Popconfirm from "antd/es/popconfirm/index";
import Typography from "antd/es/typography/index";
const Select = React.lazy(() => import("antd/es/select/index"));
import InputNumber from "antd/es/input-number/index";
const Tag = React.lazy(() => import("antd/es/tag/index"));
import {
  tableInputNotesSlice,
  selecttableInputNotesData,
  selecttableInputNotesAddTitle,
  selecttableInputNotesAddKind,
  selecttableInputNotesAddLimitCharacter,
  useSelector,
  useDispatch,
  dataTable,
  selectEditingKeyTable,
} from "../../../lib/redux";

const TableInputNote: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const tableData = useSelector(selecttableInputNotesData);
  const InputTitle = useSelector(selecttableInputNotesAddTitle);
  const InputKind = useSelector(selecttableInputNotesAddKind);
  const InputLimitCharacter = useSelector(
    selecttableInputNotesAddLimitCharacter
  );
  const isDisabled = InputTitle === "" || InputKind === "";
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
    dispatch(tableInputNotesSlice.actions.setEditingKeyTable(record.key as string));
  };

  const handleDelete = (key: React.Key) => {
    // const newData = tableData.filter((item) => item.key !== key);
    // dispatch(tableInputNotesSlice.actions.setNewData(newData));
  };

  const cancel = () => {
    dispatch(tableInputNotesSlice.actions.setEditingKeyTable(""));
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

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

  const columns_Table: CustomColumnType<DataType>[] = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      
      align: "center",
      editable: true,
      searchProps: true,
    },
    {
      title: "نوع",
      dataIndex: "kind",
      key: "kind",
      
      align: "center",
      editable: true,
      searchProps: true,
      render: (tags: string) => (
        <Tag
          color={
            tags === "تاریخ"
              ? "orange"
              : tags === "متن"
              ? "purple"
              : tags === "عدد"
              ? "blue"
              : ""
          }
          className="font-normal p-1 text-xs text-[#000000D9]"
        >
          {tags}
        </Tag>
      ),
    },
    {
      title: "محدودیت کاراکتر",
      dataIndex: "limitcharacter",
      key: "limitcharacter",
      
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
      
      align: "center",
      render: (_: string, record: DataType) => {
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
                <span className="!text-red-700">حذف</span>
              </Popconfirm>
            ) : null}
          </div>
        );
      },
    },
  ];

  const editingKey = useSelector(selectEditingKeyTable);
  const isEditing = (record: DataType) => record.key === editingKey;

  const mergedColumns = columns_Table.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "limitcharacter" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="w-full">
      <div className="flex flex-row sm-max:flex-col sm-max:w-full lg-max:p-1 h-33 items-center justify-between !p-4">
        <span className="font-bold text-xl sm-max:text-xl sm-max:mt-3 lg-max:text-sm text-textColor w-1/6 sm-max:w-64">
          فیلد جدید :
        </span>
        <Input
          size="large"
          value={InputTitle}
          // status={InputTitle === "" ? "error" : ""}
          onChange={(value) =>
            dispatch(
              tableInputNotesSlice.actions.setAddTitle(value.target.value)
            )
          }
          placeholder="عنوان"
          className="mt-2 lg-max:mx-2 h-10 w-1/5 sm-max:w-64"
        />
        <Select
          value={InputKind === "" ? null : InputKind}
          placeholder="نوع"
          className="mt-2 h-10 lg-max:mx-2 w-1/5 sm-max:w-64"
          onChange={(value: unknown) =>
            dispatch(tableInputNotesSlice.actions.setAddKind(value as string))
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
          type="number"
          value={InputLimitCharacter}
          disabled={InputKind == "تاریخ" ? true : false}
          onChange={(value) =>
            dispatch(tableInputNotesSlice.actions.setAddLimitCharacter(value))
          }
          placeholder="محدودیت کاراکتر"
          className="mt-2 lg-max:mx-2 flex justify-center items-center h-10 w-1/5 sm-max:w-64"
        />
        <ButtonComponent
          disabled={isDisabled}
          onClick={addItem}
          ButtonClass="bg-secondary w-1/5 sm-max:w-64 mt-2 lg-max:mx-2 text-xs font-bold h-10 flex justify-center items-center"
        >
          ایجاد فیلد
        </ButtonComponent>
      </div>
      <div className="mt-10">
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

export default TableInputNote;

interface DataType {
  key: React.Key;
  title: string;
  kind: string;
  limitcharacter: number;
}
