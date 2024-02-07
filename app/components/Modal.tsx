import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { handler } from "@material-tailwind/react/types/components/dialog";

export interface ModalType {
  modalHeader?: React.ReactNode;
  modalBody: React.ReactNode;
  modalFooter?: React.ReactNode;
  modalHeaderClass?: string;
  modalBodyClass?: string;
  modalFooterClass?: string;
  modalClass?: string;
  Open : boolean,
  HandleOpen : handler,
}

const Modal: React.FC<ModalType> = ({
  modalHeader,
  modalBody,
  modalFooter,
  modalHeaderClass,
  modalBodyClass,
  modalFooterClass,
  modalClass,
  Open,
  HandleOpen,
}) => {
  return (
    <Dialog
      open={Open}
      handler={HandleOpen}
      className={`!w-auto sm:!w-[90%] !mx-auto !max-w-sm !min-w-[40%] ${modalClass}`}
    >
      <DialogHeader className={modalHeaderClass}>{modalHeader}</DialogHeader>
      <DialogBody className={modalBodyClass}>{modalBody}</DialogBody>
      <DialogFooter className={modalFooterClass}>{modalFooter}</DialogFooter>
    </Dialog>
  );
};

export default Modal;

Modal.propTypes = {
  Open: PropTypes.bool.isRequired,
  HandleOpen: PropTypes.func.isRequired,
}