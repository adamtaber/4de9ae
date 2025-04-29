import { expect, describe, it } from "vitest";
import { capitalizeString, getPreviousNodes } from "../utils/helperFunctions";
import { EdgeData } from "../types/BlueprintGraphTypes";

describe("capitalizeString", () => {
  it("capitalizes the first letter of a lowercase word", () => {
    expect(capitalizeString("hello")).toBe("Hello");
  });

  it("does not change the first letter if it is already uppercase", () => {
    expect(capitalizeString("Hello")).toBe("Hello");
  });

  it("only capitalizes the first letter and leaves the rest unchanged", () => {
    expect(capitalizeString("hELLO")).toBe("HELLO");
  });

  it("handles empty strings", () => {
    expect(capitalizeString("")).toBe("");
  });

  it("handles strings with a single character", () => {
    expect(capitalizeString("h")).toBe("H");
    expect(capitalizeString("H")).toBe("H");
  });

  it("handles strings that start with a non-letter character", () => {
    expect(capitalizeString("1hello")).toBe("1hello");
    expect(capitalizeString("!hello")).toBe("!hello");
  });

  it("handles whitespace at the start", () => {
    expect(capitalizeString(" hello")).toBe(" hello");
  });
});

describe("getPreviousNodes", () => {
  it("returns an empty object for empty edges", () => {
    const input: EdgeData[] = [];
    const output = getPreviousNodes(input);

    expect(output).toEqual({});
  });

  it("maps direct predecessors correctly", () => {
    const input: EdgeData[] = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
    ];
    const output = getPreviousNodes(input);

    expect(output).toEqual({
      A: [],
      B: ["A"],
      C: ["B", "A"],
    });
  });

  it("handles multiple incoming edges", () => {
    const input: EdgeData[] = [
      { source: "A", target: "C" },
      { source: "B", target: "C" },
    ];
    const output = getPreviousNodes(input);

    expect(output).toEqual({
      A: [],
      B: [],
      C: ["B", "A"],
    });
  });

  it("handles branching paths", () => {
    const input: EdgeData[] = [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
      { source: "C", target: "D" },
    ];
    const output = getPreviousNodes(input);

    expect(output).toEqual({
      A: [],
      B: ["A"],
      C: ["A"],
      D: ["C", "A", "B"],
    });
  });

  it("handles disconnected graphs", () => {
    const input: EdgeData[] = [
      { source: "A", target: "B" },
      { source: "X", target: "Y" },
    ];
    const output = getPreviousNodes(input);

    expect(output).toEqual({
      A: [],
      B: ["A"],
      X: [],
      Y: ["X"],
    });
  });
});
