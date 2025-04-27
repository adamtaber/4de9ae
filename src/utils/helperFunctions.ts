import { EdgeData } from "../types/BlueprintGraphTypes";

export const capitalizeString = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const addIdsToEdges = (edges: EdgeData[]) => {
  const newEdges = edges.map((edge) => ({
    id: `${edge.source}_${edge.target}`,
    ...edge,
  }));

  return newEdges;
};

export const getPreviousNodes = (edges: EdgeData[]) => {
  const nodes: Record<string, string[]> = {};
  const ancestorsMap: Record<string, string[]> = {};

  edges.forEach((edge) => {
    if (!(edge.target in nodes)) nodes[edge.target] = [];
    if (!(edge.source in nodes)) nodes[edge.source] = [];

    nodes[edge.target].push(edge.source);
  });

  const findAncestors = (node: string) => {
    const stack = [...nodes[node]];
    const result: string[] = [];

    while (stack.length > 0) {
      const current = stack.pop();

      if (!current || result.includes(current)) continue;
      result.push(current);

      if (ancestorsMap[current]) {
        ancestorsMap[current].forEach((item) => {
          if (!result.includes(item)) result.push(item);
        });
      } else {
        stack.push(...nodes[current]);
      }
    }

    return [...result];
  };

  Object.keys(nodes).forEach((node) => {
    ancestorsMap[node] = findAncestors(node);
  });

  return ancestorsMap;
};
