import React from "react";
import PropTypes from "prop-types";
import type { handler } from "@material-tailwind/react/types/components/dialog";
import Dialog from "@material-tailwind/react/components/Dialog/index";
import DialogHeader from "@material-tailwind/react/components/Dialog/DialogHeader";
import DialogBody from "@material-tailwind/react/components/Dialog/DialogBody";
import DialogFooter from "@material-tailwind/react/components/Dialog/DialogFooter";

export interface ModalType {
  modalHeader: React.ReactNode;
  modalBody: React.ReactNode;
  modalFooter: React.ReactNode;
  disabledDefault?: boolean;
  modalHeaderClass?: string;
  modalBodyClass?: string;
  modalFooterClass?: string;
  modalClass?: string;
  Open: boolean;
  HandleOpen: handler;
}

const Modal: React.FC<ModalType> = ({
  modalHeader,
  modalBody,
  modalFooter,
  modalHeaderClass,
  modalBodyClass,
  modalFooterClass,
  disabledDefault,
  modalClass,
  Open,
  HandleOpen,
}) => {
  return (
    <Dialog
      open={Open}
      handler={HandleOpen}
      className={`${
        disabledDefault
          ? ""
          : "!w-auto sm-max:!w-[90%]  !mx-auto !max-w-sm !min-w-[40%]"
      } ${modalClass}`}
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
};
