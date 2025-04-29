import {
  BlueprintForm,
  BlueprintNode,
  EdgeData,
  FieldProperty,
} from "../types/BlueprintGraphTypes";

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
    const result = new Set<string>();

    while (stack.length > 0) {
      const current = stack.pop();

      if (!current || result.has(current)) continue;
      result.add(current);

      if (ancestorsMap[current]) {
        ancestorsMap[current].forEach((item) => {
          if (!result.has(item)) result.add(item);
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

export const createFormFieldMap = (
  forms: BlueprintForm[],
  nodes: BlueprintNode[],
) => {
  const formFieldMap: Record<string, Record<string, FieldProperty | null>> = {};

  nodes.forEach((node: BlueprintNode) => {
    const form = forms.find(
      (form: BlueprintForm) => form.id === node.data.component_id,
    );

    const formProperties: Record<string, FieldProperty | null> = {};

    Object.keys(form?.field_schema?.properties ?? []).forEach((property) => {
      formProperties[property] = null;
    });

    formFieldMap[node.id] = formProperties;
  });

  return formFieldMap;
};

export const sortForms = (arr: string[], formNodes: BlueprintNode[]) => {
  const sortedArr = arr.slice().sort((a, b) => {
    const aNode = formNodes.find((node) => node?.id === a);
    const bNode = formNodes.find((node) => node?.id === b);

    const aTitle = aNode?.data?.name || "";
    const bTitle = bNode?.data?.name || "";

    return aTitle.localeCompare(bTitle, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  return sortedArr;
};
