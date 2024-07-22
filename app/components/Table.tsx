import PropTypes from "prop-types";
import moment from "moment-jalaali";
import React, { useRef } from "react";
import type { FilterConfirmProps, TablePaginationConfig } from "antd/es/table/interface";
import type { TableProps } from "antd/es/table/InternalTable";
import type { ColumnType } from "antd/es/table";
import type { InputRef } from "antd/es/input/index";
import { FaTimes } from "react-icons/fa";
const ButtonComponent = React.lazy(() => import("./Button"));
import { weekDays } from "../Register/page";
import Highlighter from "react-highlight-words";
import Table from "antd/es/table/Table";
const Input = React.lazy(() => import( "antd/es/input/index"));
const Space = React.lazy(() => import( "antd/es/space/index"));
import Form from "antd/es/form/index";
import InputNumber from "antd/es/input-number/index";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import FieldTimeOutlined from "@ant-design/icons/FieldTimeOutlined";

import {
  appSlice,
  selectEndDate,
  selectSearchTableText,
  selectSearchedAppTableColumn,
  selectStartDate,
  useDispatch,
  useSelector,
} from "../../lib/redux";

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

const CustomTable: React.FC<CustomTableProps> = ({
  dataSource,
  columns,
  theme,
  rowKey,
  rowClassName,
  rowSelection,
  bordered,
  pagination,
  showHeader,
  className,
}) => {
  const searchTextValue = useSelector(selectSearchTableText);
  const searchedColumn = useSelector(selectSearchedAppTableColumn);
  const searchInput = useRef<InputRef>(null);
  const dispatch = useDispatch();

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    dispatch(appSlice.actions.setSearchTableText(selectedKeys[0]));
    dispatch(appSlice.actions.setSearchedTableColumn(dataIndex));
  };

  const handleReset = (clearFilters: () => void, confirm: () => void) => {
    clearFilters();
    dispatch(appSlice.actions.setSearchTableText(""));
    dispatch(appSlice.actions.setSearchedTableColumn(""));
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: string,
    title: string
  ): ColumnType<any> => {
    return {
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
            className="font-thin bg-gray-50"
            placeholder={`جستجو در ${title}`}
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
            <ButtonComponent
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              ButtonClass={`!container !h-[28px] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-between items-center border-2 border-solid !border-${theme} gap-2`}
            >
              <span className="text-black text-[10px]">حذف جستجو</span>
              <FaTimes color="black" />
            </ButtonComponent>
            <ButtonComponent
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              ButtonClass={`!w-[123px] !h-[28px] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-${theme} gap-2`}
            >
              <span className="text-[10px]">جستجو</span>
              <SearchOutlined className="w-4 h-4 leading-normal" />
            </ButtonComponent>
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
      onFilter: (value: React.Key | boolean, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
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
    };
  };

  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);

  const handleDateRangeSearch = (
    confirm: (param?: FilterConfirmProps) => void
  ) => {
    confirm();
  };

  const handleDateRangeReset = (
    clearFilters: () => void,
    confirm: () => void
  ) => {
    clearFilters();
    dispatch(appSlice.actions.clearDateFilters());
    confirm();
  };

  const getColumnDateRangeProps = (dataIndex: string): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
      <div className="flex flex-col p-3 gap-2">
        <DatePicker
          value={startDate}
          onChange={(date) => {
            if (date instanceof DateObject) {
              setSelectedKeys([
                date?.convert(persian, persian_en).format().toString(),
              ]);
              dispatch(
                appSlice.actions.setStartDateFilters(
                  date?.convert(persian, persian_en).format()
                )
              );
            }
          }}
          weekDays={weekDays}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-center"
          inputClass="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3"
          id="startDate"
          placeholder="از تاریخ"
        />
        <DatePicker
          value={endDate}
          onChange={(date) => {
            if (date instanceof DateObject) {
              setSelectedKeys([
                date?.convert(persian, persian_en).format().toString(),
              ]);
              dispatch(
                appSlice.actions.setEndDateFilters(
                  date?.convert(persian, persian_en).format()
                )
              );
            }
          }}
          weekDays={weekDays}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-center"
          inputClass="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3"
          id="endDate"
          placeholder="تا تاریخ"
        />
        <div className="container flex gap-2">
          <ButtonComponent
            onClick={() =>
              clearFilters && handleDateRangeReset(clearFilters, confirm)
            }
            ButtonClass={`!container !h-[28px] bg-gray-50 text-xs font-bold px-2.5 py-1.5 flex justify-between items-center border-2 border-solid border-${theme} gap-2`}
          >
            <span className="text-black text-[10px]">حذف فیلتر</span>
            <FaTimes color="black" />
          </ButtonComponent>
          <ButtonComponent
            onClick={() => handleDateRangeSearch(confirm)}
            ButtonClass={`!container !h-[28px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-${theme} gap-2`}
          >
            <span className="text-[10px]">جستجو</span>
            <SearchOutlined className="w-4 h-4 leading-normal" />
          </ButtonComponent>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <FieldTimeOutlined
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (_, record) => {
      const dateString = record[dataIndex].toString(); // گرفتن رشته تاریخ از داده

      // حذف بخش ساعت از رشته تاریخ
      const dateWithoutTime = dateString.split(" - ")[0];

      const date = moment(dateWithoutTime, "jYYYY/jMM/jDD"); // تبدیل تاریخ به فرمت مطلوب
      const startDateValue = moment(startDate, "jYYYY/jMM/jDD"); // تبدیل تاریخ شروع به فرمت مطلوب
      const endDateValue = moment(endDate, "jYYYY/jMM/jDD"); // تبدیل تاریخ پایان به فرمت مطلوب
      return date.isBetween(startDateValue, endDateValue, null, "[]"); // بررسی آیا تاریخ بین تاریخ شروع و پایان است
    },
    render: (text) => text,
  });

  return (
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      dataSource={dataSource}
      columns={columns.map((column) => {
        const updatedColumn = { ...column };

        if (column.searchProps) {
          const {
            filterDropdown,
            onFilter,
            filterIcon,
            onFilterDropdownOpenChange,
          } = getColumnSearchProps(
            column.dataIndex as string,
            column.title as string
          );
          updatedColumn.filterDropdown = filterDropdown;
          updatedColumn.onFilter = onFilter;
          updatedColumn.filterIcon = filterIcon;
          updatedColumn.onFilterDropdownOpenChange = onFilterDropdownOpenChange;
        }

        if (column.DateRangeProps) {
          const { filterDropdown, onFilter, filterIcon } =
            getColumnDateRangeProps(column.dataIndex as string);
          updatedColumn.filterDropdown = filterDropdown;
          updatedColumn.onFilter = onFilter;
          updatedColumn.filterIcon = filterIcon;
        }

        return updatedColumn as CustomColumnType<any>;
      })}
      rowKey={rowKey}
      rowSelection={rowSelection}
      rowClassName={rowClassName}
      bordered={bordered}
      pagination={pagination}
      showHeader={showHeader}
      className={className}
      tableLayout="auto"
      scroll={{ x: "max-content" }}
    />
  );
};

export default CustomTable;

// Types
export type CustomColumnType<T> = ColumnType<T> & {
  searchProps?: boolean;
  DateRangeProps?: boolean;
  editable?: boolean;
};

type RowClassNameFunction = (record: any) => string;

interface CustomTableProps extends TableProps<any> {
  dataSource: any[];
  columns: CustomColumnType<any>[];
  theme: string;
  rowKey?: string;
  rowClassName?: string | RowClassNameFunction;
  pagination?: false | TablePaginationConfig;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: any;
  index: number;
  children: React.ReactNode;
}

CustomTable.propTypes = {
  theme: PropTypes.string.isRequired,
};
