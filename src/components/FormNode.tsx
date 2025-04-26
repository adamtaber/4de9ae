import { Handle, Position } from "@xyflow/react";
import { TableProperties } from "lucide-react";
import { NodeData } from "../types/BlueprintGraphTypes";
import { capitalizeString } from "../utils/helperFunctions";

const FormNode = ({ data }: { data: NodeData }) => {
  const nodeType = capitalizeString(data?.component_type);
  const nodeName = data?.name;

  return (
    <div className={"h-12 w-32 rounded-sm border border-gray-400 bg-white"}>
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
