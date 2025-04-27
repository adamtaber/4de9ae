import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import {
  currentNodeAtom,
  formModalOpenAtom,
  nodesAtom,
} from "../state/flowChartState";
import { X } from "lucide-react";

const FormModal = () => {
  const [formModalOpen, setFormModalOpen] = useAtom(formModalOpenAtom);
  const currentNodeId = useAtomValue(currentNodeAtom);
  const nodes = useAtomValue(nodesAtom);
  const currentNode = nodes.find((node) => node?.id === currentNodeId);

  const closeModal = () => {
    setFormModalOpen(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div
      className={clsx(
        "fixed z-50 flex h-full w-full items-center justify-center backdrop-blur-sm",
        !formModalOpen && "hidden",
      )}
      onClick={handleBackgroundClick}
    >
      <div
        className={"h-128 w-128 rounded-lg border border-gray-400 bg-white p-4"}
      >
        <div className={"flex justify-between"}>
          {`${currentNode?.data?.name} Prefill`}
          <X className={"cursor-pointer"} onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default FormModal;
