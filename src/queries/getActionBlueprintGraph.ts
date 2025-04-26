import fetchData from "../utils/fetchData";

type ActionBlueprintGraphRequest = {
  tenantId: string;
  actionBlueprintId: string;
  blueprintVersionId: string;
};

const getActionBlueprintGraph = ({
  tenantId,
  actionBlueprintId,
  // blueprintVersionId,
}: ActionBlueprintGraphRequest) => {
  return fetchData(
    `/api/v1/${tenantId}/actions/blueprints/${actionBlueprintId}/graph`,
  );
};

export default getActionBlueprintGraph;
