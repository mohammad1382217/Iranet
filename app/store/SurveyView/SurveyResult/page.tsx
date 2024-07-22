import React from "react";
import successfullPayment from "../../../assets/images/SuccessfullPayment.svg";
import LazyImage from "../../../components/LazyImage";

const SurveyResult: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 p-6">
      <LazyImage className="bg-cover" src={successfullPayment} alt="" width={10} height={10} />
      <h1 className="text-green-500 text-3xl font-bold text-center">
        نظرسنجی با موفقیت انجام شد
      </h1>
      <p lang="fa" role="text" className="text-gray-600">با تشکر از مشارکت شما</p>
    </div>
  );
};

export default SurveyResult;
