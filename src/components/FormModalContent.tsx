import { useAtom } from "jotai";
import { formPropertiesAtom } from "../state/flowChartState";
import { useState } from "react";
import DataSelector from "./DataSelector";
import clsx from "clsx";
import { X } from "lucide-react";
import { BlueprintNode } from "../types/BlueprintGraphTypes";

type FormModalContent = {
  currentNodeId: string;
  nodes: BlueprintNode[];
};

const FormModalContent = ({ currentNodeId, nodes }: FormModalContent) => {
  const [fieldSelectorVisible, setFieldSelectorVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const [formProperties, setFormProperties] = useAtom(formPropertiesAtom);
  const currentFormProperties = currentNodeId
    ? formProperties[currentNodeId]
    : null;

  const showFieldSelector = (property: string) => {
    setFieldSelectorVisible(true);
    setSelectedProperty(property);
  };

  const clearFormProperty = (field: string) => {
    const tempFormProperties = { ...formProperties };
    tempFormProperties[currentNodeId][field] = null;

    setFormProperties(tempFormProperties);
  };

  if (currentFormProperties && fieldSelectorVisible && selectedProperty) {
    return (
      <DataSelector
        formProperties={formProperties}
        setFormProperties={setFormProperties}
        currentProperty={selectedProperty}
        currentFormId={currentNodeId}
        setFieldSelectorVisible={setFieldSelectorVisible}
      />
    );
  }

  return (
    <div className={"mt-1 flex h-110 flex-col gap-1 overflow-y-auto"}>
      {currentFormProperties &&
        Object.keys(currentFormProperties).map((field) => {
          let fieldName;

          if (currentFormProperties[field]) {
            const formId = currentFormProperties[field].form;
            const form = nodes.find((node) => node.id === formId);
            const formName = form?.data?.name;
            const property = currentFormProperties[field].property;

            fieldName = `${field}: ${formName}.${property}`;
          } else {
            fieldName = field;
          }

          return (
            <div
              key={field}
              role="button"
              className={clsx(
                "w-full rounded-md border border-gray-400 p-1 hover:border-blue-600",
                currentFormProperties[field]
                  ? "bg-white"
                  : "cursor-pointer bg-gray-200 text-gray-400",
              )}
              onClick={
                !currentFormProperties[field]
                  ? () => showFieldSelector(field)
                  : undefined
              }
            >
              <div className="flex w-full items-center justify-between">
                <span>{fieldName}</span>
                {currentFormProperties[field] && (
                  <X
                    onClick={() => clearFormProperty(field)}
                    className={"cursor-pointer"}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FormModalContent;
