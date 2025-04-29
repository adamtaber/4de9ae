import { atom } from "jotai";
import { BlueprintNode, FieldProperty } from "../types/BlueprintGraphTypes";

export const nodesAtom = atom<BlueprintNode[]>([]);
export const previousNodesAtom = atom<Record<string, string[]>>({});
export const formPropertiesAtom = atom<
  Record<string, Record<string, FieldProperty | null>>
>({});
export const formModalOpenAtom = atom(false);
export const currentNodeAtom = atom<string | null>(null);
