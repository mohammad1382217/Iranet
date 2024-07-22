import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../../../api/apiConfig";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import { fetchUsersViewTicket } from "../../../../../../lib/redux/slices/ticketsSlice/fetchUsersviewTicket";
import message from "antd/es/message/index";
import Upload from "antd/es/upload/Upload";
import { UploadFile } from "antd/lib";
import {
  selectStatusTicketsDataUsers,
  selectviewTicketsUsersChat,
  useDispatch,
  useSelector
} from "../../../../../../lib/redux";

const Spin = React.lazy(() => import("antd/es/spin/index"));
const Textarea = React.lazy(() => import("../../../../../components/TextArea"));
const ButtonComponent = React.lazy(
  () => import("../../../../../components/Button")
);
export const maxFileSize = 5 * 1024 * 1024;

const ViewTicketUsers: React.FC = () => {
  const { idTicket } = useParams();
  // console.log(idTicket);
  const status = useSelector(selectStatusTicketsDataUsers);
  const dispatch = useDispatch();
  const ChatData = useSelector(selectviewTicketsUsersChat);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [textMessage, setTextMessage] = React.useState<String>("");
  let Id = localStorage.getItem("id");
  React.useEffect(() => {
    if (idTicket) {
      dispatch(fetchUsersViewTicket(idTicket));
    }
  }, [dispatch]);
  const [loading, setloading] = React.useState(false);

  const SendMessageHandler = () => {
    const formData = new FormData();
    console.log(textMessage);
    if (textMessage !== "") {
      formData.append("message", textMessage as any);
      console.log(fileList);

      fileList.forEach((file, index) => {
        formData.append(`file${index + 1}`, file as any);
      });
      const handlePostMessage = async () => {
        try {
          setloading(true);
          const response = await axiosInstance.post(
            `/api/ticket/${idTicket}/message/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          if (response.data.detail === "ok") {
            // showModalSeccessFullyAuthenticationHandler();
            message.success("پیام با موفقیت ارسال شد .");
            setFileList([]);
            setTextMessage("");
            if (idTicket) {
              dispatch(fetchUsersViewTicket(idTicket));
            }
          } else {
            message.error("مشکلی در ارسال بوجود آمد لطفا مجدد تلاش کنید !");
          }
          setloading(false);
        } catch (error: any) {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            console.error("Error fetching data:", error);
          }
        }
      };
      handlePostMessage();
    } else {
      message.error("متن نباید خالی باشد");
    }
  };
  return (
    <Spin spinning={status === "loading" ? true : false || loading}>
      <header className="w-full h-20 bg-[#FAFAFA] flex items-center justify-between p-4 fixed top-0 z-50">
        <div className="flex flex-row sm-max:flex-col items-center justify-center">
          <p
            lang="fa"
            role="text"
            className="text-2xl font-semibold text-textColor"
          >
            {ChatData.title}
          </p>
          <p
            lang="fa"
            role="text"
            className="text-sm font-medium text-textColor mr-4 sm-max:mr-0"
          >
            {ChatData.code}
          </p>
        </div>
        <Link to="/users/Tickets">
          <ButtonComponent
            children="صفحه تیکت ها"
            ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          />
        </Link>
      </header>

      <div className="px-52 lg-max:px-16 md-max:px-3 my-1 sm-max:!px-0 justify-between flex flex-col">
        <div
          id="messages"
          className="flex flex-col justify-end overflow-y-auto space-y-3 p-3 pb-12"
        >
          <div className="chat-message mt-20">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div className="flex flex-end items-end flex-row-reverse sm-max:flex-col">
                  <span className="px-4 py-2 w-full rounded-lg inline-block rounded-bl-none bg-[#ECEFF1]  text-textColor">
                    {ChatData.description}
                  </span>
                  {/* <span className="w-72 sm-max:mt-2">
                    {ChatData.created_at}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          {ChatData.file1 == null ? null : (
            <div className="chat-message-file chat-message-file-user flex-row-reverse flex justify-start items-end mx-2 sm-max:flex-col sm-max:items-start">
              <Upload
                defaultFileList={[
                  {
                    uid: "-1",
                    name: ChatData.file1.split("file/")[1],
                    status: "done",
                    url: ChatData.file1,
                  },
                ]}
                listType="picture"
                className=" p-0 flex !m-0 flex-row-reverse"
              ></Upload>
              {/* <span className=" sm-max:mt-2 ml-3 text-xs">
                1400/1/1 - 12:21’
              </span> */}
            </div>
          )}
          {ChatData.file2 == null ? null : (
            <div className="chat-message-file chat-message-file-user flex-row-reverse flex justify-start items-end mx-2 sm-max:flex-col sm-max:items-start">
              <Upload
                defaultFileList={[
                  {
                    uid: "10",
                    name: ChatData.file2.split("file/")[1],
                    status: "done",
                    url: ChatData.file2,
                  },
                ]}
                listType="picture"
                className=" p-0 flex !m-0 flex-row-reverse"
              ></Upload>
              {/* <span className=" sm-max:mt-2 ml-3 text-xs">
                1400/1/1 - 12:21’
              </span> */}
            </div>
          )}
          {ChatData.file3 == null ? null : (
            <div className="chat-message-file chat-message-file-user flex-row-reverse flex justify-start items-end mx-2 sm-max:flex-col sm-max:items-start">
              <Upload
                defaultFileList={[
                  {
                    uid: "1",
                    name: ChatData.file3.split("file/")[1],
                    status: "done",
                    url: ChatData.file3,
                  },
                ]}
                listType="picture"
                className=" p-0 flex !m-0 flex-row-reverse"
              ></Upload>
              {/* <span className=" sm-max:mt-2 ml-3 text-xs">
                1400/1/1 - 12:21’
              </span> */}
            </div>
          )}
          {ChatData.ticket_messages.map((element, index) => {
            if (Id) {
              if (element.sender === parseInt(Id)) {
                return (
                  <div key={index + 10}>
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div className="flex flex-end items-end flex-row-reverse sm-max:flex-col">
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#ECEFF1]  text-textColor">
                              {element.message}
                            </span>
                            {/* <span className="w-72 sm-max:mt-2">
                              {element.sender === parseInt(Id) ? "slam" : "goo"}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {element.file1 === null ? null : (
                      <div className="chat-message-file chat-message-file-user flex-row-reverse flex justify-start items-end mx-2 sm-max:flex-col sm-max:items-start">
                        <Upload
                          defaultFileList={[
                            {
                              uid: "1",
                              name: element.file1.split("file/")[1],
                              status: "done",
                              url: element.file1,
                            },
                          ]}
                          listType="picture"
                          className=" p-0 flex !m-0 flex-row-reverse"
                        ></Upload>
                      </div>
                    )}
                    {element.file2 === null ? null : (
                      <div className="chat-message-file chat-message-file-user flex-row-reverse flex justify-start items-end mx-2 sm-max:flex-col sm-max:items-start">
                        <Upload
                          defaultFileList={[
                            {
                              uid: "1",
                              name: element.file2.split("file/")[1],
                              status: "done",
                              url: element.file2,
                            },
                          ]}
                          listType="picture"
                          className=" p-0 flex !m-0 flex-row-reverse"
                        ></Upload>
                      </div>
                    )}
                    {element.file3 === null ? null : (
                      <div className="chat-message-file chat-message-file-user flex-row-reverse flex justify-start items-end mx-2 sm-max:flex-col sm-max:items-start">
                        <Upload
                          defaultFileList={[
                            {
                              uid: "1",
                              name: element.file3.split("file/")[1],
                              status: "done",
                              url: element.file3,
                            },
                          ]}
                          listType="picture"
                          className=" p-0 flex !m-0 flex-row-reverse"
                        ></Upload>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                          <div className="flex flex-end items-end flex-row-reverse sm-max:flex-col-reverse">
                            {/* <span className="w-72 sm-max:mt-2 mr-3 sm-max:mr-0">
                            {element.created_at}
                          </span> */}
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-secondary text-textColor ">
                              {element.message}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {element.file1 == null ? null : (
                      <div className="chat-message-file flex justify-start items-end !mb-3 !mt-1 mx-2 sm-max:flex-col sm-max:items-start">
                        <Upload
                          defaultFileList={[
                            {
                              uid: "1",
                              name: element.file1.split("file/")[1],
                              status: "done",
                              url: element.file1,
                            },
                          ]}
                          listType="picture"
                          className="upload-list-inline flex !m-0 flex-col my-custom-upload"
                        ></Upload>
                        {/* <span className=" sm-max:mt-2 mr-3 text-xs">
                        {element.created_at}
                      </span> */}
                      </div>
                    )}
                    {element.file2 == null ? null : (
                      <div className="chat-message-file flex justify-start items-end !mb-3 !mt-1 mx-2 sm-max:flex-col sm-max:items-start">
                        <Upload
                          defaultFileList={[
                            {
                              uid: "1",
                              name: element.file2.split("file/")[1],
                              status: "done",
                              url: element.file2,
                            },
                          ]}
                          listType="picture"
                          className="upload-list-inline flex !m-0 flex-col my-custom-upload"
                        ></Upload>
                        {/* <span className=" sm-max:mt-2 mr-3 text-xs">
                        {element.created_at}
                      </span> */}
                      </div>
                    )}
                    {element.file3 == null ? null : (
                      <div className="chat-message-file flex justify-start items-end !mb-3 !mt-1 mx-2 sm-max:flex-col sm-max:items-start">
                        <Upload
                          defaultFileList={[
                            {
                              uid: "1",
                              name: element.file3.split("/file/")[1],
                              status: "done",
                              url: element.file3,
                            },
                          ]}
                          listType="picture"
                          className="upload-list-inline flex !m-0 flex-col my-custom-upload"
                        ></Upload>
                        {/* <span className=" sm-max:mt-2 mr-3 text-xs">
                        {element.created_at}
                      </span> */}
                      </div>
                    )}
                  </div>
                );
              }
            }
          })}

          {/* <div className="chat-message-file flex justify-start items-end !mb-3 !mt-1 mx-2 sm-max:flex-col sm-max:items-start">
            <Upload
              defaultFileList={[
                {
                  uid: "1",
                  name: "yyy.png",
                  status: "done",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                },
              ]}
              listType="picture"
              className="upload-list-inline flex !m-0 flex-col my-custom-upload"
            ></Upload>
            <span className=" sm-max:mt-2 mr-3 text-xs">1400/1/1 - 12:21’</span>
          </div> */}

          <Upload
            listType="picture"
            showUploadList={false}
            className="upload-list-inline flex !m-0 flex-col my-custom-upload"
            fileList={fileList}
            maxCount={3}
            beforeUpload={(file) => {
              if (fileList.length >= 3) {
                message.error("شما مجاز به بارگذاری سه فایل هستید");
              } else if (file.size > maxFileSize) {
                message.error("حداکثر حجم مجاز 5 مگابایت می باشد.");
              } else {
                setFileList([...fileList, file]);
                message.success(
                  `فایل ${file.name} با موفقیت انتخاب شد لطفا آن را ارسال کنید`
                );
              }
              return false;
            }}
           
          >
            <button
              type="button"
              className="inline-flex fixed ml-1 left-60 lg-max:left-24 md-max:!left-14 sm-max:!!left-12 sm-max:!bottom-1 bottom-3  z-50 items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <HiOutlinePaperClip className="h-6 w-6 text-gray-600" />
            </button>
          </Upload>
        </div>
      </div>
      <div className="px-52 lg-max:px-16 md-max:px-3 sm-max:!px-0 mt-20 mb-0 bg-[#FFFFFF] sm-max:mb-0 fixed bottom-0 left-0 w-full">
        <div className="relative flex items-center my-2 sm-max:mb-0 sm-max:p-0 ">
          <Textarea
            TextAreaClass="w-full bg-[#FFFFFF] sm-max:!overflow-y-scroll sm-max:!h-auto !h-12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600  rounded-md sm-max:rounded-none px-4 pl-28 py-3 sm-max:overflow-hidden md-max:pl-20 sm-max:!pl-20"
            Value={textMessage as string}
            Placeholder="پیام خود را وارد کنید"
            onChange={(e) => {
              setTextMessage(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={SendMessageHandler}
            className="inline-flex fixed left-52 ml-1 xl-max:left-58 lg-max:left-16 md-max:left-5 sm-max:!left-2 sm-max:!bottom-1 bottom-3 z-50 items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <HiPaperAirplane className="h-6 w-6 transform -rotate-90" />
          </button>
        </div>
      </div>
    </Spin>
  );
};

export default ViewTicketUsers;
