import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi";
import {
  appSlice,
  selectAccordionOpen,
  useDispatch,
  useSelector,
} from "../../lib/redux";

const Icon: React.FC<IconProps> = ({ id, open }) => {
  return (
    <HiChevronDown
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform absolute top-4`}
    />
  );
};

export const AccordionCustomIcon: React.FC<AccordionCustomIconProps> = ({
  headerTitle,
  Id,
  children,
}) => {
  const dispatch = useDispatch();
  const accordionOpen = useSelector(selectAccordionOpen);

  const handleOpen = (value: number) =>
    dispatch(
      appSlice.actions.setAccordionOpen(accordionOpen === value ? 0 : value)
    );

  return (
    <Accordion
      className="mb-2 rounded-lg relative"
      open={accordionOpen === Id}
      icon={<Icon id={Id} open={accordionOpen} />}
    >
      <AccordionHeader
        className="text-base font-bold text-[#212121] !border-0 bg-[#FAFAFA] h-12 rounded-lg p-3 w-full justify-between"
        onClick={() => handleOpen(Id)}
      >
        {headerTitle}
      </AccordionHeader>
      <AccordionBody className="flex items-center justify-center mx-auto w-full pt-0 text-base font-normal">
        {children}
      </AccordionBody>
    </Accordion>
  );
};

// Types
interface IconProps {
  id: number;
  open: number;
}
interface AccordionCustomIconProps {
  headerTitle: string;
  Id: number;
  children: React.ReactNode;
}
