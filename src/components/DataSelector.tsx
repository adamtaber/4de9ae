import { useAtomValue } from "jotai";
import { nodesAtom, previousNodesAtom } from "../state/flowChartState";
import { sortForms } from "../utils/helperFunctions";
import { useState } from "react";
import { FieldProperty } from "../types/BlueprintGraphTypes";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

type DataSelector = {
  formProperties: Record<string, Record<string, FieldProperty | null>>;
  setFormProperties: (
    arg: Record<string, Record<string, FieldProperty | null>>,
  ) => void;
  currentProperty: string;
  currentFormId: string;
  setFieldSelectorVisible: (arg: boolean) => void;
};

const DataSelector = ({
  formProperties,
  setFormProperties,
  currentProperty,
  currentFormId,
  setFieldSelectorVisible,
}: DataSelector) => {
  const formNodes = useAtomValue(nodesAtom);
  const previousNodes = useAtomValue(previousNodesAtom);
  const [currentForm, setCurrentForm] = useState<null | string>(null);
  const [selectedValue, setSelectedValue] = useState<FieldProperty | null>(
    null,
  );

  const ancestorNodes = previousNodes[currentFormId];

  const filteredFormProperties = Object.keys(formProperties)?.filter(
    (formId: string) =>
      formId !== currentFormId && ancestorNodes.includes(formId),
  );

  const sortedFormProperties = sortForms(filteredFormProperties, formNodes);

  const selectForm = (form: string) => {
    if (currentForm === form) setCurrentForm(null);
    else setCurrentForm(form);
  };

  const updateFormProperty = () => {
    const tempFormProperties = { ...formProperties };

    tempFormProperties[currentFormId][currentProperty] = selectedValue;
    setFormProperties(tempFormProperties);
    setFieldSelectorVisible(false);
  };

  return (
    <div className={"relative flex h-full flex-col gap-1"}>
      <p>Available Data:</p>
      {sortedFormProperties?.length > 0 ? (
        sortedFormProperties.map((form) => {
          const node = formNodes.find((node) => node?.id === form);
          const formTitle = node?.data?.name;

          return (
            <div key={form}>
              <div
                className={
                  "cursor-pointer border border-gray-600 bg-gray-200 px-2 hover:bg-blue-300"
                }
                onClick={() => selectForm(form)}
              >
                <div className={"flex items-center justify-between"}>
                  {formTitle}
                  {currentForm === form ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              {currentForm === form &&
                Object.keys(formProperties[form]).map((property: string) => {
                  const isSelectedForm =
                    selectedValue?.form === form &&
                    selectedValue?.property === property;
                  return (
                    <div
                      key={`${form}_${property}`}
                      className={clsx(
                        "cursor-pointer border border-t-0 border-gray-600 px-2",
                        isSelectedForm
                          ? "bg-blue-300 hover:bg-blue-200"
                          : "hover:bg-gray-100",
                      )}
                      onClick={() => setSelectedValue({ form, property })}
                    >
                      <div className={"flex items-center justify-between"}>
                        {property}
                        {isSelectedForm && <Check />}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })
      ) : (
        <p>There are no prefills available for this form.</p>
      )}
      <div className="absolute bottom-4 flex w-full justify-end gap-1">
        <button
          className={
            "w-20 cursor-pointer rounded-md border border-gray-600 bg-gray-400 text-white hover:bg-gray-200"
          }
          onClick={() => setFieldSelectorVisible(false)}
        >
          Cancel
        </button>
        {sortedFormProperties?.length > 0 && (
          <button
            className={
              "w-20 cursor-pointer rounded-md border border-gray-600 bg-blue-500 text-white hover:bg-blue-300"
            }
            onClick={updateFormProperty}
          >
            Ok
          </button>
        )}
      </div>
    </div>
  );
};

export default DataSelector;
