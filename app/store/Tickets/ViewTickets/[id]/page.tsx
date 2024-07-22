import React from "react";
import Upload from "antd/es/upload/Upload";
import type { UploadProps } from "antd/es/upload/interface";
import { Link, useParams } from "react-router-dom";
const Textarea = React.lazy(() => import( "../../../../components/TextArea"));
const ButtonComponent = React.lazy(() => import("../../../../components/Button"));
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";

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

const ViewTicket: React.FC = () => {
  const { idTicket } = useParams();
  console.log(idTicket);
  return (
    <div>
      <div className="w-full h-20 bg-[#FAFAFA] flex items-center justify-between p-4">
        <div className="flex flex-row sm-max:flex-col items-center justify-center">
          <p lang="fa" role="text" className="text-2xl font-semibold text-textColor">عنوان تیکت</p>
          <p lang="fa" role="text" className="text-sm font-medium text-textColor mr-4 sm-max:mr-0">
            کد شناسۀ تیکت
          </p>
        </div>
        <Link to="/store/tickets">
          <ButtonComponent
            children="صفحه تیکت ها"
            ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
          />
        </Link>
      </div>

      <div className=" px-52 lg-max:px-16 md-max:px-3 my-1 sm-max:!px-0 justify-between flex flex-col">
        <div
          id="messages"
          className="flex flex-col justify-end h-[75vh]   space-y-3 p-3 overflow-y-auto"
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
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-secondary text-textColor ">
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
              className="upload-list-inline flex !m-0 flex-col my-custom-upload"
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
      </div>
    </div>
  );
};

export default ViewTicket;