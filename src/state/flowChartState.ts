import { atom } from "jotai";
import { BlueprintNode } from "../types/BlueprintGraphTypes";

export const nodesAtom = atom<BlueprintNode[]>([]);
export const previousNodesAtom = atom({});
export const formModalOpenAtom = atom(false);
export const currentNodeAtom = atom<string | null>(null);
