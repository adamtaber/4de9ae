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
