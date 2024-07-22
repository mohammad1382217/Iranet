// import React from "react";
// import { FaPlus } from "react-icons/fa";
// import { LuSend } from "react-icons/lu";
// import { FaMinus } from "react-icons/fa";
// import { FaCheck } from "react-icons/fa6";
// import { LuBarChart2 } from "react-icons/lu";
// import { LuLayoutGrid } from "react-icons/lu";
// import { FaRegTrashAlt } from "react-icons/fa";
// const Tag = React.lazy(() => import("antd/es/tag/index"));
// const Button = React.lazy(() => import( "antd/es/button/index"));
// const Input = React.lazy(() => import( "antd/es/input/index"));
// const Textarea = React.lazy(() => import( "../../../../../components/TextArea"));
// import { FaRegCircleXmark } from "react-icons/fa6";
// import Modal from "../../../../../components/Modal";
// import { useNavigate, useParams } from "react-router-dom";
// import ButtonComponent from "../../../../../components/Button";
// import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
// import "../../../../../components/TableInputNote/TableInputNote.scss";
// import CustomTable, { CustomColumnType } from "../../../../../components/Table";
// import {
//   useSelector,
//   useDispatch,
//   appSlice,
//   selectShowModals,
// } from "./../../../../../../lib/redux";
// import { HiOutlineArrowCircleRight } from "react-icons/hi";

// export const dataTable = [
//   {
//     key: "1",
//     date: "1401/01/01",
//     hour: "12:21’",
//   },
//   {
//     key: "2",
//     date: "1401/01/01",
//     hour: "12:21’",
//   },
//   {
//     key: "3",
//     date: "1401/01/01",
//     hour: "12:21’",
//   },
//   {
//     key: "4",
//     date: "1401/01/01",
//     hour: "12:21’",
//   },
// ];

// const columns_UsersEntery: CustomColumnType<DataType>[] = [
//   {
//     title: "ردیف",
//     dataIndex: "key",
//     key: "key",
//     align: "center",
    
//   },
//   {
//     title: "تاریخ",
//     dataIndex: "date",
//     key: "date",
//     align: "center",
//   },
//   {
//     title: "ساعت",
//     dataIndex: "hour",
//     align: "center",
//     key: "hour",
//   },
// ];

// const ViewUser: React.FC = () => {
//   const [ModalHistory, setModalHistory] = React.useState(false);
//   const [ModalDataUser, setModalDataUser] = React.useState(false);
//   const [ModalDecrease, setModalDecrease] = React.useState(false);
//   const [ModalCrease, setModalCrease] = React.useState(false);
//   const ModalHandlerHistory = () => setModalHistory(!ModalHistory);
//   const ModalHandlerDataUser = () => setModalDataUser(!ModalDataUser);
//   const ModalHandlerDecrease = () => setModalDecrease(!ModalDecrease);
//   const ModalHandlerCrease = () => setModalCrease(!ModalCrease);
//   const navigate = useNavigate();
//   let { idUser } = useParams();
//   const dispatch = useDispatch();
//   const showModals = useSelector(selectShowModals);

//   const columns_UsersSend: CustomColumnType<DataType>[] = [
//     {
//       title: "ردیف",
//       dataIndex: "key",
//       key: "key",
//       align: "center",
//     },
//     {
//       title: "تاریخ و ساعت ارسال",
//       dataIndex: "date",
//       key: "date",
//       align: "center",
//     },
//     {
//       title: "ارسال با..",
//       dataIndex: "hour",
//       align: "center",
//       key: "hour",
//     },
//     {
//       title: "هزینه",
//       dataIndex: "key",
//       key: "key",
//       align: "center",
//     },
//     {
//       title: "جزئیات بیشتر",
//       dataIndex: "date",
//       key: "date",
//       align: "center",
//       render: (_: string, record: DataType) => (
//         // <Link to={`/admin/UserManagement/viewUser/${record.key}`}>
//         <p lang="fa" role="text"
//           onClick={() => {
//             dispatch(appSlice.actions.setShowModals("showModalOrigin"));
//           }}
//           className="text-[#1890FF] cursor-pointer"
//         >
//           مشاهده
//         </p>
//         // </Link>
//       ),
//     },
//   ];

//   return (
//     <div className="container flex flex-col items-center justify-center p-10 sm-max:p-5 sm-max:gap-2 gap-10">
//       <section className="container flex sm-max:flex-col rounded-lg items-center justify-between p-3 bg-gray-50 ">
//         <div className="container flex flex-row sm-max:justify-around items-center p-3">
//           <div className="w-28 h-28 bg-[#424242] ml-3 rounded-md"></div>
//           <div className="flex justify-around h-32 flex-col items-start">
//             <p lang="fa" role="text" className="text-2xl xl-max:text-xl sm-max:text-base font-bold text-textColor flex justify-center items-center sm-max:flex-row">
//               نام فروشگاه
//               <Tag color="#43A047" className="mr-1">
//                 کاربر فعال
//               </Tag>
//             </p>
//             <p lang="fa" role="text" className="text-md mt-1 font-normal text-textColor">
//               نام مالک فروشگاه
//             </p>
//             <Button
//               onClick={ModalHandlerDataUser}
//               type="link"
//               className="p-0 !text-[#0081E8] font-bold text-sm"
//             >
//               نمایش اطلاعات کاربر
//             </Button>
//           </div>
//         </div>
//         <div className="flex flex-col sm-max:mt-4 px-3 sm-max:flex-row">
//           <ButtonComponent
//             Type="submit"
//             onClick={() => {}}
//             ButtonClass="!w-[140px] sm-max:!w-[120px] !h-[38px] sm-max:ml-3 border-[#EF6C00] border-[1px] bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center gap-2"
//           >
//             <FaRegCircleXmark color="#EF6C00" />
//             <span className="text-black text-[12px] sm-max:text-[10px] font-bold">
//               غیر فعال کردن کاربر
//             </span>
//           </ButtonComponent>
//           <ButtonComponent
//             onClick={() => {}}
//             ButtonClass="!w-[140px] sm-max:!w-[120px] !h-[38px] sm-max:mt-0 mt-3 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#E53935] gap-2"
//           >
//             <FaRegTrashAlt color="#FFFFFF" />
//             <span className="text-[12px] font-bold">حذف کاربر</span>
//           </ButtonComponent>
//         </div>
//       </section>
//       <section className="container flex-start items-start flex xl-max:flex-col rounded-lg md-max:items-center justify-between gap-10">
//         <div className="w-[calc(50%-1.25rem)] xl-max:container flex flex-col items-center justify-center gap-5">
//           <div className="flex items-center justify-between container bg-gray-50 p-3 rounded-lg ">
//             <div className="flex gap-4 text-lg font-medium sm-max:text-sm text-textColor 2xl-max:flex-col 3xl-max:flex-row">
//               <p lang="fa" role="text" className="w-max">تاریخچۀ ارسال های اخیر</p>
//               <Tag
//                 color="#2196F3"
//                 className="flex items-center justify-center text-center w-max text-xs font-bold lg-max:hidden"
//               >
//                 آخرین ارسال: ‘12:21 - 1401/01/01
//               </Tag>
//             </div>
//             <div className="flex justify-center flex-row-reverse items-center">
//               <ButtonComponent
//                 size="sm"
//                 onClick={ModalHandlerHistory}
//                 ButtonClass="bg-primary w-max text-xs font-bold sm-max:p-3 h-9 flex justify-center items-center"
//               >
//                 نمایش همه
//               </ButtonComponent>
//             </div>
//           </div>
//           <div className="container rounded-lg">
//             <CustomTable
//               size="large"
//               bordered
//               dataSource={dataTable}
//               columns={columns_UsersSend}
//               theme="primary"
//             />
//           </div>
//         </div>
//         <div className="w-[calc(50%-1.25rem)] xl-max:container flex flex-col items-center justify-center gap-5">
//           <div className="flex items-center justify-between container bg-gray-50 p-3 rounded-lg">
//             <div className="flex gap-4 text-lg font-medium sm-max:text-sm text-textColor 2xl-max:flex-col 3xl-max:flex-row">
//               <p lang="fa" role="text" className="w-max">تاریخچۀ ورود و فعالیت</p>
//               <Tag
//                 color="#2196F3"
//                 className="flex items-center justify-center text-center w-max text-xs font-bold lg-max:hidden"
//               >
//                 آخرین لاگین: ‘12:21 - 1401/01/01
//               </Tag>
//             </div>
//             <div className="flex justify-center flex-row-reverse items-center">
//               <ButtonComponent
//                 size="sm"
//                 onClick={ModalHandlerHistory}
//                 ButtonClass="bg-primary w-max text-xs font-bold sm-max:p-3 h-9 flex justify-center items-center"
//               >
//                 نمایش همه
//               </ButtonComponent>
//             </div>
//           </div>
//           <div className="container rounded-lg">
//             <CustomTable
//               className="overflow-hidden"
//               size="large"
//               bordered
//               dataSource={dataTable}
//               columns={columns_UsersEntery}
//               theme="primary"
//             />
//           </div>
//         </div>
//       </section>
//       <section className="container sm-max:items-center flex md-max:flex-col justify-between items-start gap-5">
//         <div className="w-full  md-max:mb-3 md-max:ml-0 p-4 rounded-lg bg-gray-50 flex flex-col">
//           <p lang="fa" role="text" className="text-lg font-medium py-4 px-2 md-max:px-0">
//             اعتبار فعلی فروشگاه
//           </p>
//           <div className="flex flex-row-reverse  items-center justify-center sm-max:flex-col">
//             <ButtonComponent
//               onClick={ModalHandlerDecrease}
//               ButtonClass="!w-full md-max:w-[240px] sm-max:!w-full !h-[38px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#E53935] gap-2 md-max:w-[250px] mb-0 mr-2 md-max:mb-2 md-max:mr-2 ml-0 sm-max:!mr-0"
//             >
//               <span className="text-[12px] font-bold">کاهش اعتبار</span>
//               <FaMinus />
//             </ButtonComponent>
//             <Input
//               name={""}
//               className={
//                 "outline-0 bg-white h-10 border md-max: sm-max:order-first  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 mb-0 md-max:mb-2 md-max:mr-0 mr-2"
//               }
//               placeholder={"50.000 تومان"}
//               disabled={false}
//             />
//             <ButtonComponent
//               onClick={ModalHandlerCrease}
//               ButtonClass="!w-full md-max:w-[240px] sm-max:!w-full !h-[38px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#43A047] gap-2 md-max:w-[250px] mb-0 md-max:mb-2 md-max:ml-2 ml-0 sm-max:!ml-0"
//             >
//               <span className="text-[12px] font-bold">افزایش اعتبار</span>
//               <FaPlus />
//             </ButtonComponent>
//           </div>
//         </div>
//         <div className="w-full  md-max:mb-3 md-max:ml-0  p-4 rounded-lg bg-gray-50 flex flex-col">
//           <p lang="fa" role="text" className="text-lg lg-max:text-base md-max:!text-lg font-medium py-4 px-2 md-max:px-0">
//             تعرفۀ کاربر (معیار محاسبۀ قیمت پیامک)
//           </p>
//           <div className="flex  flex-row-reverse items-center justify-center">
//             <Input
//               disabled={false}
//               name={""}
//               className={
//                 "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 mr-2"
//               }
//               placeholder={"555 تومان"}
//             />
//             <ButtonComponent
//               onClick={() => {}}
//               ButtonClass="lg-max:!w-8/12 !w-6/12 !h-[38px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#43A047] gap-2 md-max:w-[200px] mb-0  md-max:ml-2 ml-2"
//             >
//               <span className="text-[12px] font-bold">ثبت تعرفه</span>
//               <FaCheck />
//             </ButtonComponent>
//           </div>
//         </div>
//       </section>

//       <section className="container flex sm-max:flex-col gap-4">
//         <div className="flex flex-row w-3/4 sm-max:w-full md-max:justify-between">
//           <ButtonComponent
//             onClick={() =>
//               navigate(
//                 `/admin/UserManagment/ViewListOfFinancialReport/${idUser}`
//               )
//             }
//             ButtonClass="w-2/4  !mr-0  sm-max:!w-full !h-[50px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
//           >
//             <LuBarChart2 color="#FFFFFF" size={16} />
//             <span className="text-base md-max:text-sm font-bold scroll-auto">
//               گزارشات مالی
//             </span>
//           </ButtonComponent>
//           <ButtonComponent
//             onClick={() =>
//               navigate(`/admin/UserManagment/ViewSendReport/${idUser}`)
//             }
//             ButtonClass="w-2/4 sm-max:!mr-2 !mr-2  sm-max:!w-full sm-max:mr-0 !h-[50px] mr-2 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
//           >
//             <LuSend color="#FFFFFF" size={16} />
//             <span className="text-base md-max:text-sm font-bold">
//               گزارشات ارسال
//             </span>
//           </ButtonComponent>
//         </div>
//         <ButtonComponent
//           onClick={() => {}}
//           ButtonClass="w-1/2 !mr-0 md-max:w-1/3 sm-max:!w-full sm-max:mr-0 !h-[50px] mr-2 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
//         >
//           <LuLayoutGrid color="#FFFFFF" size={16} />
//           <span className="text-base font-bold md-max:text-xs sm-max:!text-base">
//             ورود به پنل فروشگاه
//           </span>
//         </ButtonComponent>
//       </section>
//       <Modal
//         modalClass="!min-w-[70%]"
//         modalHeader={"40 ورود آخر کاربر به سامانه"}
//         modalHeaderClass="pb-0 pt-6"
//         modalBodyClass="py-6"
//         modalBody={
//           <div className="w-full">
//             <CustomTable
//               size="large"
//               bordered
//               dataSource={dataTable}
//               columns={columns_UsersEntery}
//               theme="primary"
//             />
//           </div>
//         }
//         modalFooterClass="flex justify-between items-center pt-0"
//         modalFooter={
//           <div className="container flex justify-center">
//             <ButtonComponent
//               onClick={() => ModalHandlerHistory()}
//               ButtonClass="bg-[#B71C1C]  text-xs font-bold h-11 flex items-center justify-center"
//             >
//               بازگشت
//             </ButtonComponent>
//           </div>
//         }
//         Open={ModalHistory}
//         HandleOpen={ModalHandlerHistory}
//       />
//       <Modal
//         modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
//         modalHeader={"کاهش اعتبار"}
//         modalHeaderClass="mt-3 mb-0 pb-0"
//         modalBody={
//           <div>
//             <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 -mt-3">
//               میزان کاهش اعتبار حساب فروشگاه را وارد کنید
//             </p>
//             <Input
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"میزان کاهش"}
//               disabled={false}
//             />
//           </div>
//         }
//         modalFooterClass="flex justify-between items-center -mt-3"
//         modalFooter={
//           <div className="w-full flex justify-center">
//             <ButtonComponent
//               onClick={() => ModalHandlerDecrease()}
//               ButtonClass="bg-primary text-xs font-bold h-11 flex items-center justify-center"
//             >
//               تایید
//             </ButtonComponent>
//           </div>
//         }
//         Open={ModalDecrease}
//         HandleOpen={ModalHandlerDecrease}
//       />
//       <Modal
//         modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
//         modalHeader={"افزایش اعتبار"}
//         modalHeaderClass="mt-3 mb-0 pb-0"
//         modalBody={
//           <div>
//             <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 -mt-3">
//               میزان کاهش اعتبار حساب فروشگاه را وارد کنید
//             </p>
//             <Input
//               disabled={false}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"میزان افزایش"}
//             />
//           </div>
//         }
//         modalFooterClass="flex justify-between items-center -mt-3"
//         modalFooter={
//           <div className="w-full flex justify-center">
//             <ButtonComponent
//               onClick={() => ModalHandlerCrease()}
//               children="تایید"
//               ButtonClass="bg-primary  text-xs font-bold h-11 flex items-center justify-center"
//             />
//           </div>
//         }
//         Open={ModalCrease}
//         HandleOpen={ModalHandlerCrease}
//       />
//       <Modal
//         modalClass="!min-w-[30%] sm-max:!min-w-[90%] h-[95vh] mb-2 overflow-y-scroll scroll-auto"
//         modalHeader={"اطلاعات فروشگاه"}
//         modalHeaderClass="mt-2"
//         modalBody={
//           <div className="space-y-3 ">
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"نام"}
//             />
//             <Input
//               disabled={true}
//               name={"نام خانوادگی"}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"نام خانوادگی"}
//             />
//             <Input
//               disabled={true}
//               name={"کد ملی"}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"کد ملی"}
//             />
//             <Input
//               disabled={true}
//               name={"تاریخ تولد"}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"تاریخ تولد"}
//             />
//             <Input
//               disabled={true}
//               name={"شماره تماس"}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"شماره تماس"}
//             />
//             <Input
//               disabled={true}
//               name={"تلفن محل کار"}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"تلفن محل کار"}
//             />
//             <Input
//               disabled={true}
//               name={"آدرس فروشگاه"}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"آدرس فروشگاه"}
//             />
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"کد پستی"}
//             />
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"صنف"}
//             />
//             <div className="w-full px-2 h-[1px] bg-[#ECEFF1]"></div>
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"گروه پیشفرض"}
//             />
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"گروه پیشفرض"}
//             />
//             <div className="w-full px-2 h-[1px] bg-[#ECEFF1]"></div>
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"لوگوی فروشگاه"}
//             />
//             <Input
//               disabled={true}
//               name={""}
//               // InputValue={input[0]}
//               className={
//                 "outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
//               }
//               placeholder={"فایل تبلیغاتی"}
//             />
//           </div>
//         }
//         modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
//         modalFooter={
//           <div className="w-full flex justify-center">
//             <Button
//               onClick={ModalHandlerDataUser}
//               // onClick={goback}
//               type="link"
//               className="flex items-center justify-center mx-auto"
//               icon={
//                 <ArrowRightCircleIcon
//                   color="#E53935"
//                   strokeWidth={2.5}
//                   className={"h-3.5 w-3.5 mx-auto"}
//                 />
//               }
//             >
//               <span className="text-sm text-textColor font-medium ">
//                 برگشت به نمایش کاربر
//               </span>
//             </Button>
//           </div>
//         }
//         Open={ModalDataUser}
//         HandleOpen={ModalHandlerDataUser}
//       />
//       <Modal
//         modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
//         modalHeader={"جزئیات ارسال پیامک"}
//         modalHeaderClass="mt-3 mb-0 pb-0"
//         modalBody={
//           <div>
//             <Textarea
//               TextAreaClass="p-3 mt-1"
//               // value={text}
//               onChange={() => {
//                 // dispatch(
//                 //   StoreManagementsSlice.actions.setConfirmation(confirmation)
//                 // );
//                 // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
//                 // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
//               }}
//               Placeholder="متن پیامک"
//             />
//             <div className="flex flex-row ">
//               <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3">
//                 تعداد کاراکتر ها:
//                 <Tag color="#2196F3" className="mr-3 rounded-lg ">
//                   {/* {text.length} */}0
//                 </Tag>
//               </p>
//               <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3 mr-3">
//                 تعداد پیامک:
//                 <Tag color="#2196F3" className="mr-3 rounded-lg ">
//                   3
//                 </Tag>
//               </p>
//             </div>
//             <Input
//               className="p-3 mt-1"
//               // value={text}
//               onChange={() => {
//                 // dispatch(
//                 //   StoreManagementsSlice.actions.setConfirmation(confirmation)
//                 // );
//                 // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
//                 // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
//               }}
//               placeholder="تعداد شماره ها"
//             />
//             <div className="flex flex-row ">
//               <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3">
//                 تعداد ارسال موفق:
//                 <Tag color="#43A047" className="mr-3 rounded-lg ">
//                   {/* {text.length} */}
//                   20
//                 </Tag>
//               </p>
//               <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3 mr-3">
//                 تعداد ارسال ناموفق:
//                 <Tag color="#E53935" className="mr-3 rounded-lg ">
//                   3
//                 </Tag>
//               </p>
//             </div>
//             <Input
//               className="p-3 mt-1"
//               // value={text}
//               onChange={() => {
//                 // dispatch(
//                 //   StoreManagementsSlice.actions.setConfirmation(confirmation)
//                 // );
//                 // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
//                 // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
//               }}
//               placeholder="نوع شمارۀ فرستنده"
//             />
//           </div>
//         }
//         modalFooterClass="flex justify-between items-center -mt-3"
//         modalFooter={
//           <div className="w-full flex flex-col justify-center">
//             <Button
//               onClick={() => {
//                 dispatch(appSlice.actions.setShowModals("showModalOrigin"));
//               }}
//               type="link"
//               className="flex items-center justify-center mx-auto"
//               icon={
//                 <HiOutlineArrowCircleRight
//                   className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
//                 />
//               }
//             >
//               <span className="text-sm text-textColor font-medium">
//                 برگشت به گزارش فعالیت{" "}
//               </span>
//             </Button>
//           </div>
//         }
//         Open={showModals.showModalOrigin}
//         HandleOpen={() => {
//           dispatch(appSlice.actions.setShowModals("showModalOrigin"));
//         }}
//       />
//     </div>
//   );
// };

// export default ViewUser;

// // Types
// interface DataType {
//   key: React.Key;
//   date: string;
//   hour: string;
// }
