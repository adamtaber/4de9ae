import { Handle, Position } from "@xyflow/react";
import { TableProperties } from "lucide-react";
import { NodeData } from "../types/BlueprintGraphTypes";
import { capitalizeString } from "../utils/helperFunctions";
import { useSetAtom } from "jotai";
import { currentNodeAtom, formModalOpenAtom } from "../state/flowChartState";

const FormNode = ({ data, id }: { data: NodeData; id: string }) => {
  const setFormModalOpen = useSetAtom(formModalOpenAtom);
  const setCurrentNode = useSetAtom(currentNodeAtom);

  const nodeType = capitalizeString(data?.component_type);
  const nodeName = data?.name;

  const handleClick = () => {
    setFormModalOpen(true);
    setCurrentNode(id);
  };

  return (
    <div
      role="button"
      onClick={() => handleClick()}
      className={
        "h-12 w-32 cursor-pointer rounded-sm border border-gray-400 bg-white"
      }
    >
      <div className={"flex h-full items-center gap-1 p-1"}>
        <div
          className={
            "flex h-full w-12 items-center justify-center rounded-sm bg-blue-500"
          }
        >
          <TableProperties color="#ffffff" size={16} />
        </div>
        <div className={"flex h-full w-full flex-col"}>
          <h3 className={"text-xs"}>{nodeType}</h3>
          <p className={"text-sm"}>{nodeName}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
};

export default FormNode;
