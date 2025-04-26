import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FormNode from "./FormNode";
import { useQuery } from "@tanstack/react-query";
import getActionBlueprintGraph from "../queries/getActionBlueprintGraph";
import { addIdsToEdges } from "../utils/helperFunctions";

const nodeTypes = { form: FormNode };

const FlowChart = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["actionBlueprintGraphData"],
    queryFn: () =>
      getActionBlueprintGraph({
        tenantId: "123",
        actionBlueprintId: "bp_456",
        blueprintVersionId: "bpv_123",
      }),
  });

  if (error) {
    console.log(error);
    return;
  }

  if (isPending) {
    console.log("loading");
    return;
  }

  const nodes = data.nodes;
  const edges = addIdsToEdges(data.edges);

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
      <Controls />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default FlowChart;
