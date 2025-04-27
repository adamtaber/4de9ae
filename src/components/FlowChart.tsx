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
import { addIdsToEdges, getPreviousNodes } from "../utils/helperFunctions";
import { useMemo } from "react";

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

  const nodes = useMemo(() => data?.nodes ?? [], [data?.nodes]);
  const edges = useMemo(() => addIdsToEdges(data?.edges ?? []), [data?.edges]);
  const previousNodes = useMemo(
    () => getPreviousNodes(data?.edges ?? []),
    [data?.edges],
  );

  console.log(previousNodes);

  if (error || isPending) return null;

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
      <Controls />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default FlowChart;
