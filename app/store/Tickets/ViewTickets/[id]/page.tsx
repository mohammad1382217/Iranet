import React from "react";
import { Upload } from "antd";
import { NavLink, useParams } from "react-router-dom";
import Button_component from "../../../../components/Button";
import TextArea from "../../../../components/TextArea";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import "../../../../globals.scss";
import { UploadFile } from "antd/es/upload/interface";
import type { UploadProps } from 'antd';

const fileList: UploadFile[] = [
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

const props: UploadProps = {
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: "1",
      name: "yyy.png",
      status: "done",
      // url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    }
  ],
  // iconRender: <button onClick={(e) => console.log(e, 'custom removeIcon event')} />,
  showUploadList: {
    showPreviewIcon: true,
    // showDownloadIcon: true,
    // downloadIcon: <p>ali</p>,
    previewIcon:<p>ali</p>,
    // removeIcon: <button onClick={(e)=>{e.preventDefault}} >ali</button>,
  },
};
const ViewTicket : React.FC = () => {
  let { idTicket } = useParams();
  console.log(idTicket);
  return (
    <div>
      <div className="w-full h-20 bg-[#FAFAFA] flex items-center justify-between p-4">
        <div className="flex flex-row sm:flex-col items-center justify-center">
          <p className="text-2xl font-semibold text-[#151515]">عنوان تیکت</p>
          <p className="text-sm font-medium text-[#151515] mr-4 sm:mr-0">
            کد شناسۀ تیکت
          </p>
        </div>
        <NavLink to="/store/tickets">
          <Button_component
            children="صفحه تیکت ها"
            ButtonClass="bg-[#2DCEA2] text-xs font-bold h-11 flex justify-center items-center"
          />
        </NavLink>
      </div>

      <div className=" px-52 lg:px-16 md:px-3 sm:!px-0 justify-between flex flex-col">
        <div
          id="messages"
          className="flex flex-col justify-end h-[75vh]   space-y-3 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div className="flex flex-end items-end flex-row-reverse sm:flex-col">
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#ECEFF1]  text-[#151515]">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است
                  </span>
                  <span className="w-72 sm:mt-2">1400/1/1 - 12:21’</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div className="flex flex-end items-end flex-row-reverse sm:flex-col-reverse">
                  <span className="w-72 sm:mt-2 mr-3 sm:mr-0">
                    1400/1/1 - 12:21’
                  </span>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#2DCEA2] text-[#151515] ">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-end mb-3">
         
            <Upload
              {...props}
            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            // defaultFileList={[...fileList]}
              className="upload-list-inline flex !m-0 flex-col my-custom-upload"
            >
          
           
            <button
              type="button"
              className="inline-flex fixed left-60 lg:left-24 md:left-22 sm:!left-14 sm:!bottom-4 bottom-8 z-50 items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <HiOutlinePaperClip className="h-6 w-6 text-gray-600" />
              </button>
            </Upload>
            <span className="w-72 sm:mt-2 mr-3 text-xs">
                    1400/1/1 - 12:21’
                  </span>
          </div>
        </div>

        <div className="px-52 lg:px-16 md:px-3 sm:!px-0 mt-20 mb-5 sm:mb-0 fixed bottom-0 left-0 w-full">
          <div className="relative flex items-center my-2 sm:mb-0 sm:p-3">
            <TextArea
              TextAreaClass="w-full bg-[#FFFFFF] !h-12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600  rounded-md px-4 pl-28 py-3 sm:overflow-hidden md:pl-20 sm:!pl-20"
              Value={undefined}
              Placeholder="پیام خود را وارد کنید"
              onChange={() => {}}
            />
            <button
              type="button"
              className="inline-flex fixed left-52 xl:left-58 lg:left-16 md:left-20 sm:!left-4 sm:!bottom-4 bottom-8 z-50 items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
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