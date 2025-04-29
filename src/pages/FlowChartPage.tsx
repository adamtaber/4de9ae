import { useAtom, useAtomValue } from "jotai";
import Modal from "../components/Modal";
import {
  currentNodeAtom,
  formModalOpenAtom,
  nodesAtom,
} from "../state/flowChartState";
import FormModalContent from "../components/FormModalContent";
import FlowChart from "../components/FlowChart";

const FlowChartPage = () => {
  const [formModalOpen, setFormModalOpen] = useAtom(formModalOpenAtom);
  const currentNodeId = useAtomValue(currentNodeAtom);

  const nodes = useAtomValue(nodesAtom);
  const currentNode = nodes.find((node) => node?.id === currentNodeId);

  const closeModal = () => {
    setFormModalOpen(false);
  };

  return (
    <div className={"h-screen w-screen"}>
      <Modal
        closeModal={closeModal}
        formModalOpen={formModalOpen}
        title={`${currentNode?.data?.name} Prefill`}
      >
        {currentNodeId && (
          <FormModalContent currentNodeId={currentNodeId} nodes={nodes} />
        )}
      </Modal>
      <FlowChart />
    </div>
  );
};

export default FlowChartPage;
