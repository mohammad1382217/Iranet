import React from "react";
import moment from "moment-jalaali";
import { Link, useNavigate } from "react-router-dom";
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import Modal from "../../../components/Modal";
import { Parag } from "../../../components/tools";
import {
  appSlice,
  lotteryGroups,
  selectIsLotteryLoading,
  selectLotteryGroups,
  selectShowModals,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import {
  fetchLotteryGroupsThunk,
  fetchLotterySurveyThunk,
} from "../../../../lib/redux/slices/LotterySlice/thunk";
const Spin = React.lazy(() => import("antd/es/spin/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Input = React.lazy(() => import("antd/es/input/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));

const Lottery: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    Promise.allSettled([
      dispatch(fetchLotterySurveyThunk()),
      dispatch(fetchLotteryGroupsThunk()),
    ]);
  }, []);

  const isLotteryLoading = useSelector(selectIsLotteryLoading);
  const LotteryGroups = useSelector(selectLotteryGroups);
  const showModals = useSelector(selectShowModals);
  const showModalsHandler = (name: string) =>
    dispatch(appSlice.actions.setShowModals(name));
  const handleCreateLottery = () => {
    showModalsHandler("showModalMethodeLottery");
  };

  const columns: CustomColumnType<lotteryGroups>[] = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      // align: "center",
      searchProps: true,
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "تاریخ",
      dataIndex: "created_at",
      key: "created_at",
      DateRangeProps: true,
      align: "center",
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      render: (text) => <>{moment(text).format("jYYYY/jMM/jDD - HH:mm")}</>,
    },
    {
      title: "برندگان",
      dataIndex: "winner_count",
      key: "winner_count",
      align: "center",
      render: (index: number) => (
        <Button
          className="p-0"
          type="link"
          onClick={() =>
            navigate(`/store/Lottery/ShowLotteryWinners/${index - 1}`)
          }
        >
          مشاهدۀ برندگان
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton
        Button={
          <ButtonComponent
            onClick={() => handleCreateLottery()}
            ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          >
            <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
              قرعه کشی جدید
              <div className="text-xl sm-max:text-xs p-0  ml-3">+</div>
            </div>
          </ButtonComponent>
        }
        HeaderTitle={"بایگانی قرعه کشی های قبلی"}
      />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <Spin spinning={isLotteryLoading}>
          <CustomTable
            size="large"
            className="mt-10"
            bordered
            dataSource={LotteryGroups}
            columns={columns}
            theme={"secondary"}
          />
        </Spin>
      </div>
      <Modal
        modalHeader={<></>}
        modalClass="!min-w-[43%]"
        modalHeaderClass="h-0 p-0 m-0"
        modalBody={
          <>
            <p
              lang="fa"
              role="text"
              className="font-semibold sm-max:text-base text-center text-2xl mb-4 text-[#212121]"
            >
              انتخاب روش قرعه کشی
            </p>
            <div className="container flex items-center justify-center shrink-0 flex-wrap gap-4">
              <div
                onClick={() => {
                  showModalsHandler("showModalLotteryGroups");
                  showModalsHandler("showModalMethodeLottery");
                }}
                className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-36 rounded-lg border border-solid border-cyan-300 bg-cyan-50 cursor-pointer"
              >
                <Parag
                  Paragraph={"گروه ها"}
                  Pclass={"text-2xl text-center font-bold text-cyan-700"}
                />
              </div>
              <div
                onClick={() => {
                  showModalsHandler("showModalMethodeLottery");
                  showModalsHandler("showModalLotteryResultSurvey");
                }}
                className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-36 rounded-lg border border-solid border-teal-300 bg-teal-50 cursor-pointer"
              >
                <Parag
                  Paragraph={"نظر سنجی ها"}
                  Pclass={"text-2xl text-center font-bold text-teal-700"}
                />
              </div>
            </div>
          </>
        }
        modalBodyClass=""
        modalFooterClass="p-0 m-0 h-0"
        Open={showModals.showModalMethodeLottery}
        HandleOpen={() => showModalsHandler("showModalMethodeLottery")}
        modalFooter={<></>}
      />
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
        modalHeader={"فرم ایجاد قرعه کشی (از میان مخاطبین گروه ها)"}
        modalBody={
          <div className="flex flex-col gap-3.5 max-w-96">
            <p
              lang="fa"
              role="text"
              className="text-[0.94rem] font-normal text-[#757575] self-start"
            >
              تنظیمات مربوط به قرعه کشی را وارد کنید
            </p>
            <Input
              value={""}
              onChange={
                (e) => {}
                // dispatch(
                //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
                // )
              }
              placeholder="عنوان قرعه کشی"
              className="mt-3 h-10"
            />
            <Select
              className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-2"
              size="large"
              mode="multiple"
              placeholder="انتخاب گروه"
              // value={selectedItems}
              onChange={
                (e) => {}
                // dispatch(occasionalmessageSlice.actions.setSelectedOption(e))
              }
              style={{}}
              // options={filteredOptions.map((item) => ({
              //   value: item,
              //   label: item,
              // }))}
            />
            <ButtonComponent
              // onClick={handleNextLevel}
              ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
            >
              تایید و ورود به مرحلۀ بعد
            </ButtonComponent>
            <ButtonComponent
              onClick={() => navigate("/store/Dashboard")}
              ButtonClass="flex items-center justify-center mx-auto bg-white shadow-none hover:shadow-none"
            >
              <div className="flex items-center gap-2 text-sm text-[#151515] font-medium">
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
                <div>
                  <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                  داشبورد
                </div>
              </div>
            </ButtonComponent>
          </div>
        }
        modalBodyClass="p-6 pt-0"
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalLotteryGroups}
        HandleOpen={() => showModalsHandler("showModalLotteryGroups")}
      />
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
        modalHeader={"فرم ایجاد قرعه کشی (از میان نتایج نظرسنجی و مسابقه)"}
        modalBody={
          <div className="flex flex-col gap-3.5 max-w-96">
            <p
              lang="fa"
              role="text"
              className="text-[0.94rem] font-normal text-[#757575] self-start"
            >
              تنظیمات مربوط به قرعه کشی را وارد کنید
            </p>
            <Input
              value={""}
              onChange={
                (e) => {}
                // dispatch(
                //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
                // )
              }
              placeholder="عنوان قرعه کشی"
              className="mt-3 h-10"
            />
            <Select
              className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-2"
              size="large"
              mode="multiple"
              placeholder="انتخاب نظرسنجی و مسابقه"
              // value={selectedItems}
              onChange={
                (e) => {}
                // dispatch(occasionalmessageSlice.actions.setSelectedOption(e))
              }
              style={{}}
              // options={filteredOptions.map((item) => ({
              //   value: item,
              //   label: item,
              // }))}
            />
            <Select
              className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-2"
              size="large"
              mode="multiple"
              placeholder="گزینه ها"
              // value={selectedItems}
              onChange={
                (e) => {}
                // dispatch(occasionalmessageSlice.actions.setSelectedOption(e))
              }
              style={{}}
              // options={filteredOptions.map((item) => ({
              //   value: item,
              //   label: item,
              // }))}
            />
            <Input
              value={""}
              onChange={
                (e) => {}
                // dispatch(
                //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
                // )
              }
              placeholder="تعداد برگزیدگان"
              className="mt-3 h-10"
            />
            <ButtonComponent
              // onClick={handleNextLevel}
              ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
            >
              ثبت قرعه کشی
            </ButtonComponent>
            <ButtonComponent
              onClick={() => navigate("/store/Dashboard")}
              ButtonClass="flex items-center justify-center mx-auto bg-white shadow-none hover:shadow-none"
            >
              <div className="flex items-center gap-2 text-sm text-[#151515] font-medium">
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
                <div>
                  <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                  داشبورد
                </div>
              </div>
            </ButtonComponent>
          </div>
        }
        modalBodyClass="p-6 pt-0"
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalLotteryResultSurvey}
        HandleOpen={() => showModalsHandler("showModalLotteryResultSurvey")}
      />
    </div>
  );
};

export default Lottery;
