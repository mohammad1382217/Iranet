import "./style.scss";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import Modal from "../../../components/Modal";
import { Parag } from "../../../components/tools";
import Upload from "antd/es/upload/Upload";
import Switch from "antd/es/switch/index";
import { Link, useParams } from "react-router-dom";
import type { UploadProps } from "antd/es/upload/interface";
import Textarea from "../../../components/TextArea";
import {
  HiOutlineArrowCircleRight,
  HiOutlinePaperClip,
  HiPaperAirplane,
} from "react-icons/hi";
const Button = React.lazy(() => import( "antd/es/button/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));


const props: UploadProps = {
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: "1",
      name: "yyy.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ],
  // iconRender: <button onClick={(e) => console.log(e, 'custom removeIcon event')} />,
  showUploadList: {
    showPreviewIcon: true,
    // showDownloadIcon: true,
    // downloadIcon: <p lang="fa" role="text">ali</p>,
    previewIcon: <p lang="fa" role="text">ali</p>,
    // removeIcon: <button onClick={(e)=>{e.preventDefault}} >ali</button>,
  },
};
const ViewTicketAdmin: React.FC = () => {
  const [ModalHandlerDeleteTeket, setModalHandlerDeleteTeket] =
    React.useState(false);
  const showModalHandlerDeleteTeket = () =>
    setModalHandlerDeleteTeket(!ModalHandlerDeleteTeket);
  const { idTicket } = useParams();
  console.log(idTicket);
  const [Modalstate, setModalstate] = React.useState(false);
  const ModalHandler = () => {
    setModalstate(!Modalstate);
  };

  return (
    <div>
      <div className="w-full h-20 bg-[#FAFAFA] flex items-center justify-between p-4">
        <div className="flex flex-row md-max:flex-col items-center justify-center">
          <p lang="fa" role="text" className="text-2xl font-semibold text-textColor">عنوان تیکت</p>
          <p lang="fa" role="text" className="text-sm font-medium text-textColor mr-4 sm-max:mr-0">
            کد شناسۀ تیکت
          </p>
        </div>
        <div className="flex flex-row-reverse">
          <Link to="/admin/tickets">
            <ButtonComponent
              children="برگشت به صفحه تیکت ها"
              ButtonClass="bg-[#0081E8] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            />
          </Link>

          <ButtonComponent
            onClick={ModalHandler}
            ButtonClass="bg-white ml-3 text-textColor text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center border border-solid border-[#0081E8] gap-2"
          >
            <Parag Paragraph={"مدیریت تیکت"} Pclass={""} />
            <CiSettings className="w-4 h-4" />
          </ButtonComponent>
        </div>
      </div>

      <div className=" px-52 lg-max:px-16 md-max:px-3 my-1 sm-max:!px-0 justify-between flex flex-col">
        <div
          id="messages"
          className="flex flex-col justify-end h-[75vh] space-y-3 p-3 overflow-y-auto"
        >
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div className="flex flex-end items-end flex-row-reverse sm-max:flex-col">
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#ECEFF1]  text-textColor">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است
                  </span>
                  <span className="w-72 sm-max:mt-2">1400/1/1 - 12:21’</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div className="flex flex-end items-end flex-row-reverse sm-max:flex-col-reverse">
                  <span className="w-72 sm-max:mt-2 mr-3 sm-max:mr-0">
                    1400/1/1 - 12:21’
                  </span>
                  <span className="px-5 py-3 rounded-lg  inline-block rounded-br-none  bg-[#0081E8] text-[#FFFFFF] ">
                    پشتیبانی ایرانت
                    <br></br>
                    <br></br>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-end !mb-3 !mt-1 mx-2 sm-max:flex-col sm-max:items-start">
            <Upload
              {...props}
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              // defaultFileList={[...fileList]}
              className="upload-list-inline flex !m-0 flex-col upload-admin"
            >
              <button
                type="button"
                className="inline-flex fixed left-60 lg-max:left-24 md-max:left-22 sm-max:!left-12 sm-max:!bottom-1 bottom-8  z-50 items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <HiOutlinePaperClip className="h-6 w-6 text-gray-600" />
              </button>
            </Upload>
            <span className="w-72 sm-max:mt-2 mr-3 text-xs">1400/1/1 - 12:21’</span>
          </div>
        </div>

        <div className="px-52 lg-max:px-16 md-max:px-3 sm-max:!px-0 mt-20 mb-5 sm-max:mb-0 fixed bottom-0 left-0 w-full">
          <div className="relative flex items-center my-2 sm-max:mb-0 sm-max:p-0 ">
            <Textarea
              TextAreaClass="w-full bg-[#FFFFFF] sm-max:!overflow-y-scroll sm-max:!h-auto !h-12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600  rounded-md sm-max:rounded-none px-4 pl-28 py-3 sm-max:overflow-hidden md-max:pl-20 sm-max:!pl-20"
              Value={undefined}
              Placeholder="پیام خود را وارد کنید"
              onChange={() => {}}
            />
            <button
              type="button"
              className="inline-flex fixed left-52 xl-max:left-58 lg-max:left-16 md-max:left-20 sm-max:!left-2 sm-max:!bottom-1 bottom-8 z-50 items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <HiPaperAirplane className="h-6 w-6 transform -rotate-90" />
            </button>
          </div>
        </div>
        <Modal
          modalClass="!min-w-[30%] md-max:!min-w-[50%] sm-max:!min-w-[90%] !z-10"
          modalHeader={
            <div className="flex w-full flex-col justify-center items-center">
              <div className="w-20 h-20 bg-[#424242] ml-3 rounded-full"></div>
              <div className="flex justify-center flex-col items-center mt-3">
                <p lang="fa" role="text" className="text-xl text-center font-bold text-textColor ">
                  نام فروشگاه
                </p>
                <p lang="fa" role="text" className="text-md text-center mt-2  font-normal text-textColor">
                  نام مالک فروشگاه
                </p>
                <p lang="fa" role="text" className="text-sm mt-3 text-center  font-normal text-textColor">
                  تاریخ اولین پیام: <span>1400/00/00</span>{" "}
                </p>
              </div>
            </div>
          }
          modalHeaderClass="mt-3 mb-0 pb-0"
          modalBody={
            <div>
              <div className="w-11/12 px-3 h-[1px] bg-[#ECEFF1] mb-3"></div>
              <Select
                // value={InputKind === "" ? null : InputKind}
                placeholder="تعیین وضیعت تیکت"
                className="!z-50 block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-2 h-10"
                onChange={(value) => {}}
                options={[
                  {
                    text: "در انتظار پاسخ",
                    value: "در انتظار پاسخ",
                  },
                  {
                    text: "پاسخ داده شده",
                    value: "پاسخ داده شده",
                  },
                  {
                    text: "پاسخ داده شده در حال بررسی",
                    value: "پاسخ داده شده در حال بررسی",
                  },
                  {
                    text: "در حال بررسی",
                    value: "در حال بررسی",
                  },
                  {
                    text: "ارجاع به واحد مربوطه",
                    value: "ارجاع به واحد مربوطه",
                  },
                  {
                    text: "بسته شد",
                    value: "بسته شد",
                  },
                ]}
              />

              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal px-1 my-4 mt-3 flex flex-row justify-between">
                مجوز پاسخ فروشگاه:
                <Switch defaultChecked size="default" onChange={() => {}} />
              </p>

              <div className="w-full h-[1px] bg-[#ECEFF1] my-3"></div>
            </div>
          }
          modalFooterClass="flex justify-between items-center -mt-3"
          modalFooter={
            <div className="w-full flex flex-col justify-center">
              <ButtonComponent
                onClick={showModalHandlerDeleteTeket}
                ButtonClass="bg-[#E53935] w-full text-xs font-bold h-11 flex items-center justify-center"
              >
                <p lang="fa" role="text" className="flex flex-row justify-center items-center p-2">
                  حذف تیکت
                  <HiXMark className="mr-2" />
                </p>
              </ButtonComponent>
              <Button
                onClick={ModalHandler}
                type="link"
                className="flex items-center justify-center mx-auto"
                icon={
                  <HiOutlineArrowCircleRight
                    className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                  />
                }
              >
                <span className="text-sm text-textColor font-medium">
                  برگشت{" "}
                </span>
              </Button>
              <Modal
                modalHeader={<></>}
                modalClass="!min-w-[25%] p-0"
                modalBody={
                  <div className="flex flex-col  justify-center">
                    <p lang="fa" role="text" className="font-semibold text-xl text-center sm-max:text-lg text-[#212121] mb-1">
                      آیا از حذف این تیکت اطمینان دارید؟{" "}
                    </p>
                  </div>
                }
                modalHeaderClass="h-0 p-1"
                modalFooter={
                  <div className="flex flex-col items-center justify-center">
                    <ButtonComponent
                      onClick={() => {
                        showModalHandlerDeleteTeket();
                        ModalHandler();
                      }}
                      children="حذف"
                      ButtonClass="bg-[#B71C1C] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                    />
                  </div>
                }
                modalFooterClass="flex pt-0 mt-0 justify-center items-center"
                Open={ModalHandlerDeleteTeket}
                HandleOpen={showModalHandlerDeleteTeket}
              />
            </div>
          }
          Open={Modalstate}
          HandleOpen={ModalHandler}
        />
      </div>
    </div>
  );
};

export default ViewTicketAdmin;
