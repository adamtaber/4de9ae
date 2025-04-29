import { X } from "lucide-react";
import { ReactNode } from "react";

type Modal = {
  children: ReactNode;
  closeModal: () => void;
  formModalOpen: boolean;
  title: string;
};

const Modal = ({ children, closeModal, formModalOpen, title }: Modal) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      {formModalOpen && (
        <div
          className={
            "fixed z-50 flex h-full w-full items-center justify-center backdrop-blur-sm"
          }
          onClick={handleBackgroundClick}
        >
          <div
            className={
              "h-128 w-150 rounded-lg border border-gray-400 bg-white p-4"
            }
          >
            <div className={"flex justify-between"}>
              {title}
              <X className={"cursor-pointer"} onClick={closeModal} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
