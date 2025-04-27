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
import { useEffect, useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";
import { nodesAtom, previousNodesAtom } from "../state/flowChartState";

const nodeTypes = { form: FormNode };

const FlowChart = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const setPreviousNodes = useSetAtom(previousNodesAtom);

  const { isPending, error, data } = useQuery({
    queryKey: ["actionBlueprintGraphData"],
    queryFn: () =>
      getActionBlueprintGraph({
        tenantId: "123",
        actionBlueprintId: "bp_456",
        blueprintVersionId: "bpv_123",
      }),
  });

  useEffect(() => {
    setNodes(data?.nodes ?? []);
    const previousNodes = getPreviousNodes(data?.edges ?? []);
    setPreviousNodes(previousNodes);
    console.log(data?.forms);
    console.log(data?.nodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const edges = useMemo(() => addIdsToEdges(data?.edges ?? []), [data?.edges]);

  if (error || isPending) return null;

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
      <Controls />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default FlowChart;
