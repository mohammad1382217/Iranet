import React from "react";
import { HiChevronDown } from "react-icons/hi";

const Select: React.FC<selectProps> = ({
    options,
    Selectclass,
    SelectName,
    SelectRef,
    SelectOnChange,
    DefaultValue,
    oneOptionText,
}) => {
    return (
        <div className="relative cursor-pointer w-full inline-flex items-center">
            <select
                className={Selectclass}
                name={SelectName}
                ref={SelectRef}
                onChange={SelectOnChange}
                defaultValue={DefaultValue}
            >
                <option value="" disabled>{oneOptionText}</option>
                {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
            </select>
            <div className="w-0">
                <HiChevronDown className="relative left-8 w-5 h-5 cursor-pointer text-gray-600" />
            </div>
        </div>
    );
};

export default Select;

// Types
export interface selectProps {
    options: string[],
    Selectclass: string,
    SelectName: string,
    SelectRef?: React.Ref<HTMLSelectElement>,
    SelectOnChange: React.ChangeEventHandler<HTMLSelectElement>,
    DefaultValue?: string,
    oneOptionText: string
}