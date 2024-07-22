import React, { Suspense } from "react";
import { HiChevronDown } from "react-icons/hi";

const Accordion = React.lazy(
  () => import("@material-tailwind/react/components/Accordion")
);
const AccordionHeader = React.lazy(
  () => import("@material-tailwind/react/components/Accordion/AccordionHeader")
);
const AccordionBody = React.lazy(
  () => import("@material-tailwind/react/components/Accordion/AccordionBody")
);

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

const AccordionCustomIcon: React.FC<AccordionCustomIconProps> = ({
  headerTitle,
  Id,
  children,
}) => {
  const dispatch = useDispatch();
  const accordionOpen = useSelector(selectAccordionOpen);

  const handleOpen = (id: number) => {
    dispatch(appSlice.actions.setAccordionOpen(accordionOpen === id ? 0 : id));
  };

  return (
    <Suspense fallback={<div>درحال بارگیری...</div>}>
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
    </Suspense>
  );
};

export default AccordionCustomIcon;

// Types
export interface IconProps {
  id: number;
  open: number;
}
interface AccordionCustomIconProps {
  headerTitle: React.ReactNode;
  Id: number;
  children: React.ReactNode;
}
